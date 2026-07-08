/**
 * ゲーム本体: 3D シーン、ループ、ネット同期の編成。
 * - host / practice: HostSim（権威）を回し、30Hz でスナップショット送信
 * - client: 自機位置を送り、スナップショットを受けてローカル物理で補間
 */
import * as THREE from 'three';
import { COURT, NET_RATE, PLAY } from '../config';
import { sfx } from '../core/audio';
import type { NetSession } from '../net/peer';
import type { ClientMsg, FxCounters, Phase, Score, ShotKind, Snapshot } from '../net/protocol';
import { HostSim, sideOf } from '../sim/HostSim';
import { AiController } from '../sim/ai';
import { BallSim } from '../sim/physics';
import { Controls } from '../ui/controls';
import { Hud } from '../ui/hud';
import { BallView } from '../view/BallView';
import { KIT_AWAY, KIT_HOME, PlayerView } from '../view/PlayerView';
import { buildStadium } from '../view/Stadium';

export type GameMode = 'practice' | 'host' | 'client';

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

export class Game {
  private readonly mode: GameMode;
  private readonly net: NetSession | null;
  private readonly mySide: 0 | 1;
  private readonly s: 1 | -1;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly camPos = new THREE.Vector3();
  private readonly views: [PlayerView, PlayerView];
  private readonly ballView: BallView;
  private readonly controls: Controls;
  private readonly hud = new Hud();
  private readonly clock = new THREE.Clock();

  // 権威側
  private readonly sim: HostSim | null = null;
  private readonly ai: AiController | null = null;

  // クライアント側
  private readonly localBall = new BallSim();
  private clientPhase: Phase = 'between';
  private oppTarget: [number, number, number] = [0, 0, 0];
  private lastResetSeq = 0;

  // 自機（両ロール共通・ローカル権威）
  private meX = 0;
  private meZ: number;
  private mySwing = 0;

  // 差分検知
  private lastFx: FxCounters = { hit: 0, bounce: 0, net: 0, point: 0, fault: 0 };
  private lastMsgSeq = 0;
  private lastScoreKey = '';
  private resultShown = false;
  private serveHintShown = false;
  private sendTimer = 0;

  onExit: () => void = () => {};

  constructor(mode: GameMode, net: NetSession | null) {
    this.mode = mode;
    this.net = net;
    this.mySide = mode === 'client' ? 1 : 0;
    this.s = sideOf(this.mySide);
    this.meZ = this.s * (COURT.HALF_L + 1);

    if (mode !== 'client') {
      this.sim = new HostSim(Math.random() < 0.5 ? 0 : 1);
      if (mode === 'practice') this.ai = new AiController();
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

    // シーンとビュー
    this.scene = buildStadium();
    const v0 = new PlayerView(this.scene, this.mySide === 0 ? KIT_HOME : KIT_AWAY, true, 0, COURT.HALF_L + 1);
    const v1 = new PlayerView(this.scene, this.mySide === 1 ? KIT_HOME : KIT_AWAY, false, 0, -(COURT.HALF_L + 1));
    this.views = [v0, v1];
    this.ballView = new BallView(this.scene);

    // カメラ（自陣ベースライン後方の TV 中継風視点。自分の全身が入る高さ/距離）
    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 260);
    this.camPos.set(0, 8.0, this.s * (COURT.HALF_L + 9.6));
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(0, 0, -this.s * 1.0);

    // 入力
    this.controls = new Controls();
    this.controls.onSwing = (kind) => this.swing(kind);

    // ネット受信
    if (net) net.onData = (m) => this.onNet(m);

    this.hud.show('あなた', this.mode === 'practice' ? 'AI' : 'あいて');
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
    sfx.unlock();
    // ボールが自分の右側ならフォアハンド(+)、左側ならバックハンド(-)
    const ballX = this.sim ? this.sim.ball.p.x : this.localBall.p.x;
    this.mySwing = (ballX - this.meX) * this.s >= 0 ? 1 : -1;
    const aim = this.controls.state.x;
    if (this.sim) {
      if (!this.sim.trySwing(this.mySide, { kind, aim })) sfx.whoosh();
    } else if (this.net) {
      this.net.send({ t: 'swing', kind, aim });
      sfx.whoosh();
    }
  }

  // ============ ネット受信 ============

  private onNet(m: ClientMsg | Snapshot | { t: 'start' }): void {
    if (this.sim) {
      // ホスト側: クライアントの入力を受ける
      if (m.t === 'pos') {
        this.sim.players[1].x = m.p[0];
        this.sim.players[1].z = m.p[1];
        this.sim.players[1].swing = m.sw;
      } else if (m.t === 'swing') {
        this.sim.trySwing(1, { kind: m.kind, aim: m.aim });
      } else if (m.t === 'rematch') {
        if (this.sim.phase === 'over') this.sim.restart();
      }
      return;
    }
    // クライアント側: スナップショット適用
    if (m.t !== 's') return;
    this.applySnapshot(m);
  }

  private applySnapshot(s: Snapshot): void {
    this.clientPhase = s.ph;
    this.oppTarget = s.hp;

    if (s.reset !== this.lastResetSeq) {
      this.lastResetSeq = s.reset;
      this.meX = s.cp[0];
      this.meZ = s.cp[1];
      this.views[1].update(0, this.meX, this.meZ, 0, true);
    }

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
    const inp = this.controls.state;
    // 自分視点 → ワールド座標（右 = x * s, 前 = -z * s）
    this.meX += inp.x * this.s * PLAY.SPEED * dt;
    this.meZ += -inp.y * this.s * PLAY.SPEED * dt;
    this.meX = clamp(this.meX, -PLAY.BOUND_X, PLAY.BOUND_X);
    if (this.s > 0) this.meZ = clamp(this.meZ, PLAY.BOUND_Z_NEAR, PLAY.BOUND_Z_FAR);
    else this.meZ = clamp(this.meZ, -PLAY.BOUND_Z_FAR, -PLAY.BOUND_Z_NEAR);
  }

