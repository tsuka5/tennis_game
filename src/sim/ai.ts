/**
 * 練習モード用の AI（プレイヤー1 / z < 0 側を操作）。
 * ボールの落下点を予測して移動し、届く範囲に来たら少し遅れて打ち返す。
 */
import { COURT, PLAY } from '../config';
import { HostSim, sideOf } from './HostSim';

const AI_INDEX = 1 as const;
const HOME_Z = -(COURT.HALF_L - 0.6);

export class AiController {
  private serveTimer = 0;
  private reactTimer = 0;
  private planned = false;
  private aim = 0;
  private lob = false;

  update(dt: number, sim: HostSim): void {
    const me = sim.players[AI_INDEX];
    const s = sideOf(AI_INDEX);

    if (sim.phase === 'await-serve') {
      this.planned = false;
      if (sim.score.server === AI_INDEX) {
        this.serveTimer += dt;
        // 照準マーカーがほどよいパワーのタイミングを待って打つ
        const aim = sim.serveAim;
        if (this.serveTimer > 0.7 && aim && aim.power > 0.45 && aim.power < 0.8) {
          this.serveTimer = 0;
          sim.trySwing(AI_INDEX, { kind: 'drive', aim: 0 });
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

    const speed = PLAY.SPEED * 0.88; // 人間より少しだけ遅く
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
        this.reactTimer = 0.08 + Math.random() * 0.16;
        this.aim = (Math.random() * 2 - 1) * 0.95;
        this.lob = Math.random() < 0.14;
      }
      this.reactTimer -= dt;
      if (this.reactTimer <= 0) {
        this.planned = false;
        sim.trySwing(AI_INDEX, { kind: this.lob ? 'lob' : 'drive', aim: this.aim });
      }
    } else {
      this.planned = false;
    }
  }
}
