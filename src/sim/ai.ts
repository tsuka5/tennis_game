/**
 * 練習モード用の AI（プレイヤー1 / z < 0 側を操作）。
 * ボールの落下点を予測して移動し、届く範囲に来たら少し遅れて打ち返す。
 * レベルで足の速さ・反応・狙いの賢さ・パワー制御が変わる。
 */
import { COURT, PLAY, SERVE } from '../config';
import { HostSim, serveStand, sideOf } from './HostSim';

const AI_INDEX = 1 as const;
const HOME_Z = -(COURT.HALF_L - 0.6);

export type AiLevel = 1 | 2 | 3;

interface AiParams {
  /** 移動速度倍率 */
  speed: number;
  /** 反応の遅れ（最小/ばらつき, s） */
  reactMin: number;
  reactVar: number;
  /** 狙いのブレ（0=正確） */
  aimErr: number;
  /** フリック強さの範囲 */
  powMin: number;
  powVar: number;
  /** true なら相手から遠いサイドを狙う */
  smart: boolean;
}

const AI_PARAMS: Record<AiLevel, AiParams> = {
  1: { speed: 0.6, reactMin: 0.25, reactVar: 0.3, aimErr: 0.5, powMin: 0.3, powVar: 0.3, smart: false },
  2: { speed: 0.88, reactMin: 0.1, reactVar: 0.18, aimErr: 0.25, powMin: 0.4, powVar: 0.4, smart: false },
  3: { speed: 1.02, reactMin: 0.04, reactVar: 0.1, aimErr: 0.1, powMin: 0.55, powVar: 0.35, smart: true },
};

export class AiController {
  private readonly p: AiParams;
  private serveTimer = 0;
  private reactTimer = 0;
  private planned = false;
  private aim = 0;
  private power = 0.6;
  private lob = false;

  constructor(level: AiLevel = 2) {
    this.p = AI_PARAMS[level];
  }

  update(dt: number, sim: HostSim): void {
    const me = sim.players[AI_INDEX];
    const s = sideOf(AI_INDEX);

    if (sim.phase === 'await-serve') {
      this.planned = false;
      if (sim.score.server === AI_INDEX) {
        this.serveTimer += dt;
        if (this.serveTimer > 0.9 + Math.random() * 0.5) {
          this.serveTimer = 0;
          this.serve(sim, s);
        }
      }
      return;
    }
    this.serveTimer = 0;
    if (sim.phase !== 'rally') return;

    const b = sim.ball;
    const incoming = b.v.z * s > 0 || Math.sign(b.p.z) === s;

    // 目標位置: 来るボールの自分の深さでの x、来ないときはセンターへ
    let targetX = 0;
    let targetZ = HOME_Z;
    if (incoming && Math.abs(b.v.z) > 0.5) {
      const tReach = (me.z - b.p.z) / b.v.z;
      if (tReach > 0) targetX = b.p.x + b.v.x * tReach;
      targetX = Math.max(-COURT.HALF_SW, Math.min(COURT.HALF_SW, targetX));
      // 浅いボールには前へ詰める
      if (Math.sign(b.p.z) === s && Math.abs(b.p.z) < Math.abs(me.z) - 1.5) {
        targetZ = -Math.max(Math.abs(b.p.z), PLAY.BOUND_Z_NEAR + 0.8);
      }
    }

    const speed = PLAY.SPEED * this.p.speed;
    const dx = targetX - me.x;
    const dz = targetZ - me.z;
    const d = Math.hypot(dx, dz);
    if (d > 0.05) {
      const step = Math.min(d, speed * dt);
      me.x += (dx / d) * step;
      me.z += (dz / d) * step;
    }

    if (sim.canHit(AI_INDEX)) {
      if (!this.planned) {
        this.planned = true;
        this.reactTimer = this.p.reactMin + Math.random() * this.p.reactVar;
        this.power = this.p.powMin + Math.random() * this.p.powVar;
        this.lob = Math.random() < 0.14;
        if (this.p.smart) {
          // 相手のいない側へ（ワールド x 符号の逆 → 自分視点へ変換）
          const oppX = sim.players[0].x;
          this.aim = -Math.sign(oppX || 1) * s * (0.5 + Math.random() * 0.4);
        } else {
          this.aim = (Math.random() * 2 - 1) * 0.7;
        }
        this.aim += (Math.random() * 2 - 1) * this.p.aimErr;
      }
      this.reactTimer -= dt;
      if (this.reactTimer <= 0) {
        this.planned = false;
        sim.trySwing(AI_INDEX, {
          kind: this.lob ? 'lob' : 'drive',
          dirX: this.aim,
          dirY: 1,
          power: this.power,
        });
      }
    } else {
      this.planned = false;
    }
  }

  /** 対角サービスボックスの真ん中あたりを狙い、レベル分だけブレる */
  private serve(sim: HostSim, s: 1 | -1): void {
    const me = sim.players[AI_INDEX];
    const stand = serveStand(AI_INDEX, sim.score.points);
    const boxSign = -Math.sign(stand.x0 + stand.x1) || 1;
    const tx = boxSign * (1.4 + Math.random() * 1.6) + (Math.random() * 2 - 1) * this.p.aimErr * 2;
    const tz = -s * (3 + Math.random() * 2.5);
    // ワールドの狙い → 自分視点のフリック方向と強さへ逆変換
    const dxw = tx - me.x;
    const dzw = tz - me.z;
    const dist = Math.hypot(dxw, dzw) * (1 + (Math.random() * 2 - 1) * this.p.aimErr * 0.2);
    const power = Math.max(0.15, Math.min(1, (dist - SERVE.DIST_MIN) / SERVE.DIST_RANGE));
    sim.trySwing(AI_INDEX, { kind: 'drive', dirX: dxw * s, dirY: -dzw * s, power });
  }
}