  private frameAuthority(dt: number): void {
    const sim = this.sim as HostSim;
    sim.players[this.mySide].x = this.meX;
    sim.players[this.mySide].z = this.meZ;
    if (Math.abs(this.mySwing) > Math.abs(sim.players[this.mySide].swing)) {
      sim.players[this.mySide].swing = this.mySwing;
    }
    this.ai?.update(dt, sim);
    sim.update(dt);

    // ポイント開始時（setupPoint）はシミュレーション側が配置を決めるので、
    // ローカルの自機位置をそれに合わせる
    if (sim.resetSeq !== this.lastResetSeq) {
      this.lastResetSeq = sim.resetSeq;
      this.meX = sim.players[this.mySide].x;
      this.meZ = sim.players[this.mySide].z;
      this.views[this.mySide].update(0, this.meX, this.meZ, 0, true);
    }

    // 送信
    if (this.net) {
      this.sendTimer += dt;
      if (this.sendTimer >= NET_RATE.INTERVAL) {
        this.sendTimer = 0;
        this.net.send(this.buildSnapshot(sim));
      }
    }

    const b = sim.ball;
    this.consumeShared(
      sim.score,
      sim.phase,
      [sim.msgSeq, sim.msgText],
      sim.fx,
      true,
      b.p.x,
      b.p.z,
    );

    // ビュー更新
    this.views[this.mySide].update(dt, this.meX, this.meZ, sim.players[this.mySide].swing, true);
    const opp = (1 - this.mySide) as 0 | 1;
    this.views[opp].update(dt, sim.players[opp].x, sim.players[opp].z, sim.players[opp].swing, this.mode === 'practice');
    this.ballView.update(dt, b.p.x, b.p.y, b.p.z, b.active);
  }

  private frameClient(dt: number): void {
    if (this.clientPhase === 'rally') {
      const ev = this.localBall.step(dt);
      if (ev.bounce) {
        sfx.bounce();
        this.ballView.bounceAt(ev.bounce.x, ev.bounce.z);
      }
    }

    if (this.net) {
      this.sendTimer += dt;
      if (this.sendTimer >= NET_RATE.INTERVAL) {
        this.sendTimer = 0;
        const msg: ClientMsg = { t: 'pos', p: [this.meX, this.meZ], sw: this.mySwing };
        this.net.send(msg);
      }
    }

    this.views[1].update(dt, this.meX, this.meZ, this.mySwing, true);
    this.views[0].update(dt, this.oppTarget[0], this.oppTarget[1], this.oppTarget[2]);
    const b = this.localBall;
    this.ballView.update(dt, b.p.x, b.p.y, b.p.z, b.active);
  }

  /** スコア/メッセージ/効果音などホスト・クライアント共通の HUD 反映 */
  private consumeShared(
    sc: Score,
    ph: Phase,
    msg: [number, string],
    fx: FxCounters,
    playBounce: boolean,
    ballX = 0,
    ballZ = 0,
  ): void {
    // スコア
    const key = `${sc.points[0]},${sc.points[1]},${sc.games[0]},${sc.games[1]},${sc.server}`;
    if (key !== this.lastScoreKey) {
      this.lastScoreKey = key;
      this.hud.setScore(sc, this.mySide);
    }

    // メッセージ
    if (msg[0] !== this.lastMsgSeq) {
      this.lastMsgSeq = msg[0];
      if (msg[1]) this.hud.flash(msg[1]);
    }

    // 効果音（カウンタ差分）
    if (fx.hit > this.lastFx.hit) sfx.hit();
    if (fx.net > this.lastFx.net) sfx.net();
    if (fx.point > this.lastFx.point) sfx.point();
    if (fx.fault > this.lastFx.fault) sfx.fault();
    if (playBounce && fx.bounce > this.lastFx.bounce) {
      sfx.bounce();
      this.ballView.bounceAt(ballX, ballZ);
    }
    this.lastFx = { ...fx };

    // サーブヒント
    const showHint = ph === 'await-serve' && sc.server === this.mySide;
    if (showHint !== this.serveHintShown) {
      this.serveHintShown = showHint;
      this.hud.setServeHint(showHint);
    }

    // リザルト
    if (ph === 'over' && !this.resultShown) {
      this.resultShown = true;
      const won = sc.winner === this.mySide;
      const opp = (1 - this.mySide) as 0 | 1;
      this.hud.showResult(won, `ゲームカウント ${sc.games[this.mySide]} - ${sc.games[opp]}`);
    } else if (ph !== 'over' && this.resultShown) {
      this.resultShown = false;
      this.hud.hideResult();
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
    };
  }

  private frameCamera(dt: number): void {
    const k = Math.min(1, dt * 3.5);
    const targetX = this.meX * 0.3;
    this.camPos.x += (targetX - this.camPos.x) * k;
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camPos.x * 0.4, 0, -this.s * 1.0);
  }

  // ============ 外部操作 ============

  rematch(): void {
    if (this.sim) {
      if (this.sim.phase === 'over') this.sim.restart();
    } else {
      this.net?.send({ t: 'rematch' });
    }
  }

  dispose(): void {
    this.renderer.setAnimationLoop(null);
    window.removeEventListener('resize', this.onResize);
    this.controls.dispose();
    this.hud.hide();
    this.renderer.domElement.remove();
    this.renderer.dispose();
  }
}
