/**
 * ホスト権威シミュレーション: ボール物理、サーブ/ラリー/ポイントの進行、
 * スコア管理。プレイヤーの位置は入力側（自分/クライアント/AI）が更新し、
 * ここではルール判定にのみ使う。
 */
import { COURT, PLAY } from '../config';
import type { FxCounters, Phase, Score, ShotKind } from '../net/protocol';
import { BallSim, shotWithClearance } from './physics';
import { addPoint, newScore } from './score';

export interface PlayerState {
  x: number;
  z: number;
  /**
   * スイングアニメーション。絶対値が残量 1→0、符号が振る側
   * （+ = 自分の右側/フォアハンド、- = 左側/バックハンド）。
   */
  swing: number;
}

export interface SwingCmd {
  kind: ShotKind;
  /** そのプレイヤー視点の左右狙い -1..1 */
  aim: number;
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** プレイヤー i が守る側の z 符号 */
export const sideOf = (i: 0 | 1): 1 | -1 => (i === 0 ? 1 : -1);

export class HostSim {
  ball = new BallSim();
  score: Score;
  phase: Phase = 'between';
  players: [PlayerState, PlayerState] = [
    { x: 0, z: COURT.HALF_L + 1, swing: 0 },
    { x: 0, z: -(COURT.HALF_L + 1), swing: 0 },
  ];
  fx: FxCounters = { hit: 0, bounce: 0, net: 0, point: 0, fault: 0 };
  msgSeq = 0;
  msgText = '';
  resetSeq = 0;

  private lastHitter: 0 | 1 = 0;
  private bouncesSinceHit = 0;
  private canSwingArr: [boolean, boolean] = [false, false];
  private serving = false;
  private serveNum: 1 | 2 = 1;
  private serveBoxXSign = 1;
  private timer = 1.2;

  constructor(firstServer: 0 | 1) {
    this.score = newScore(firstServer);
    this.say('スタート！');
  }

  restart(): void {
    this.score = newScore(Math.random() < 0.5 ? 0 : 1);
    this.serveNum = 1;
    this.phase = 'between';
    this.timer = 1.2;
    this.say('スタート！');
  }

  private say(text: string): void {
    this.msgSeq++;
    this.msgText = text;
  }

  /** ポイント開始: サーブ位置にプレイヤーとボールを配置。 */
  private setupPoint(): void {
    const sv = this.score.server;
    const rc = (1 - sv) as 0 | 1;
    const s = sideOf(sv);
    const total = this.score.points[0] + this.score.points[1];
    const deuce = total % 2 === 0;
    // サーバーから見た「右」の世界 x 符号は s と一致する
    const sx = (deuce ? 1 : -1) * s * 1.3;
    this.players[sv].x = sx;
    this.players[sv].z = s * (COURT.HALF_L + 0.5);
    this.players[rc].x = -Math.sign(sx) * 1.8;
    this.players[rc].z = -s * (COURT.HALF_L + 0.7);
    this.players[sv].swing = 0;
    this.players[rc].swing = 0;
    this.ball.hold(sx, 1.35, s * (COURT.HALF_L + 0.3));
    this.serving = false;
    this.bouncesSinceHit = 0;
    this.canSwingArr = [false, false];
    this.phase = 'await-serve';
    this.resetSeq++;
    if (this.serveNum === 2) this.say('セカンドサーブ');
  }

  canHit(i: 0 | 1): boolean {
    if (this.phase !== 'rally' || !this.canSwingArr[i]) return false;
    const b = this.ball.p;
    const pl = this.players[i];
    // ボールが自陣側（ネット際は少し許容）にあること
    if (Math.sign(b.z) !== sideOf(i) && Math.abs(b.z) > 0.4) return false;
    if (b.y > PLAY.MAX_HIT_Y) return false;
    return Math.hypot(b.x - pl.x, b.z - pl.z) <= PLAY.REACH;
  }

  /** ボールがプレイヤーの右側にあれば +1、左側なら -1（本人視点） */
  swingDirFor(i: 0 | 1): 1 | -1 {
    const right = (this.ball.p.x - this.players[i].x) * sideOf(i);
    return right >= 0 ? 1 : -1;
  }

  /** スイング入力。当たれば true。 */
  trySwing(i: 0 | 1, cmd: SwingCmd): boolean {
    this.players[i].swing = this.swingDirFor(i);
    if (this.phase === 'await-serve' && i === this.score.server) {
      this.doServe(cmd);
      return true;
    }
    if (this.canHit(i)) {
      this.doHit(i, cmd);
      return true;
    }
    return false;
  }

  private doServe(cmd: SwingCmd): void {
    const sv = this.score.server;
    const s = sideOf(sv);
    const pl = this.players[sv];
    const from = { x: pl.x, y: 2.75, z: pl.z };
    // 対角のサービスボックスへ（x 符号はサーバー位置の反対側）
    this.serveBoxXSign = -Math.sign(pl.x || 1);
    const lateral = clamp(1.6 + cmd.aim * this.serveBoxXSign * s * 1.6 + Math.random() * 1.2, 0.7, 3.7);
    const tx = this.serveBoxXSign * lateral;
    const tz = -s * clamp(2.6 + Math.random() * 3.2, 1.4, COURT.SERVICE_LINE - 0.4);
    const speedT = this.serveNum === 1 ? 0.62 : 0.75; // セカンドは安全に
    const v = shotWithClearance(from, tx, tz, speedT, this.serveNum === 1 ? 0.18 : 0.45);
    this.ball.set(from, v);
    this.serving = true;
    this.lastHitter = sv;
    this.bouncesSinceHit = 0;
    this.canSwingArr[sv] = false;
    this.canSwingArr[1 - sv] = true;
    this.phase = 'rally';
    this.fx.hit++;
  }

