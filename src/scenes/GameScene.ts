/**
 * Phase 1: offline wall-rally prototype.
 * See docs/specs/08-roadmap.md (Phase 1) and 04-game-rules.md.
 *
 * Loop: serve toward the player -> player hits (A/B) the ball over the net ->
 * the top "wall" reflects it back -> player must return it before it bounces
 * twice on their side or passes the baseline. Each successful hit grows the
 * rally counter. All gameplay runs in host perspective (identity transform);
 * the logical/local split (core/coords.ts) is ready for Phase 2.
 */
import Phaser from 'phaser';
import { CONFIG, COURT, VIEW } from '../config/gameConfig';
import { Ball } from '../objects/Ball';
import { Player } from '../objects/Player';
import { VirtualJoystick } from '../input/VirtualJoystick';
import { ShotButtons } from '../input/ShotButtons';
import { Hud } from '../ui/Hud';
import { vecToLogical } from '../core/coords';
import { sfx } from '../core/audio';

export class GameScene extends Phaser.Scene {
  private player!: Player;
  private ball!: Ball;
  private joystick!: VirtualJoystick;
  private buttons!: ShotButtons;
  private hud!: Hud;

  private ballInPlay = false;
  private playerSideBounces = 0;
  private prevY = 0;
  private rally = 0;
  private best = 0;

  constructor() {
    super('Game');
  }

  create(): void {
    this.input.addPointer(2); // up to 3 simultaneous touches (two thumbs + spare)
    this.drawCourt();

    this.player = new Player(this, COURT.x0 + COURT.w / 2, COURT.y1 - 120);
    this.ball = new Ball(this, COURT.x0 + COURT.w / 2, COURT.netY + 60);

    this.joystick = new VirtualJoystick(this);
    this.buttons = new ShotButtons(this);
    this.buttons.onShot = (k) => this.attemptHit(k);

    this.hud = new Hud(this);
    this.hud.setRally(0, 0);

    // Unlock audio on the first user gesture (iOS Safari requirement, Q-7/Q-9).
    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => sfx.unlock());

