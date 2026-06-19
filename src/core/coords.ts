/**
 * Logical <-> local (screen) coordinate transforms.
 * See docs/specs/02-coordinate-and-camera.md.
 *
 * Phase 1 is a single-device, host-perspective prototype, so the transform is
 * the identity. This module exists so Phase 2 can introduce the 180° flip for
 * the client perspective WITHOUT touching gameplay/physics code: all simulation
 * stays in logical coordinates and only rendering/input pass through here.
 *
 * Invariant I-1 (docs/specs/06-data-models.md): synchronized state is always in
 * logical coordinates; the render transform must not mutate logical state.
 */
import { COURT } from '../config/gameConfig';

export type Perspective = 'host' | 'client';

export interface XY {
  x: number;
  y: number;
}

/** Logical court position -> local screen position. */
export function toLocal(p: Perspective, x: number, y: number): XY {
  if (p === 'host') return { x, y };
  // Client: rotate 180° about the court center.
  return {
    x: COURT.x0 + (COURT.w - (x - COURT.x0)),
    y: COURT.y0 + (COURT.h - (y - COURT.y0)),
  };
}

/** Local screen position -> logical court position (inverse of toLocal). */
export function toLogical(p: Perspective, x: number, y: number): XY {
  // The 180° rotation is its own inverse, so the math mirrors toLocal.
  return toLocal(p, x, y);
}

/** Transform an input/velocity vector from local to logical space. */
export function vecToLogical(p: Perspective, vx: number, vy: number): XY {
  if (p === 'host') return { x: vx, y: vy };
  return { x: -vx, y: -vy };
}