  private doHit(i: 0 | 1, cmd: SwingCmd): void {
    const s = sideOf(i);
    const b = this.ball.p;
    const from = { x: b.x, y: Math.max(b.y, 0.45), z: b.z };

    let t: number;
    let depth: number;
    let margin: number;
    const smash = cmd.kind === 'drive' && b.y > 1.65;
    if (cmd.kind === 'lob') {
      t = 1.55;
      depth = 0.85;
      margin = 1.7;
    } else if (smash) {
      t = 0.52;
      depth = 0.62;
      margin = 0.05;
    } else {
      t = 0.82;
      depth = 0.78;
      margin = 0.28;
    }

    const err = (Math.random() * 2 - 1) * 0.45;
    const tx = clamp(
      cmd.aim * s * (COURT.HALF_SW - 0.6) + err,
      -(COURT.HALF_SW - 0.35),
      COURT.HALF_SW - 0.35,
    );
    const tz = -s * clamp(COURT.HALF_L * depth + (Math.random() * 2 - 1) * 0.9, 3.0, COURT.HALF_L - 0.4);
    const v = shotWithClearance(from, tx, tz, t, margin);
    this.ball.set(from, v);
    this.serving = false;
    this.lastHitter = i;
    this.bouncesSinceHit = 0;
    this.canSwingArr[i] = false;
    this.canSwingArr[1 - i] = true;
    this.fx.hit++;
  }

  update(dt: number): void {
    for (const p of this.players) {
      p.swing = Math.sign(p.swing) * Math.max(0, Math.abs(p.swing) - dt / PLAY.SWING_TIME);
    }

    if (this.phase === 'between') {
      this.timer -= dt;
      if (this.timer <= 0) {
        if (this.score.finished) this.phase = 'over';
        else this.setupPoint();
      }
      return;
    }

    if (this.phase === 'await-serve') {
      // サーバーがベースライン沿いに動いたらトス位置も追従
      const sv = this.score.server;
      this.ball.p.x = this.players[sv].x;
      return;
    }

    if (this.phase !== 'rally') return;

    const ev = this.ball.step(dt);
    if (ev.netHit) {
      this.fx.net++;
      if (this.serving) {
        this.fault();
        return;
      }
    }
    if (ev.bounce) {
      this.fx.bounce++;
      this.onBounce(ev.bounce.x, ev.bounce.z);
      if (this.phase !== 'rally') return;
    }

    // 転がってしまった（=相手が返せなかった）
    if (
      this.ball.active &&
      this.ball.p.y <= 0.06 &&
      Math.abs(this.ball.v.y) < 0.4 &&
      this.bouncesSinceHit >= 1
    ) {
      this.pointTo(this.lastHitter, 'ナイスショット！');
      return;
    }

    // 安全弁: ワールド外
    if (Math.abs(this.ball.p.x) > 35 || Math.abs(this.ball.p.z) > 45) {
      this.pointTo((1 - this.lastHitter) as 0 | 1, 'アウト！');
    }
  }

  private onBounce(bx: number, bz: number): void {
    const sideIdx: 0 | 1 = bz >= 0 ? 0 : 1;
    this.bouncesSinceHit++;

    if (this.serving && this.bouncesSinceHit === 1) {
      if (this.inServiceBox(bx, bz)) {
        this.serving = false;
        return;
      }
      this.fault();
      return;
    }

    if (this.bouncesSinceHit === 1) {
      if (sideIdx === this.lastHitter) {
        // ネットを越えず自陣に落ちた
        this.pointTo((1 - this.lastHitter) as 0 | 1, 'ミス！');
        return;
      }
      if (!this.inSingles(bx, bz)) {
        this.pointTo((1 - this.lastHitter) as 0 | 1, 'アウト！');
        return;
      }
      return; // イン: ラリー続行
    }

    // ツーバウンド
    this.pointTo(this.lastHitter, 'ナイスショット！');
  }

  private inSingles(x: number, z: number): boolean {
    const m = COURT.LINE_MARGIN;
    return Math.abs(x) <= COURT.HALF_SW + m && Math.abs(z) <= COURT.HALF_L + m;
  }

  private inServiceBox(x: number, z: number): boolean {
    const m = COURT.LINE_MARGIN;
    const s = sideOf(this.score.server);
    if (Math.sign(z) !== -s) return false;
    if (Math.abs(z) > COURT.SERVICE_LINE + m) return false;
    if (Math.abs(x) > COURT.HALF_SW + m) return false;
    return Math.sign(x || this.serveBoxXSign) === this.serveBoxXSign;
  }

  private fault(): void {
    this.ball.active = false;
    this.fx.fault++;
    if (this.serveNum === 1) {
      this.serveNum = 2;
      this.say('フォルト！');
      this.phase = 'between';
      this.timer = 1.5;
    } else {
      this.serveNum = 1;
      const receiver = (1 - this.score.server) as 0 | 1;
      this.pointTo(receiver, 'ダブルフォルト');
    }
  }

  private pointTo(w: 0 | 1, reason: string): void {
    this.ball.active = false;
    this.serveNum = 1;
    const gamesBefore = this.score.games[0] + this.score.games[1];
    addPoint(this.score, w);
    this.fx.point++;
    const gamesAfter = this.score.games[0] + this.score.games[1];
    // ポイントコールはスコアボード側で見せる。ここでは理由＋ゲーム獲得のみ。
    this.say(gamesAfter > gamesBefore ? `${reason}　ゲーム！` : reason);
    this.phase = 'between';
    this.timer = this.score.finished ? 1.2 : 2.2;
  }
}
