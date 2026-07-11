/**
 * サーブの予測着地点マーカー。リングの位置がボールの着地点、
 * 色がサーブの強さ（緑=遅い → 赤=速い）を表す。
 */
import * as THREE from 'three';
import type { ServeAim } from '../sim/HostSim';

export class ServeAimView {
  private readonly group = new THREE.Group();
  private readonly ringMat: THREE.MeshBasicMaterial;
  private readonly dotMat: THREE.MeshBasicMaterial;
  private readonly color = new THREE.Color();
  private t = 0;

  constructor(scene: THREE.Scene) {
    this.ringMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.dotMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, depthWrite: false });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.44, 40), this.ringMat);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.13, 24), this.dotMat);
    this.group.add(ring, dot);
    this.group.rotation.x = -Math.PI / 2;
    this.group.position.y = 0.02;
    this.group.visible = false;
    scene.add(this.group);
  }

  update(dt: number, aim: ServeAim | null): void {
    if (!aim) {
      this.group.visible = false;
      return;
    }
    this.t += dt;
    this.group.visible = true;
    this.group.position.set(aim.x, 0.02, aim.z);
    this.group.scale.setScalar(1 + 0.12 * Math.sin(this.t * 7));
    // 緑（弱）→ 赤（強）
    this.color.setHSL(0.33 * (1 - aim.power), 0.95, 0.55);
    this.ringMat.color.copy(this.color);
    this.dotMat.color.copy(this.color);
  }
}
