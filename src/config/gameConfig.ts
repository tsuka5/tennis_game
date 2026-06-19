/**
 * Central balance / configuration object.
 * See docs/specs/06-data-models.md 6.6 (GameConfig) and 09-open-questions.md 9.3.
 *
 * NOTE: The spec lists placeholder defaults tuned for an 800x1200 logical court.
 * Phase 1 renders a landscape view (1280x720) with a wider, shallower court
 * (800x600). The constants below are tuned for that view and supersede the
 * placeholders pending balancing. Gameplay units are "logical units" which,
 * in Phase 1, map 1:1 to canvas pixels inside the court (see coords.ts).
 */

export const VIEW = {
  WIDTH: 1280,
  HEIGHT: 720,
} as const;

/** Court rectangle in canvas coordinates (Phase 1: logical == canvas). */
export const COURT = {
  x0: 240,
  y0: 60,
  w: 800,
  h: 600,
  get x1() {
    return this.x0 + this.w;
  },
  get y1() {
    return this.y0 + this.h;
  },
  /** Net line (horizontal). Host plays the bottom half (y > netY). */
  get netY() {
    return this.y0 + this.h / 2;
  },
  /** Wall line for Phase 1 wall-rally: ball reflects here (top interior). */
  get wallY() {
    return this.y0 + 24;
  },
} as const;

export interface GameConfig {
  player: {
    PLAYER_MAX_SPEED: number;
    RADIUS: number;
    HIT_RANGE: number;
    /** Player movement bounds within own (bottom) half, in canvas coords. */
    moveBounds: { minX: number; maxX: number; minY: number; maxY: number };
  };
  joystick: {
    JOY_DEADZONE_PX: number;
    JOY_MAX_RADIUS_PX: number;
  };
  shot: {
    SHOT_SPEED: number;
    SMASH_SPEED: number;
    LOB_SPEED: number;
    SHOT_MAX_ANGLE_DEG: number;
    SMASH_HEIGHT: number; // Q-6
    SMASH_INCOMING_SPEED: number; // Q-6
  };
  ball: {
    RADIUS: number;
  };
  physics: {
    GRAVITY_H: number; // pseudo-height gravity (units/s^2)
    BOUNCE_DAMP: number; // height restitution on ground contact
    WALL_RESTITUTION: number; // speed kept after wall reflection
    NET_HEIGHT: number; // pseudo-height required to clear the net
    MAX_BOUNCE: number; // bounces allowed on own side before a miss
    SHOT_LAUNCH_VH: number; // upward height velocity for a normal drive
    LOB_LAUNCH_VH: number; // upward height velocity for a lob
  };
}

export const CONFIG: GameConfig = {
  player: {
    PLAYER_MAX_SPEED: 280,
    RADIUS: 22,
    HIT_RANGE: 78,
    moveBounds: {
      minX: COURT.x0 + 30,
      maxX: COURT.x1 - 30,
      minY: COURT.netY + 24,
      maxY: COURT.y1 - 26,
    },
  },
  joystick: {
    JOY_DEADZONE_PX: 8,
    JOY_MAX_RADIUS_PX: 64,
  },
  shot: {
    SHOT_SPEED: 380,
    SMASH_SPEED: 560,
    LOB_SPEED: 230,
    SHOT_MAX_ANGLE_DEG: 35,
    SMASH_HEIGHT: 0.6,
    SMASH_INCOMING_SPEED: 600,
  },
  ball: {
    RADIUS: 9,
  },
  physics: {
    GRAVITY_H: 22,
    BOUNCE_DAMP: 0.62,
    WALL_RESTITUTION: 0.98,
    NET_HEIGHT: 1.0,
    MAX_BOUNCE: 1,
    SHOT_LAUNCH_VH: 7.5,
    LOB_LAUNCH_VH: 16,
  },
};
