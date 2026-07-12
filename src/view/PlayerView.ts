/**
 * プレイヤーの 3D 表現: プリミティブ組み立ての選手モデル。
 * キャップ+バイザー・目・襟・袖・リストバンド・ソックス・シューズ・
 * ストリング柄のラケットまで持つ「ちょっと豪華」仕様。
 * 走り（脚のシザー+腕振り+前傾）、待機の呼吸、スイングをプロシージャルに再生。
 */
import * as THREE from 'three';
import { PLAY } from '../config';

export interface Kit {
  shirt: number;
  shorts: number;
  skin: number;
  /** 差し色（襟・リストバンド・ラケットフレームなど） */
  accent: number;
}

export const KIT_HOME: Kit = { shirt: 0xe8452c, shorts: 0x1a2030, skin: 0xe8b48a, accent: 0xffd23c };
export const KIT_AWAY: Kit = { shirt: 0x27b7e8, shorts: 0x14202e, skin: 0xc98d63, accent: 0xccff33 };

function stringsTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, 64, 64);
  ctx.strokeStyle = 'rgba(235,242,252,0.9)';
  ctx.lineWidth = 1.4;
  for (let i = 4; i < 64; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 64);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(64, i);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class PlayerView {
  readonly group = new THREE.Group();
  private readonly body = new THREE.Group();
  private readonly legL: THREE.Group;
  private readonly legR: THREE.Group;
  private readonly armL: THREE.Group;
  private readonly armSwing = new THREE.Group();
  private runPhase = 0;
  private idlePhase = Math.random() * Math.PI * 2;
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
    const accentMat = std(kit.accent, 0.5);
    const whiteMat = std(0xf3f6fb, 0.7);
    const darkMat = std(0x171b24, 0.6);

    // ---------- 脚（腰でピボットするグループ: 太もも→ふくらはぎ→ソックス→シューズ） ----------
    const makeLeg = (side: -1 | 1): THREE.Group => {
      const leg = new THREE.Group();
      const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.088, 0.2, 4, 10), shortsMat);
      thigh.position.y = -0.12;
      const calf = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, 0.2, 4, 10), skinMat);
      calf.position.y = -0.36;
      const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.066, 0.07, 0.09, 10), whiteMat);
      sock.position.y = -0.5;
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.075, 0.25), whiteMat);
      shoe.position.set(0, -0.585, 0.045);
      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.028, 0.26), accentMat);
      sole.position.set(0, -0.635, 0.045);
      leg.add(thigh, calf, sock, shoe, sole);
      leg.position.set(0.11 * side, 0.62, 0);
      return leg;
    };
    this.legL = makeLeg(-1);
    this.legR = makeLeg(1);

    // ---------- 腰まわり（ショーツ） ----------
    const shorts = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.2, 0.2, 14), shortsMat);
    shorts.position.y = 0.68;

    // ---------- 胴体 + 襟 + 胸ロゴ ----------
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.185, 0.38, 4, 14), shirtMat);
    torso.position.y = 0.95;
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.02, 8, 16), accentMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 1.245;
    const logo = new THREE.Mesh(
      new THREE.CircleGeometry(0.03, 12),
      new THREE.MeshBasicMaterial({ color: kit.accent }),
    );
    logo.position.set(0.09, 1.08, 0.175);

    // ---------- 頭（目つき）+ キャップ + バイザー ----------
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 14), skinMat);
    head.position.y = 1.36;
    const eyeGeo = new THREE.SphereGeometry(0.017, 8, 8);
    const eyeL = new THREE.Mesh(eyeGeo, darkMat);
    eyeL.position.set(-0.045, 1.385, 0.105);
    const eyeR = new THREE.Mesh(eyeGeo, darkMat);
    eyeR.position.set(0.045, 1.385, 0.105);
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.127, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
      shirtMat,
    );
    cap.position.y = 1.39;
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.12), accentMat);
    visor.position.set(0, 1.425, 0.15);
    visor.rotation.x = 0.14;
    const capButton = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), accentMat);
    capButton.position.y = 1.515;

    // ---------- 逆側の腕（袖つき。バックハンド中は持ち替えて見えるよう非表示） ----------
    const makeArm = (): THREE.Group => {
      const arm = new THREE.Group();
      const sleeve = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, 0.08, 4, 8), shirtMat);
      sleeve.position.y = -0.05;
      const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.22, 4, 8), skinMat);
      fore.position.y = -0.22;
      arm.add(sleeve, fore);
      return arm;
    };
    this.armL = makeArm();
    this.armL.position.set(-0.26, 1.16, 0);
    this.armL.rotation.z = 0.35;

    // ---------- 右腕 + リストバンド + ラケット（スインググループ） ----------
    const armR = makeArm();
    const wristband = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.05, 10), accentMat);
    wristband.position.y = -0.36;
    const racket = new THREE.Group();
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.28, 8), darkMat);
    grip.position.y = -0.5;
    const gripEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.03, 8), accentMat);
    gripEnd.position.y = -0.375;
    // スロート（グリップからヘッドへの二又）
    const throatGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.16, 6);
    const throatMat = std(0xdce4f2, 0.4);
    const throatL = new THREE.Mesh(throatGeo, throatMat);
    throatL.position.set(-0.05, -0.62, 0);
    throatL.rotation.z = 0.42;
    const throatR = new THREE.Mesh(throatGeo, throatMat);
    throatR.position.set(0.05, -0.62, 0);
    throatR.rotation.z = -0.42;
    const frame = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.016, 8, 24), accentMat);
    frame.position.y = -0.82;
    frame.scale.y = 1.15; // 少し縦長のヘッド
    const strings = new THREE.Mesh(
      new THREE.CircleGeometry(0.128, 20),
      new THREE.MeshBasicMaterial({
        map: stringsTexture(),
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    );
    strings.position.y = -0.82;
    strings.scale.y = 1.15;
    racket.add(grip, gripEnd, throatL, throatR, frame, strings);
    racket.position.y = -0.1;
    this.armSwing.add(armR, wristband, racket);
    this.armSwing.position.set(0.26, 1.16, 0);
    this.armSwing.rotation.z = -0.4; // 構え

    this.body.add(
      this.legL,
      this.legR,
      shorts,
      torso,
      collar,
      logo,
      head,
      eyeL,
      eyeR,
      cap,
      visor,
      capButton,
      this.armL,
      this.armSwing,
    );
    this.body.traverse((o) => {
      if (o instanceof THREE.Mesh) o.castShadow = true;
    });
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

    // 走りアニメ（脚のシザー + 逆位相の腕振り + 前傾 + バウンド）
    const speed = Math.hypot(this.posX - prevX, this.posZ - prevZ) / Math.max(dt, 1e-4);
    const moving = Math.min(1, speed / PLAY.SPEED);
    this.runPhase += dt * (4 + 9 * moving);
    this.idlePhase += dt * 2;
    const scissor = Math.sin(this.runPhase) * 0.7 * moving;
    this.legL.rotation.x = scissor;
    this.legR.rotation.x = -scissor;
    this.body.rotation.x = 0.14 * moving;
    // 待機中はゆっくり呼吸
    this.body.position.y =
      Math.abs(Math.sin(this.runPhase)) * 0.05 * moving +
      Math.sin(this.idlePhase) * 0.012 * (1 - moving);

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
      // 上体もひねって打つ
      this.body.rotation.y = dir * arc * 0.35;
      this.armL.visible = dir > 0; // 左で振っている間は逆腕を隠す（持ち替え表現）
      this.armL.rotation.x = 0;
    } else {
      this.armSwing.position.x = 0.26;
      this.armSwing.rotation.set(0, 0, -0.4);
      this.body.rotation.y = 0;
      this.armL.visible = true;
      // 走行中は逆腕を脚と逆位相で振る
      this.armL.rotation.x = -scissor * 0.9;
    }
  }
}
