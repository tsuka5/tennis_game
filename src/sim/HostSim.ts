/**
 * ホスト権威シミュレーション: ボール物理、サーブ/ラリー/ポイントの進行、
 * スコア管理。プレイヤーの位置は入力側（自分/クライアント/AI）が更新し、
 * ここではルール判定にのみ使う。
 */
import { COURT, PLAY, SERVE } from '../config';
import type { FxCounters, Phase, Score, ShotKind } from '../net/protocol';
import { BallSim, shotAtLanding } from './physics';
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
  /** 引っ張った方向（自分視点。右+） */
  dirX: number;
  /** 引っ張った方向（自分視点。前=ネット方向+） */
  dirY: number;
  /** 引っ張りの強さ 0..1 */
  power: number;
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** プレイヤー i が守る側の z 符号 */
export const sideOf = (i: 0 | 1): 1 | -1 => (i === 0 ? 1 : -1);

/**
 * サーブを打てる立ち位置。ベースライン上（z 固定）かつ、デュース/アドサイドに
 * 応じた正しい半面側の x 範囲 [x0, x1] のみ。
 */
export function serveStand(server: 0 | 1, points: [number, number]): { z: number; x0: number; x1: number } {
  const s = sideOf(server);
  const deuce = (points[0] + points[1]) % 2 === 0;
  const sign = (deuce ? 1 : -1) * s;
  const a = sign * SERVE.STAND_X_MIN;
  const b = sign * SERVE.STAND_X_MAX;
  return { z: s * SERVE.STAND_Z, x0: Math.min(a, b), x1: Math.max(a, b) };
}

/** サーブ照準（予測着地点とパワー）。マーカー表示とスナップショット配信に使う。 */
export interface ServeAim {
  x: number;
  z: number;
  /** 0=最弱（浅い・遅い） 1=最強（深い・速い） */
  power: number;
}

export interface ShotPlan {
  tx: number;
  tz: number;
  /** 滞空時間の初期値（小さいほど速い） */
  t: number;
  margin: number;
  smash: boolean;
}

/** フリック最小/最大での飛距離 (m)。最大でもアウトは狙えるが控えめに */
const PULL_DIST_MIN = 4;
const PULL_DIST_MAX = 22;
/** 横方向の広がりの圧縮率（アウトになりにくくする） */
const LATERAL_SCALE = 0.8;

/** フリック方向の正規化（後ろ向きは前方へ丸め、横方向を圧縮） */
function flickDir(cmd: SwingCmd, minForward: number): { ux: number; uy: number } {
  const len = Math.hypot(cmd.dirX, cmd.dirY);
  let ux = len > 1e-6 ? cmd.dirX / len : 0;
  let uy = len > 1e-6 ? cmd.dirY / len : 1;
  if (uy < minForward) uy = minForward;
  ux *= LATERAL_SCALE;
  const n = Math.hypot(ux, uy);
  return { ux: ux / n, uy: uy / n };
}

/**
 * 返球の弾道プラン（決定論。着弾のブレなし）。
 * 引っ張り式: ボールは引っ張った方向の延長線上に落ちる。強く引くほど
 * 遠く・速く飛ぶ。コートへのクランプはしない＝強すぎ・広すぎはアウトになる。
 * doHit の実弾道と打つ前のプレビューマーカーの両方で使う。
 */
export function planShot(
  b: { x: number; y: number; z: number },
  s: 1 | -1,
  cmd: SwingCmd,
): ShotPlan {
  const power = clamp(cmd.power, 0, 1);
  const { ux, uy } = flickDir(cmd, 0.18);

  // 着地点 = ボール位置からフリックの延長線上
  const dist = PULL_DIST_MIN + power * (PULL_DIST_MAX - PULL_DIST_MIN);
  const tx = b.x + ux * s * dist;
  const tz = b.z - uy * s * dist;

  const smash = cmd.kind === 'drive' && b.y > PLAY.SMASH_MIN_Y;
  let t: number;
  let margin: number;
  if (cmd.kind === 'lob') {
    t = 2.0 - 0.5 * power;
    margin = 1.7;
  } else if (smash) {
    t = 0.8 - 0.3 * power;
    margin = 0.05;
  } else {
    t = 1.2 - 0.5 * power;
    margin = 0.42 - 0.3 * power;
  }
  return { tx, tz, t, margin, smash };
}

/**
 * フリックサーブの弾道プラン。向き＝コース、強さ＝距離と速さ。
 * 対角サービスボックスを外せばフォルトになる（狙いは自己責任）。
 */
export function planServe(
  pl: { x: number; z: number },
  s: 1 | -1,
  cmd: SwingCmd,
): { tx: number; tz: number; t: number; margin: number } {
  const power = clamp(cmd.power, 0, 1);
  const { ux, uy } = flickDir(cmd, 0.3);
  const dist = SERVE.DIST_MIN + power * SERVE.DIST_RANGE;
  return {
    tx: pl.x + ux * s * dist,
    tz: pl.z - uy * s * dist,
    t: 1.1 - 0.42 * power,
    margin: 0.2,
  };
}

