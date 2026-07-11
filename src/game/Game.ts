/**
 * ゲーム本体: 3D シーン、ループ、同期の編成。
 * 役割ベースで動く:
 * - authority（ホスト機/練習）: HostSim を回し 30Hz でスナップショット配信。
 *   ホスト自身は対戦者のこともあれば観戦者のこともある。
 * - 非 authority: 対戦者なら自機入力を送信、観戦者なら描画のみ。
 * ネット送受信の配線は呼び出し側（party/main）が行い、Game は
 * net フックで外に出し、applyRemoteInput / applySnapshot で受け取る。
 */
import * as THREE from 'three';
import { COURT, NET_RATE, PLAY, PRACTICE_GAMES_TO_WIN } from '../config';
import { sfx } from '../core/audio';
import type { ClientMsg, FxCounters, Phase, Score, ShotKind, Snapshot } from '../net/protocol';
import { HostSim, serveStand } from '../sim/HostSim';
import type { ServeAim } from '../sim/HostSim';
import { AiController } from '../sim/ai';
import { BallSim } from '../sim/physics';
import { Controls } from '../ui/controls';
import { Hud } from '../ui/hud';
import { BallView } from '../view/BallView';
import { KIT_AWAY, KIT_HOME, PlayerView } from '../view/PlayerView';
import { ServeAimView } from '../view/ServeAimView';
import { buildStadium } from '../view/Stadium';

export interface GameNet {
  /** 対戦クライアント → ホスト */
  send: (m: ClientMsg) => void;
  /** authority → 全員 */
  broadcast: (m: Snapshot) => void;
}

export interface GameOpts {
  authority: boolean;
  /** 自分の対戦者インデックス。観戦者は null */
  playerIdx: 0 | 1 | null;
  names: [string, string];
  gamesToWin: number;
  /** 練習モード（AI 対戦・リザルトと再戦 UI を出す） */
  practice: boolean;
  net: GameNet | null;
  /** authority のみ: 決着から少し置いて一度だけ呼ばれる */
  onMatchOver?: (winnerIdx: 0 | 1, score: Score) => void;
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

export class Game {
  private readonly opts: GameOpts;
  private readonly playerIdx: 0 | 1 | null;
  private readonly s: 1 | -1;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly camPos = new THREE.Vector3();
  private readonly views: [PlayerView, PlayerView];
  private readonly ballView: BallView;
  private readonly serveAimView: ServeAimView;
  private readonly controls: Controls | null;
  private readonly hud = new Hud();
  private readonly clock = new THREE.Clock();

  // authority 側
  private readonly sim: HostSim | null = null;
  private readonly ai: AiController | null = null;
  private matchOverFired = false;

  // 非 authority 側
  private readonly localBall = new BallSim();
  private clientPhase: Phase = 'between';
  private p0Target: [number, number, number] = [0, 0, 0];
  private p1Target: [number, number, number] = [0, 0, 0];
  private netServeAim: ServeAim | null = null;

  /** 直近のスコア（クライアントはサーブ位置拘束の判定に使う） */
  private lastScore: Score | null = null;

  // 自機（対戦者のみ・ローカル権威）
  private meX = 0;
  private meZ = 0;
  private mySwing = 0;
  private lastResetSeq = 0;

  // 差分検知
  private lastFx: FxCounters = { hit: 0, smash: 0, bounce: 0, net: 0, point: 0, fault: 0 };
  private lastMsgSeq = 0;
  private lastScoreKey = '';
  private resultShown = false;
  private serveHintShown = false;
  private sendTimer = 0;

  constructor(opts: GameOpts) {
    this.opts = opts;
    this.playerIdx = opts.playerIdx;
    this.s = this.playerIdx === 1 ? -1 : 1;
    if (this.playerIdx !== null) this.meZ = this.s * (COURT.HALF_L + 1);

    if (opts.authority) {
      this.sim = new HostSim(Math.random() < 0.5 ? 0 : 1, opts.gamesToWin);
      if (opts.practice) this.ai = new AiController();
    }

    // レンダラ
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    (document.getElementById('app') as HTMLElement).appendChild(this.renderer.domElement);

    // シーンとビュー（自分が対戦者なら自分が赤、観戦時は p0 が赤）
    this.scene = buildStadium();
    const redIdx = this.playerIdx ?? 0;
    const v0 = new PlayerView(this.scene, redIdx === 0 ? KIT_HOME : KIT_AWAY, true, 0, COURT.HALF_L + 1);
    const v1 = new PlayerView(this.scene, redIdx === 1 ? KIT_HOME : KIT_AWAY, false, 0, -(COURT.HALF_L + 1));
    this.views = [v0, v1];
    this.ballView = new BallView(this.scene);
    this.serveAimView = new ServeAimView(this.scene);

    // カメラ: 対戦者は自陣後方の TV 視点、観戦者はサイドスタンド視点
    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 260);
    if (this.playerIdx !== null) {
      this.camPos.set(0, 8.0, this.s * (COURT.HALF_L + 9.6));
      this.camera.position.copy(this.camPos);
      this.camera.lookAt(0, 0, -this.s * 1.0);
    } else {
      // サイドスタンドの内側・やや高めから全コートを見渡す
      this.camPos.set(-14.5, 10.0, 0);
      this.camera.position.copy(this.camPos);
      this.camera.lookAt(2.5, 0, 0);
    }

