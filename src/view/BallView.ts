/**
 * ボールの 3D 表現: 本体 + 落下地点のブロブシャドウ + 残像トレイル、
 * バウンド時のリング演出。
 */
import * as THREE from 'three';
import { BALL } from '../config';

const TRAIL_LEN = 22;

export class BallView {
  private readonly mesh: THREE.Mesh;
  private readonly blob: THREE.Mesh;
  private readonly trail: THREE.Line;
  private readonly trailPos: Float32Array;
  private trailCount = 0;
  private readonly rings: { mesh: THREE.Mesh; life: number }[] = [];
  private readonly scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
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
