/**
 * フリック中に表示する「ボールがこれから飛ぶ軌道」の3D曲線。
 * 色はイン=ライム / アウト・ネット=赤。
 */
import * as THREE from 'three';
import type { V3 } from '../sim/physics';

const MAX_POINTS = 300;

export class TrajectoryView {
  private readonly line: THREE.Line;
  private readonly positions: Float32Array;
  private readonly material: THREE.LineBasicMaterial;

  constructor(scene: THREE.Scene) {
    this.positions = new Float32Array(MAX_POINTS * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    geo.setDrawRange(0, 0);
    this.material = new THREE.LineBasicMaterial({
      color: 0xccff33,
      transparent: true,
      opacity: 0.85,
    });
    this.line = new THREE.Line(geo, this.material);
    this.line.frustumCulled = false;
    this.line.visible = false;
    scene.add(this.line);
  }

  update(points: V3[] | null, color = 0xccff33): void {
    if (!points || points.length < 2) {
      this.line.visible = false;
      (this.line.geometry as THREE.BufferGeometry).setDrawRange(0, 0);
      return;
    }
    const n = Math.min(points.length, MAX_POINTS);
    for (let i = 0; i < n; i++) {
      this.positions[i * 3] = points[i].x;
      this.positions[i * 3 + 1] = Math.max(points[i].y, 0.03);
      this.positions[i * 3 + 2] = points[i].z;
    }
    const geo = this.line.geometry as THREE.BufferGeometry;
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    geo.setDrawRange(0, n);
    this.material.color.set(color);
    this.line.visible = true;
  }
}