    // 入力（対戦者のみ）
    if (this.playerIdx !== null) {
      this.controls = new Controls();
      this.controls.onSwing = (kind) => this.swing(kind);
    } else {
      this.controls = null;
    }

    const displaySide = this.playerIdx ?? 0;
    const myName = opts.names[displaySide];
    const oppName = opts.names[(1 - displaySide) as 0 | 1];
    this.hud.show(myName, oppName, this.playerIdx === null);
    window.addEventListener('resize', this.onResize);
    this.renderer.setAnimationLoop(() => this.frame());
  }

  private readonly onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // ============ 入力 ============

  private swing(kind: ShotKind): void {
    if (this.playerIdx === null) return;
    sfx.unlock();
    // ボールが自分の右側ならフォアハンド(+)、左側ならバックハンド(-)
    const ballX = this.sim ? this.sim.ball.p.x : this.localBall.p.x;
    this.mySwing = (ballX - this.meX) * this.s >= 0 ? 1 : -1;
    const aim = this.controls?.state.x ?? 0;
    if (this.sim) {
      if (!this.sim.trySwing(this.playerIdx, { kind, aim })) sfx.whoosh();
    } else if (this.opts.net) {
      this.opts.net.send({ t: 'swing', kind, aim });
      sfx.whoosh();
    }
  }

  // ============ 外部からの入力（配線は party/main 側） ============

  /** authority: 対戦クライアントの入力を反映する */
  applyRemoteInput(idx: 0 | 1, m: ClientMsg): void {
    if (!this.sim) return;
    if (m.t === 'pos') {
      this.sim.players[idx].x = m.p[0];
      this.sim.players[idx].z = m.p[1];
      this.sim.players[idx].swing = m.sw;
    } else if (m.t === 'swing') {
      this.sim.trySwing(idx, { kind: m.kind, aim: m.aim });
    }
  }

  /** 非 authority: スナップショットを反映する */
  applySnapshot(s: Snapshot): void {
    if (this.sim) return;
    this.clientPhase = s.ph;
    this.p0Target = s.hp;
    this.p1Target = s.cp;

    if (this.playerIdx !== null && s.reset !== this.lastResetSeq) {
      this.lastResetSeq = s.reset;
      const mine = this.playerIdx === 0 ? s.hp : s.cp;
      this.meX = mine[0];
      this.meZ = mine[1];
      this.views[this.playerIdx].update(0, this.meX, this.meZ, 0, true);
    }

    this.netServeAim = s.sv ? { x: s.sv[0], z: s.sv[1], power: s.sv[2] } : null;

    const [px, py, pz, vx, vy, vz] = s.b;
    if (s.ba && s.ph === 'rally') {
      const d = Math.hypot(this.localBall.p.x - px, this.localBall.p.y - py, this.localBall.p.z - pz);
      if (!this.localBall.active || d > 0.7) {
        this.localBall.set({ x: px, y: py, z: pz }, { x: vx, y: vy, z: vz });
      } else {
        // 軽い補正のみ（ローカル予測を活かしてカクつきを抑える）
        this.localBall.p.x += (px - this.localBall.p.x) * 0.35;
        this.localBall.p.y += (py - this.localBall.p.y) * 0.35;
        this.localBall.p.z += (pz - this.localBall.p.z) * 0.35;
        this.localBall.v = { x: vx, y: vy, z: vz };
      }
    } else {
      this.localBall.hold(px, py, pz);
    }

    this.consumeShared(s.sc, s.ph, s.msg, s.fx, false);
  }

  // ============ メインループ ============

  private frame(): void {
    const dt = Math.min(this.clock.getDelta(), 0.05);

    this.moveSelf(dt);
    this.mySwing = Math.sign(this.mySwing) * Math.max(0, Math.abs(this.mySwing) - dt / PLAY.SWING_TIME);

    if (this.sim) this.frameAuthority(dt);
    else this.frameClient(dt);

    this.frameCamera(dt);
    this.renderer.render(this.scene, this.camera);
  }