    this.serve();
  }

  private drawCourt(): void {
    const g = this.add.graphics().setDepth(1);
    // court surface
    g.fillStyle(0x1f7a52, 1);
    g.fillRect(COURT.x0, COURT.y0, COURT.w, COURT.h);
    // border + center service line
    g.lineStyle(4, 0xeafff5, 0.9);
    g.strokeRect(COURT.x0, COURT.y0, COURT.w, COURT.h);
    g.lineStyle(2, 0xeafff5, 0.4);
    g.lineBetween(COURT.x0 + COURT.w / 2, COURT.y0, COURT.x0 + COURT.w / 2, COURT.y1);
    // net (dashed)
    g.lineStyle(4, 0xffffff, 0.95);
    const dash = 18;
    for (let x = COURT.x0; x < COURT.x1; x += dash * 2) {
      g.lineBetween(x, COURT.netY, Math.min(x + dash, COURT.x1), COURT.netY);
    }
    // wall (Phase 1 only)
    g.lineStyle(8, 0xb0413e, 0.9);
    g.lineBetween(COURT.x0, COURT.wallY, COURT.x1, COURT.wallY);

    // labels for thumb zones (subtle)
    this.add
      .text(VIEW.WIDTH * 0.25, VIEW.HEIGHT - 28, '← 移動（どこでもタッチ）', {
        fontSize: '16px',
        color: '#eafff5',
      })
      .setOrigin(0.5)
      .setAlpha(0.4)
      .setDepth(1);
  }

  private serve(): void {
    const x = Phaser.Math.Between(COURT.x0 + 120, COURT.x1 - 120);
    this.ball.place(x, COURT.netY + 40, 3);
    // gentle toss toward the player so the first hit is natural
    this.ball.launch(Phaser.Math.Between(-40, 40), CONFIG.shot.LOB_SPEED * 0.7, 4, 'lob');
    this.playerSideBounces = 0;
    this.prevY = this.ball.y;
    this.ballInPlay = true;
    this.hud.flash(this, 'サーブ');
  }

  private canHit(): boolean {
    if (!this.ballInPlay || this.ball.y <= COURT.netY) return false;
    return Math.hypot(this.player.x - this.ball.x, this.player.y - this.ball.y) <= CONFIG.player.HIT_RANGE;
  }

  private attemptHit(kind: 'A' | 'B'): void {
    if (!this.canHit()) return;

    const angleDeg = this.joystick.vec.x * CONFIG.shot.SHOT_MAX_ANGLE_DEG;
    const a = Phaser.Math.DegToRad(angleDeg);

    let speed: number;
    let vh: number;
    let shot: Ball['shot'];
    if (kind === 'B') {
      speed = CONFIG.shot.LOB_SPEED;
      vh = CONFIG.physics.LOB_LAUNCH_VH;
      shot = 'lob';
    } else {
      const isSmash =
        this.ball.height >= CONFIG.shot.SMASH_HEIGHT ||
        this.ball.speed >= CONFIG.shot.SMASH_INCOMING_SPEED;
      speed = isSmash ? CONFIG.shot.SMASH_SPEED : CONFIG.shot.SHOT_SPEED;
      vh = CONFIG.physics.SHOT_LAUNCH_VH;
      shot = isSmash ? 'smash' : 'normal';
    }

    // Direction is "up the court" (-y) with left/right course from the stick.
    // Transform the local intent into logical space for Phase 2 readiness.
    const local = { x: Math.sin(a), y: -Math.cos(a) };
    const logical = vecToLogical('host', local.x, local.y);
    this.ball.launch(logical.x * speed, logical.y * speed, vh, shot);
    if (this.ball.height < CONFIG.physics.NET_HEIGHT) this.ball.height = CONFIG.physics.NET_HEIGHT;

    this.playerSideBounces = 0;
    this.rally += 1;
    this.best = Math.max(this.best, this.rally);
    this.hud.setRally(this.rally, this.best);
    shot === 'smash' ? sfx.smash() : sfx.hit();
  }

  private miss(reason: string): void {
    if (!this.ballInPlay) return;
    this.ballInPlay = false;
    this.best = Math.max(this.best, this.rally);
    this.rally = 0;
    this.hud.setRally(this.rally, this.best);
    this.hud.flash(this, reason);
    sfx.score();
    this.time.delayedCall(900, () => this.serve());
  }

  update(_time: number, deltaMs: number): void {
    const dt = Math.min(deltaMs / 1000, 0.05);

    // --- input -> player (local input transformed to logical; identity here) ---
    const mv = vecToLogical('host', this.joystick.vec.x, this.joystick.vec.y);
    this.player.move(mv.x, mv.y);
    this.player.clamp();

    if (!this.ballInPlay) {
      this.ball.update(dt);
      return;
    }

    const bounced = this.ball.update(dt);
    const r = CONFIG.ball.RADIUS;

    // ground bounce on the player's own side
    if (bounced && this.ball.y > COURT.netY) {
      this.playerSideBounces += 1;
      if (this.playerSideBounces > CONFIG.physics.MAX_BOUNCE) {
        this.miss('ミス！');
        return;
      }
    }

    // side walls
    if (this.ball.x <= COURT.x0 + r && this.ball.vx < 0) this.ball.setVelocity(-this.ball.vx, this.ball.vy);
    if (this.ball.x >= COURT.x1 - r && this.ball.vx > 0) this.ball.setVelocity(-this.ball.vx, this.ball.vy);

    // top wall (Phase 1): reflect back toward the player
    if (this.ball.y <= COURT.wallY && this.ball.vy < 0) {
      const jitter = Phaser.Math.Between(-50, 50);
      this.ball.setVelocity(this.ball.vx + jitter, -this.ball.vy * CONFIG.physics.WALL_RESTITUTION);
    }

    // net crossing checks
    const crossedUp = this.prevY > COURT.netY && this.ball.y <= COURT.netY;
    const crossedDown = this.prevY < COURT.netY && this.ball.y >= COURT.netY;
    if (crossedUp && this.ball.height < CONFIG.physics.NET_HEIGHT) {
      this.miss('ネット！');
      return;
    }
    if (crossedDown) {
      this.playerSideBounces = 0; // fresh incoming ball
    }

    // baseline: ball passed behind the player
    if (this.ball.y >= COURT.y1) {
      this.miss('ミス！');
      return;
    }

    this.buttons.setReady(this.canHit());
    this.prevY = this.ball.y;
  }
}
