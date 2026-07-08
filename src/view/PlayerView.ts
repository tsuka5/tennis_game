/**
 * プレイヤーの 3D 表現: プリミティブ組み立てのローポリ選手
 * （脚・胴体・頭・両腕・ラケット）＋走りとスイングのプロシージャルアニメ。
 */
import * as THREE from 'three';
import { PLAY } from '../config';

export interface Kit {
  shirt: number;
  shorts: number;
  skin: number;
}

export const KIT_HOME: Kit = { shirt: 0xe8452c, shorts: 0x1a2030, skin: 0xe8b48a };
export const KIT_AWAY: Kit = { shirt: 0x27b7e8, shorts: 0x14202e, skin: 0xc98d63 };

export class PlayerView {
  readonly group = new THREE.Group();
  private readonly body = new THREE.Group();
  private readonly legL: THREE.Mesh;
  private readonly legR: THREE.Mesh;
  private readonly armL: THREE.Mesh;
  private readonly armSwing = new THREE.Group();
  private runPhase = 0;
  private posX: number;
  private posZ: number;

  constructor(scene: THREE.Scene, kit: Kit, facingZNeg: boolean, x: number, z: number) {
    this.posX = x;
    this.posZ = z;

    const std = (color: number, rough = 0.75): THREE.MeshStandardMaterial =>
      new THREE.MeshStandardMaterial({ color, roughness: rough });

    const shirtMat = std(kit.shirt);
    const shortsMat = std(kit.shorts);
    const skinMat = std(kit.skin, 0.6);

    // 脚
    const legGeo = new THREE.CapsuleGeometry(0.085, 0.36, 4, 10);
    this.legL = new THREE.Mesh(legGeo, shortsMat);
    this.legL.position.set(-0.11, 0.34, 0);
    this.legR = new THREE.Mesh(legGeo, shortsMat);
    this.legR.position.set(0.11, 0.34, 0);

    // 胴体
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.185, 0.38, 4, 12), shirtMat);
    torso.position.y = 0.92;

    // 頭 + キャップ
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 12), skinMat);
    head.position.y = 1.36;
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.125, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
      shirtMat,
    );
    cap.position.y = 1.39;

    // 逆側の腕（固定。バックハンド中は持ち替えて見えるよう非表示にする）
    const armGeo = new THREE.CapsuleGeometry(0.055, 0.3, 4, 8);
    this.armL = new THREE.Mesh(armGeo, skinMat);
    this.armL.position.set(-0.26, 0.98, 0);
    this.armL.rotation.z = 0.35;
    const armL = this.armL;

    // 右腕 + ラケット（スインググループ）
    const armR = new THREE.Mesh(armGeo, skinMat);
    armR.position.set(0, -0.18, 0);
    const racket = new THREE.Group();
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.3, 8),
      std(0x1c1f26, 0.5),
    );
    handle.position.y = -0.5;
    const frame = new THREE.Mesh(new THREE.TorusGeometry(0.135, 0.014, 8, 20), std(0xdce4f2, 0.4));
    frame.position.y = -0.78;
    const strings = new THREE.Mesh(
      new THREE.CircleGeometry(0.125, 20),
      new THREE.MeshBasicMaterial({ color: 0xcfdcf0, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
    );
    strings.position.y = -0.78;
    racket.add(handle, frame, strings);
    racket.position.y = -0.1;
    this.armSwing.add(armR, racket);
    this.armSwing.position.set(0.26, 1.12, 0);
    this.armSwing.rotation.z = -0.4; // 構え

    for (const m of [this.legL, this.legR, torso, head, cap, armL]) {
      m.castShadow = true;
    }
    armR.castShadow = true;
    frame.castShadow = true;

    this.body.add(this.legL, this.legR, torso, head, cap, armL, this.armSwing);
    this.group.add(this.body);
    // モデルは +z 向きに組んである。z>0 側の選手はネット(-z)を向く。
    this.group.rotation.y = facingZNeg ? Math.PI : 0;
    this.group.position.set(x, 0, z);
    scene.add(this.group);
  }

  /**
   * @param tx / tz 論理位置（スナップショット由来はダンピングして追従）
   * @param swing スイング。絶対値が残量 1→0、符号が振る側（+ 右 / - 左）
   */
  update(dt: number, tx: number, tz: number, swing: number, snap = false): void {
    const k = snap ? 1 : Math.min(1, dt * 14);
    const prevX = this.posX;
    const prevZ = this.posZ;
    this.posX += (tx - this.posX) * k;
    this.posZ += (tz - this.posZ) * k;
    this.group.position.set(this.posX, 0, this.posZ);

    // 走りアニメ
    const speed = Math.hypot(this.posX - prevX, this.posZ - prevZ) / Math.max(dt, 1e-4);
    const moving = Math.min(1, speed / PLAY.SPEED);
    this.runPhase += dt * (4 + 9 * moving);
    const scissor = Math.sin(this.runPhase) * 0.65 * moving;
    this.legL.rotation.x = scissor;
    this.legR.rotation.x = -scissor;
    this.body.position.y = Math.abs(Math.sin(this.runPhase)) * 0.045 * moving;

    // スイングアニメ: バックスイング → フォロースルー
    // 符号でフォアハンド（自分の右）とバックハンド（左）をミラーする
    const phase = Math.abs(swing);
    const dir = swing < 0 ? -1 : 1;
    if (phase > 0) {
      const p = 1 - phase; // 0→1 で進行
      const arc = Math.sin(Math.min(1, p * 1.15) * Math.PI);
      this.armSwing.position.x = 0.26 * dir;
      this.armSwing.rotation.z = dir * (-0.4 - 1.5 * arc);
      this.armSwing.rotation.y = dir * (p - 0.4) * 2.6;
      this.armSwing.rotation.x = -arc * 0.8;
      this.armL.visible = dir > 0; // 左で振っている間は逆腕を隠す（持ち替え表現）
    } else {
      this.armSwing.position.x = 0.26;
      this.armSwing.rotation.set(0, 0, -0.4);
      this.armL.visible = true;
    }
  }
}