  private moveSelf(dt: number): void {
    if (this.playerIdx === null || !this.controls) return;
    const inp = this.controls.state;
    // 自分視点 → ワールド座標（右 = x * s, 前 = -z * s）
    this.meX += inp.x * this.s * PLAY.SPEED * dt;
    this.meZ += -inp.y * this.s * PLAY.SPEED * dt;
    this.meX = clamp(this.meX, -PLAY.BOUND_X, PLAY.BOUND_X);
    if (this.s > 0) this.meZ = clamp(this.meZ, PLAY.BOUND_Z_NEAR, PLAY.BOUND_Z_FAR);
    else this.meZ = clamp(this.meZ, -PLAY.BOUND_Z_FAR, -PLAY.BOUND_Z_NEAR);

    // サーブ待ちの間、サーバーはベースライン上（正しい半面側）しか動けない
    const ph = this.sim ? this.sim.phase : this.clientPhase;
    const sc = this.sim ? this.sim.score : this.lastScore;
    if (ph === 'await-serve' && sc && sc.server === this.playerIdx) {
      const stand = serveStand(this.playerIdx, sc.points);
      this.meX = clamp(this.meX, stand.x0, stand.x1);
      this.meZ = stand.z;
    }
  }

  private frameAuthority(dt: number): void {
    const sim = this.sim as HostSim;
    if (this.playerIdx !== null) {
      const me = sim.players[this.playerIdx];
      me.x = this.meX;
      me.z = this.meZ;
      if (Math.abs(this.mySwing) > Math.abs(me.swing)) me.swing = this.mySwing;
    }
    this.ai?.update(dt, sim);
    sim.update(dt);

    // ポイント開始時（setupPoint）はシミュレーション側が配置を決める
    if (this.playerIdx !== null && sim.resetSeq !== this.lastResetSeq) {
      this.lastResetSeq = sim.resetSeq;
      this.meX = sim.players[this.playerIdx].x;
      this.meZ = sim.players[this.playerIdx].z;
      this.views[this.playerIdx].update(0, this.meX, this.meZ, 0, true);
    }

    // 配信
    if (this.opts.net) {
      this.sendTimer += dt;
      if (this.sendTimer >= NET_RATE.INTERVAL) {
        this.sendTimer = 0;
        this.opts.net.broadcast(this.buildSnapshot(sim));
      }
    }

    const b = sim.ball;
    this.consumeShared(sim.score, sim.phase, [sim.msgSeq, sim.msgText], sim.fx, true, b.p.x, b.p.z);

    // サーブ照準マーカーとパワーゲージ
    const aim = sim.phase === 'await-serve' ? sim.serveAim : null;
    this.serveAimView.update(dt, aim);
    if (aim && this.playerIdx === sim.score.server) this.hud.setServePower(aim.power);

    // 決着通知（パーティーはこの後ロビーへ、練習はリザルト UI）
    if (sim.phase === 'over' && !this.matchOverFired && sim.score.winner !== null) {
      this.matchOverFired = true;
      this.opts.onMatchOver?.(sim.score.winner, sim.score);
    }

    // ビュー更新
    for (const idx of [0, 1] as const) {
      const snap = idx === this.playerIdx || this.opts.practice;
      const p = sim.players[idx];
      const swing = idx === this.playerIdx ? this.mySwingOr(p.swing) : p.swing;
      this.views[idx].update(dt, p.x, p.z, swing, snap);
    }
    this.ballView.update(dt, b.p.x, b.p.y, b.p.z, b.active);
  }

  private mySwingOr(simSwing: number): number {
    return Math.abs(this.mySwing) > Math.abs(simSwing) ? this.mySwing : simSwing;
  }

  private frameClient(dt: number): void {
    if (this.clientPhase === 'rally') {
      const ev = this.localBall.step(dt);
      if (ev.bounce) {
        sfx.bounce();
        this.ballView.bounceAt(ev.bounce.x, ev.bounce.z);
      }
    }

    if (this.playerIdx !== null && this.opts.net) {
      this.sendTimer += dt;
      if (this.sendTimer >= NET_RATE.INTERVAL) {
        this.sendTimer = 0;
        this.opts.net.send({ t: 'pos', p: [this.meX, this.meZ], sw: this.mySwing });
      }
    }

    for (const idx of [0, 1] as const) {
      if (idx === this.playerIdx) {
        this.views[idx].update(dt, this.meX, this.meZ, this.mySwing, true);
      } else {
        const t = idx === 0 ? this.p0Target : this.p1Target;
        this.views[idx].update(dt, t[0], t[1], t[2]);
      }
    }
    const b = this.localBall;
    this.ballView.update(dt, b.p.x, b.p.y, b.p.z, b.active);

    // サーブ照準マーカーとパワーゲージ
    const aim = this.clientPhase === 'await-serve' ? this.netServeAim : null;
    this.serveAimView.update(dt, aim);
    if (aim && this.lastScore && this.lastScore.server === this.playerIdx) {
      this.hud.setServePower(aim.power);
    }
  }

