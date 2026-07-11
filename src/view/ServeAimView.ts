/**
 * 地面の着地点マーカー（リング+中心ドット）。用途は3つ:
 * - サーブ照準: 色がパワーを表す（緑=遅い → 赤=速い）
 * - ラリー中の着地予測: 固定色（青）
 * - 自分の返球プレビュー: 固定色（ライム）
 */
import * as THREE from 'three';
import type { ServeAim } from '../sim/HostSim';

export interface MarkerOpts {
  /** 固定色。省略時は power から緑→赤で着色 */
  color?: number;
  /** 全体の大きさ倍率 */
  scale?: number;
  /** 透明度 0..1 */
  opacity?: number;
}

export class ServeAimView {
  private readonly group = new THREE.Group();
  private readonly ringMat: THREE.MeshBasicMaterial;
  private readonly dotMat: THREE.MeshBasicMaterial;
  private readonly color = new THREE.Color();
  private readonly fixedColor: THREE.Color | null;
  private readonly baseScale: number;
  private t = 0;

  constructor(scene: THREE.Scene, opts: MarkerOpts = {}) {
    this.fixedColor = opts.color !== undefined ? new THREE.Color(opts.color) : null;
    this.baseScale = opts.scale ?? 1;
    const opacity = opts.opacity ?? 0.95;
    this.ringMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.dotMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: opacity * 0.55,
      depthWrite: false,
    });
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
    this.group.scale.setScalar(this.baseScale * (1 + 0.12 * Math.sin(this.t * 7)));
    if (this.fixedColor) {
      this.color.copy(this.fixedColor);
    } else {
      // 緑（弱）→ 赤（強）
      this.color.setHSL(0.33 * (1 - aim.power), 0.95, 0.55);
    }
    this.ringMat.color.copy(this.color);
    this.dotMat.color.copy(this.color);
  }
}
