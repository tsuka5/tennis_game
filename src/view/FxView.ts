/**
 * 打球スパーク・紙吹雪などのパーティクル演出（スプライトベース）。
 * モバイルでも軽いよう、ポストプロセスは使わず加算ブレンドの
 * スプライトだけで「派手さ」を出す。
 */
import * as THREE from 'three';
import type { V3 } from '../sim/physics';

interface Particle {
  sprite: THREE.Sprite;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  gravity: number;
  size: number;
  spin: number;
}

function radialTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.7)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function squareTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 16;
  c.height = 16;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  ctx.fillStyle = '#fff';
  ctx.fillRect(2, 4, 12, 8);
  return new THREE.CanvasTexture(c);
}

const CONFETTI_COLORS = [0xccff33, 0xffd700, 0x3ce8a0, 0x27b7e8, 0xf25c9a, 0xffffff];
const MAX_PARTICLES = 260;

export class FxView {
  private readonly particles: Particle[] = [];
  private readonly glowTex = radialTexture();
  private readonly rectTex = squareTexture();

  constructor(private readonly scene: THREE.Scene) {}

  private spawn(
    pos: V3,
    color: number,
    additive: boolean,
    vel: V3,
    life: number,
    size: number,
    gravity: number,
    spin = 0,
  ): void {
    if (this.particles.length >= MAX_PARTICLES) return;
    const mat = new THREE.SpriteMaterial({
      map: additive ? this.glowTex : this.rectTex,
      color,
      transparent: true,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      rotation: Math.random() * Math.PI,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(pos.x, pos.y, pos.z);
    sprite.scale.setScalar(size);
    this.scene.add(sprite);
    this.particles.push({
      sprite,
      vx: vel.x,
      vy: vel.y,
      vz: vel.z,
      life,
      maxLife: life,
      gravity,
      size,
      spin,
    });
  }

  /** 打球スパーク（加算グロー。count と speed で派手さを調整） */
  burst(pos: V3, color: number, count: number, speed: number, size = 0.35): void {
    for (let i = 0; i < count; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.random() * Math.PI;
      const sp = speed * (0.35 + Math.random() * 0.65);
      this.spawn(
        pos,
        color,
        true,
        {
          x: Math.sin(ph) * Math.cos(th) * sp,
          y: Math.abs(Math.cos(ph)) * sp * 0.8 + 1,
          z: Math.sin(ph) * Math.sin(th) * sp,
        },
        0.3 + Math.random() * 0.25,
        size * (0.6 + Math.random() * 0.8),
        6,
      );
    }
  }

  /** バウンドの土煙（コート色に馴染む控えめな粉塵） */
  dust(pos: V3, count = 7): void {
    for (let i = 0; i < count; i++) {
      const th = Math.random() * Math.PI * 2;
      const sp = 1 + Math.random() * 2;
      this.spawn(
        { x: pos.x, y: 0.05, z: pos.z },
        0x9fc0ff,
        true,
        { x: Math.cos(th) * sp, y: 0.6 + Math.random() * 1.2, z: Math.sin(th) * sp },
        0.35 + Math.random() * 0.2,
        0.22 + Math.random() * 0.18,
        2.2,
      );
    }
  }

  /** ポイント獲得の紙吹雪（重力で舞い落ちるカラフルな紙片） */
  confetti(pos: V3, count = 60): void {
    for (let i = 0; i < count; i++) {
      const th = Math.random() * Math.PI * 2;
      const sp = 2.5 + Math.random() * 5;
      this.spawn(
        pos,
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        false,
        {
          x: Math.cos(th) * sp * 0.7,
          y: 3.5 + Math.random() * 4,
          z: Math.sin(th) * sp * 0.7,
        },
        1.4 + Math.random() * 0.9,
        0.16 + Math.random() * 0.12,
        7,
        (Math.random() * 2 - 1) * 6,
      );
    }
  }

  update(dt: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.sprite);
        p.sprite.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }
      p.vy -= p.gravity * dt;
      // 紙吹雪はひらひら落ちる（空気抵抗強め）
      const drag = p.spin !== 0 ? Math.max(0, 1 - 1.6 * dt) : 1;
      p.vx *= drag;
      p.vz *= drag;
      if (p.spin !== 0 && p.vy < -2.2) p.vy = -2.2;
      p.sprite.position.x += p.vx * dt;
      p.sprite.position.y += p.vy * dt;
      p.sprite.position.z += p.vz * dt;
      if (p.sprite.position.y < 0.02) p.sprite.position.y = 0.02;
      const t = p.life / p.maxLife;
      p.sprite.material.opacity = Math.min(1, t * 1.6);
      p.sprite.material.rotation += p.spin * dt;
      p.sprite.scale.setScalar(p.size * (p.spin !== 0 ? 1 : 0.4 + t * 0.6));
    }
  }
}