  /** スコア/メッセージ/効果音など authority・クライアント共通の HUD 反映 */
  private consumeShared(
    sc: Score,
    ph: Phase,
    msg: [number, string],
    fx: FxCounters,
    playBounce: boolean,
    ballX = 0,
    ballZ = 0,
  ): void {
    const displaySide = this.playerIdx ?? 0;
    this.lastScore = sc;

    // スコア
    const key = `${sc.points[0]},${sc.points[1]},${sc.games[0]},${sc.games[1]},${sc.server}`;
    if (key !== this.lastScoreKey) {
      this.lastScoreKey = key;
      this.hud.setScore(sc, displaySide);
    }

    // メッセージ
    if (msg[0] !== this.lastMsgSeq) {
      this.lastMsgSeq = msg[0];
      if (msg[1]) this.hud.flash(msg[1]);
    }

    // 効果音（カウンタ差分。スマッシュのときは打球音を強い方に差し替え）
    if (fx.smash > this.lastFx.smash) sfx.smash();
    else if (fx.hit > this.lastFx.hit) sfx.hit();
    if (fx.net > this.lastFx.net) sfx.net();
    if (fx.point > this.lastFx.point) sfx.point();
    if (fx.fault > this.lastFx.fault) sfx.fault();
    if (playBounce && fx.bounce > this.lastFx.bounce) {
      sfx.bounce();
      this.ballView.bounceAt(ballX, ballZ);
    }
    this.lastFx = { ...fx };

    // サーブヒント（自分がサーバーのときだけ）
    const showHint = ph === 'await-serve' && this.playerIdx !== null && sc.server === this.playerIdx;
    if (showHint !== this.serveHintShown) {
      this.serveHintShown = showHint;
      this.hud.setServeHint(showHint);
    }

    // リザルト（練習モードのみ。パーティーはロビーに戻して表示する）
    if (this.opts.practice) {
      if (ph === 'over' && !this.resultShown) {
        this.resultShown = true;
        const won = sc.winner === displaySide;
        const opp = (1 - displaySide) as 0 | 1;
        this.hud.showResult(won, `ゲームカウント ${sc.games[displaySide]} - ${sc.games[opp]}`);
      } else if (ph !== 'over' && this.resultShown) {
        this.resultShown = false;
        this.hud.hideResult();
      }
    }
  }

  private buildSnapshot(sim: HostSim): Snapshot {
    const b = sim.ball;
    return {
      t: 's',
      b: [b.p.x, b.p.y, b.p.z, b.v.x, b.v.y, b.v.z],
      ba: b.active,
      hp: [sim.players[0].x, sim.players[0].z, sim.players[0].swing],
      cp: [sim.players[1].x, sim.players[1].z, sim.players[1].swing],
      ph: sim.phase,
      sc: {
        points: [sim.score.points[0], sim.score.points[1]],
        games: [sim.score.games[0], sim.score.games[1]],
        server: sim.score.server,
        finished: sim.score.finished,
        winner: sim.score.winner,
      },
      msg: [sim.msgSeq, sim.msgText],
      fx: { ...sim.fx },
      reset: sim.resetSeq,
      sv:
        sim.phase === 'await-serve' && sim.serveAim
          ? [sim.serveAim.x, sim.serveAim.z, sim.serveAim.power]
          : null,
    };
  }

  private frameCamera(dt: number): void {
    if (this.playerIdx === null) return; // 観戦カメラは固定
    const k = Math.min(1, dt * 3.5);
    const targetX = this.meX * 0.3;
    this.camPos.x += (targetX - this.camPos.x) * k;
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camPos.x * 0.4, 0, -this.s * 1.0);
  }

  // ============ 外部操作 ============

  /** 練習モードの再戦 */
  rematch(): void {
    if (this.sim && this.sim.phase === 'over') {
      this.matchOverFired = false;
      this.sim.restart();
    }
  }

  dispose(): void {
    this.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', this.onResize);
    this.controls?.dispose();
    this.hud.hide();
    this.renderer.domElement.remove();
    this.renderer.dispose();
  }
}

export function practiceGame(): Game {
  return new Game({
    authority: true,
    playerIdx: 0,
    names: ['あなた', 'AI'],
    gamesToWin: PRACTICE_GAMES_TO_WIN,
    practice: true,
    net: null,
  });
}