/** サーブが有効な対角サービスボックスに入るか（プレビューの色分け用） */
export function inServiceBoxFor(
  server: 0 | 1,
  points: [number, number],
  x: number,
  z: number,
): boolean {
  const s = sideOf(server);
  const stand = serveStand(server, points);
  const boxSign = -Math.sign(stand.x0 + stand.x1) || 1;
  const m = COURT.LINE_MARGIN;
  if (Math.sign(z) !== -s) return false;
  if (Math.abs(z) > COURT.SERVICE_LINE + m) return false;
  if (Math.abs(x) > COURT.HALF_SW + m) return false;
  return Math.sign(x || boxSign) === boxSign;
}

export class HostSim {
  ball = new BallSim();
  score: Score;
  phase: Phase = 'between';
  players: [PlayerState, PlayerState] = [
    { x: 0, z: COURT.HALF_L + 1, swing: 0 },
    { x: 0, z: -(COURT.HALF_L + 1), swing: 0 },
  ];
  fx: FxCounters = { hit: 0, smash: 0, bounce: 0, net: 0, point: 0, fault: 0 };
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
  /** 先行入力: スワイプが早すぎたらボールが届くまで保持して自動発動 */
  private pendingSwing: [{ cmd: SwingCmd; timer: number } | null, { cmd: SwingCmd; timer: number } | null] = [
    null,
    null,
  ];

  private readonly gamesToWin: number;

  constructor(firstServer: 0 | 1, gamesToWin: number) {
    this.gamesToWin = gamesToWin;
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
    this.pendingSwing = [null, null];
    this.phase = 'await-serve';
    this.clampServer();
    this.resetSeq++;
    if (this.serveNum === 2) this.say('セカンドサーブ');
  }

  /** サーバーをベースライン上（正しい半面）に拘束する */
  private clampServer(): void {
    const sv = this.score.server;
    const stand = serveStand(sv, this.score.points);
    const pl = this.players[sv];
    pl.z = stand.z;
    pl.x = clamp(pl.x, stand.x0, stand.x1);
    this.serveBoxXSign = -Math.sign(stand.x0 + stand.x1) || 1;
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

  /** スイング入力。すぐ当たらなければ少しの間バッファして自動発動する。 */
  trySwing(i: 0 | 1, cmd: SwingCmd): boolean {
    if (this.phase === 'await-serve' && i === this.score.server) {
      this.players[i].swing = this.swingDirFor(i);
      this.doServe(cmd);
      return true;
    }
    if (this.canHit(i)) {
      this.players[i].swing = this.swingDirFor(i);
      this.doHit(i, cmd);
      return true;
    }
    // 先行入力（Tennis Clash 式: 早めのスワイプはボール到達時に発動）
    if (this.phase === 'rally' && this.canSwingArr[i]) {
      this.pendingSwing[i] = { cmd, timer: 0.9 };
    }
    return false;
  }

  private doServe(cmd: SwingCmd): void {
    const sv = this.score.server;
    this.clampServer();
    const pl = this.players[sv];
    const from = { x: pl.x, y: 2.75, z: pl.z };
    // フリックの向きと強さで狙う。ボックスを外せばフォルト
    const plan = planServe(pl, sideOf(sv), cmd);
    const v = shotAtLanding(from, plan.tx, plan.tz, plan.t, plan.margin);
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

    const plan = planShot(b, s, cmd);
    if (plan.smash) {
      this.fx.smash++;
      this.say('スマッシュ！');
    }

    // 引っ張った延長線上に正確に落とす（ブレなし。アウトは自己責任）
    const v = shotAtLanding(from, plan.tx, plan.tz, plan.t, plan.margin);
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
      // 立ち位置拘束。トス位置はサーバーに追従
      this.clampServer();
      this.ball.p.x = this.players[this.score.server].x;
      return;
    }

    if (this.phase !== 'rally') return;

    // 先行入力の消化: ボールが届いた瞬間に発動
    for (const i of [0, 1] as const) {
      const p = this.pendingSwing[i];
      if (!p) continue;
      p.timer -= dt;
      if (p.timer <= 0) {
        this.pendingSwing[i] = null;
      } else if (this.canHit(i)) {
        this.pendingSwing[i] = null;
        this.players[i].swing = this.swingDirFor(i);
        this.doHit(i, p.cmd);
      }
    }

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
    addPoint(this.score, w, this.gamesToWin);
    this.fx.point++;
    const gamesAfter = this.score.games[0] + this.score.games[1];
    // ポイントコールはスコアボード側で見せる。ここでは理由＋ゲーム獲得のみ。
    this.say(gamesAfter > gamesBefore ? `${reason}　ゲーム！` : reason);
    this.phase = 'between';
    this.timer = this.score.finished ? 1.2 : 2.2;
  }
}
