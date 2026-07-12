/**
 * ボールの 3D 表現: 本体 + 落下地点のブロブシャドウ + 残像トレイル、
 * バウンド時のリング演出。
 */
import * as THREE from 'three';
import { BALL } from '../config';

const TRAIL_LEN = 22;
/** 残像スプライトの数 */
const GHOST_LEN = 16;

function glowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export class BallView {
  private readonly mesh: THREE.Mesh;
  private readonly blob: THREE.Mesh;
  private readonly trail: THREE.Line;
  private readonly trailPos: Float32Array;
  private trailCount = 0;
  private readonly rings: { mesh: THREE.Mesh; life: number }[] = [];
  private readonly scene: THREE.Scene;

  // スピード演出
  private readonly glow: THREE.Sprite;
  private readonly ghosts: THREE.Sprite[] = [];
  private ghostHead = 0;
  private prev = { x: 0, y: 0, z: 0 };
  private squash = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    const gtex = glowTexture();
    // ボール本体のグロー（速いほど大きく明るく）
    this.glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: gtex,
        color: 0xd8f24a,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.glow.scale.setScalar(0.5);
    scene.add(this.glow);
    // 残像（リングバッファで使い回し）
    for (let i = 0; i < GHOST_LEN; i++) {
      const s = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: gtex,
          color: 0xffe86b,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      s.scale.setScalar(0.24);
      scene.add(s);
      this.ghosts.push(s);
    }
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(BALL.VISUAL_R, 18, 14),
      new THREE.MeshStandardMaterial({
        color: 0xd8f24a,
        roughness: 0.55,
        emissive: 0x556b12,
        emissiveIntensity: 0.5,
      }),
    );
    this.mesh.castShadow = true;
    scene.add(this.mesh);

    this.blob = new THREE.Mesh(
      new THREE.CircleGeometry(BALL.VISUAL_R * 1.3, 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 }),
    );
    this.blob.rotation.x = -Math.PI / 2;
    this.blob.position.y = 0.011;
    scene.add(this.blob);

    this.trailPos = new Float32Array(TRAIL_LEN * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.trailPos, 3));
    this.trail = new THREE.Line(
      geo,
      new THREE.LineBasicMaterial({ color: 0xcaf23c, transparent: true, opacity: 0.4 }),
    );
    this.trail.frustumCulled = false;
    scene.add(this.trail);
  }

  update(dt: number, x: number, y: number, z: number, flying: boolean): void {
    this.mesh.position.set(x, Math.max(y, BALL.VISUAL_R), z);

    // 速度（見た目の演出用）
    const speed = dt > 0 ? Math.hypot(x - this.prev.x, y - this.prev.y, z - this.prev.z) / dt : 0;
    this.prev = { x, y, z };

    // バウンド直後のスカッシュ（潰れて戻る）
    this.squash = Math.max(0, this.squash - dt * 7);
    const sq = this.squash;
    this.mesh.scale.set(1 + 0.35 * sq, 1 - 0.5 * sq, 1 + 0.35 * sq);

    // グロー: 速いほど大きく・白熱色に
    const heat = Math.min(1, Math.max(0, (speed - 8) / 22));
    this.glow.position.copy(this.mesh.position);
    this.glow.scale.setScalar(0.4 + heat * 0.9);
    const gm = this.glow.material;
    gm.opacity = flying ? 0.3 + heat * 0.5 : 0.18;
    gm.color.setHSL(0.16 - heat * 0.12, 1, 0.6 + heat * 0.15);

    // 残像: 飛行中かつ一定速度以上のとき毎フレーム1つ置いていく
    if (flying && speed > 6) {
      const g = this.ghosts[this.ghostHead];
      this.ghostHead = (this.ghostHead + 1) % GHOST_LEN;
      g.position.set(x, Math.max(y, BALL.VISUAL_R), z);
      g.material.opacity = 0.28 + heat * 0.3;
      g.scale.setScalar(0.18 + heat * 0.22);
      g.material.color.setHSL(0.14 - heat * 0.1, 1, 0.6);
    }
    for (const g of this.ghosts) {
      if (g.material.opacity > 0) {
        g.material.opacity = Math.max(0, g.material.opacity - dt * 1.8);
        g.scale.multiplyScalar(Math.max(0, 1 - dt * 1.2));
      }
    }

    // ブロブシャドウ（高いほど薄く小さく）
    this.blob.position.x = x;
    this.blob.position.z = z;
    const h = Math.max(0, y);
    const s = Math.max(0.4, 1 - h * 0.06);
    this.blob.scale.setScalar(s);
    (this.blob.material as THREE.MeshBasicMaterial).opacity = Math.max(0.08, 0.35 - h * 0.02);

    // トレイル
    if (flying) {
      // 先頭に現在位置を押し込み、後ろへずらす
      for (let i = TRAIL_LEN - 1; i > 0; i--) {
        this.trailPos[i * 3] = this.trailPos[(i - 1) * 3];
        this.trailPos[i * 3 + 1] = this.trailPos[(i - 1) * 3 + 1];
        this.trailPos[i * 3 + 2] = this.trailPos[(i - 1) * 3 + 2];
      }
      this.trailPos[0] = x;
      this.trailPos[1] = Math.max(y, BALL.VISUAL_R);
      this.trailPos[2] = z;
      this.trailCount = Math.min(TRAIL_LEN, this.trailCount + 1);
    } else {
      this.trailCount = 0;
      for (let i = 0; i < TRAIL_LEN; i++) {
        this.trailPos[i * 3] = x;
        this.trailPos[i * 3 + 1] = Math.max(y, BALL.VISUAL_R);
        this.trailPos[i * 3 + 2] = z;
      }
    }
    (this.trail.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.trail.material as THREE.LineBasicMaterial).opacity = this.trailCount > 3 ? 0.4 : 0;

    // バウンドリングの寿命更新
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life -= dt;
      const t = 1 - Math.max(0, r.life) / 0.45;
      r.mesh.scale.setScalar(0.3 + t * 1.6);
      (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - t);
      if (r.life <= 0) {
        this.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        (r.mesh.material as THREE.Material).dispose();
        this.rings.splice(i, 1);
      }
    }
  }

  bounceAt(x: number, z: number): void {
    this.squash = 1;
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.16, 0.24, 24),
      new THREE.MeshBasicMaterial({ color: 0xdff26a, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.015, z);
    this.scene.add(ring);
    this.rings.push({ mesh: ring, life: 0.45 });
  }
}
