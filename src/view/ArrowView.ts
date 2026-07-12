/**
 * フリック中に地面へ表示する「飛ばす方向の → 矢印」。
 * 長さがフリックの強さ、色はイン=ライム / アウト=赤。
 */
import * as THREE from 'three';

const HEAD_LEN = 0.55;

export class ArrowView {
  private readonly group = new THREE.Group();
  private readonly mat: THREE.MeshBasicMaterial;
  private readonly shaft: THREE.Mesh;
  private readonly head: THREE.Mesh;

  constructor(scene: THREE.Scene) {
    this.mat = new THREE.MeshBasicMaterial({
      color: 0xccff33,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    // ローカル +x 方向に伸びる矢印（シャフト + 三角の先端）を地面に寝かせる
    this.shaft = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.16), this.mat);
    this.shaft.rotation.x = -Math.PI / 2;
    const tri = new THREE.Shape();
    tri.moveTo(0, -0.32);
    tri.lineTo(0, 0.32);
    tri.lineTo(HEAD_LEN, 0);
    tri.closePath();
    this.head = new THREE.Mesh(new THREE.ShapeGeometry(tri), this.mat);
    this.head.rotation.x = -Math.PI / 2;
    this.group.add(this.shaft, this.head);
    this.group.position.y = 0.03;
    this.group.visible = false;
    scene.add(this.group);
  }

  /** from から to の方向へ、強さに応じた長さで表示 */
  update(
    from: { x: number; z: number } | null,
    to?: { x: number; z: number },
    power = 0.5,
    color = 0xccff33,
  ): void {
    if (!from || !to) {
      this.group.visible = false;
      return;
    }
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    if (Math.hypot(dx, dz) < 0.01) {
      this.group.visible = false;
      return;
    }
    const len = 1.3 + power * 2.4;
    const shaftLen = len - HEAD_LEN;
    this.shaft.scale.x = shaftLen;
    this.shaft.position.x = shaftLen / 2;
    this.head.position.x = shaftLen;
    this.group.position.set(from.x, 0.03, from.z);
    // ローカル +x を (dx, dz) 方向へ向ける（Y軸回転）
    this.group.rotation.y = Math.atan2(-dz, dx);
    this.mat.color.set(color);
    this.group.visible = true;
  }
}
