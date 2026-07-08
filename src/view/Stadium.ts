/**
 * ナイトセッションのテニススタジアムを構築する。
 * ハードコート（豪州オープン風ブルー）、ネット、観客スタンド、
 * 照明タワー、広告ボードまで含めた静的シーン。
 */
import * as THREE from 'three';
import { COURT } from '../config';

const LINE_W = 0.05;
const LINE_Y = 0.012;

function canvasTexture(w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  draw(ctx);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function addLine(parent: THREE.Group, cx: number, cz: number, w: number, d: number): void {
  const geo = new THREE.PlaneGeometry(w, d);
  const mat = new THREE.MeshStandardMaterial({ color: 0xf2f6ff, roughness: 0.8 });
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(cx, LINE_Y, cz);
  m.receiveShadow = true;
  parent.add(m);
}

function buildCourt(scene: THREE.Scene): void {
  const g = new THREE.Group();

  // 周囲の床（スタジアムフロア）
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 70),
    new THREE.MeshStandardMaterial({ color: 0x0d1830, roughness: 1 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;
  g.add(floor);

  // アウトコート（濃いブルーのアクリル）
  const apron = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 38),
    new THREE.MeshStandardMaterial({ color: 0x14418f, roughness: 0.92 }),
  );
  apron.rotation.x = -Math.PI / 2;
  apron.position.y = 0;
  apron.receiveShadow = true;
  g.add(apron);

  // インコート（明るいブルー、ダブルスラインまで）
  const inner = new THREE.Mesh(
    new THREE.PlaneGeometry(COURT.HALF_DW * 2 + 0.6, COURT.LENGTH + 0.6),
    new THREE.MeshStandardMaterial({ color: 0x2565cf, roughness: 0.9 }),
  );
  inner.rotation.x = -Math.PI / 2;
  inner.position.y = 0.006;
  inner.receiveShadow = true;
  g.add(inner);

  // ライン
  const HL = COURT.HALF_L;
  const HSW = COURT.HALF_SW;
  const HDW = COURT.HALF_DW;
  const SL = COURT.SERVICE_LINE;
  // ベースライン
  addLine(g, 0, HL, HDW * 2 + LINE_W, LINE_W * 1.6);
  addLine(g, 0, -HL, HDW * 2 + LINE_W, LINE_W * 1.6);
  // サイドライン（ダブルス/シングルス）
  for (const x of [-HDW, -HSW, HSW, HDW]) {
    addLine(g, x, 0, LINE_W, HL * 2 + LINE_W);
  }
  // サービスライン
  addLine(g, 0, SL, HSW * 2, LINE_W);
  addLine(g, 0, -SL, HSW * 2, LINE_W);
  // センターサービスライン + センターマーク
  addLine(g, 0, 0, LINE_W, SL * 2);
  addLine(g, 0, HL - 0.2, LINE_W, 0.4);
  addLine(g, 0, -(HL - 0.2), LINE_W, 0.4);

  scene.add(g);
}

function buildNet(scene: THREE.Scene): void {
  const g = new THREE.Group();
  const postGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.07, 10);
  const postMat = new THREE.MeshStandardMaterial({ color: 0x101418, roughness: 0.5, metalness: 0.6 });
  for (const x of [-COURT.NET_POST_X, COURT.NET_POST_X]) {
    const post = new THREE.Mesh(postGeo, postMat);
    post.position.set(x, 1.07 / 2, 0);
    post.castShadow = true;
    g.add(post);
  }

  // ネット本体（グリッドテクスチャ）
  const netTex = canvasTexture(64, 64, (ctx) => {
    ctx.clearRect(0, 0, 64, 64);
    ctx.strokeStyle = 'rgba(228,236,248,0.85)';
    ctx.lineWidth = 1.6;
    for (let i = 0; i <= 64; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 64);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(64, i);
      ctx.stroke();
    }
  });
  netTex.wrapS = THREE.RepeatWrapping;
  netTex.wrapT = THREE.RepeatWrapping;
  netTex.repeat.set(46, 5);
  const net = new THREE.Mesh(
    new THREE.PlaneGeometry(COURT.NET_POST_X * 2, COURT.NET_HEIGHT),
    new THREE.MeshStandardMaterial({
      map: netTex,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.9,
      alphaTest: 0.15,
    }),
  );
  net.position.set(0, COURT.NET_HEIGHT / 2, 0);
  g.add(net);

  // 白帯
  const band = new THREE.Mesh(
    new THREE.BoxGeometry(COURT.NET_POST_X * 2, 0.07, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xf5f7fa, roughness: 0.7 }),
  );
  band.position.set(0, COURT.NET_HEIGHT - 0.035, 0);
  band.castShadow = true;
  g.add(band);

  scene.add(g);
}

function crowdTexture(): THREE.CanvasTexture {
  return canvasTexture(512, 192, (ctx) => {
    ctx.fillStyle = '#0c1226';
    ctx.fillRect(0, 0, 512, 192);
    // 客席の段
    for (let row = 0; row < 8; row++) {
      const y = 12 + row * 22;
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, y + 14, 512, 2);
      for (let i = 0; i < 60; i++) {
        if (Math.random() < 0.25) continue;
        const x = 4 + i * 8.5 + Math.random() * 3;
        const hue = Math.floor(Math.random() * 360);
        const light = 40 + Math.random() * 35;
        ctx.fillStyle = `hsl(${hue} 35% ${light}%)`;
        ctx.beginPath();
        ctx.arc(x, y + Math.random() * 4, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
}

function buildStands(scene: THREE.Scene): void {
  const tex = crowdTexture();
  const standMat = new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 1,
    emissive: 0x222a3f,
    emissiveIntensity: 0.35,
    emissiveMap: tex,
  });
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x0a0f22, roughness: 1 });

  const make = (w: number): THREE.Group => {
    const grp = new THREE.Group();
    const slope = new THREE.Mesh(new THREE.PlaneGeometry(w, 9), standMat);
    slope.rotation.x = -Math.PI / 2 + 1.05; // 約30度で立ち上がる
    slope.position.y = 3.4;
    grp.add(slope);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, 1.1, 0.4), baseMat);
    wall.position.set(0, 0.55, 4.1);
    grp.add(wall);
    return grp;
  };

  const sideL = make(46);
  sideL.position.set(-16.5, 0, 0);
  sideL.rotation.y = -Math.PI / 2;
  scene.add(sideL);

  const sideR = make(46);
  sideR.position.set(16.5, 0, 0);
  sideR.rotation.y = Math.PI / 2;
  scene.add(sideR);

  const endA = make(38);
  endA.position.set(0, 0, -22.5);
  scene.add(endA);

  const endB = make(38);
  endB.position.set(0, 0, 22.5);
  endB.rotation.y = Math.PI;
  scene.add(endB);
}

function buildAdBoards(scene: THREE.Scene): void {
  const tex = canvasTexture(1024, 64, (ctx) => {
    ctx.fillStyle = '#0f2a5e';
    ctx.fillRect(0, 0, 1024, 64);
    ctx.fillStyle = '#ccff33';
    ctx.font = 'italic 900 34px system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    for (let x = 40; x < 1024; x += 340) {
      ctx.fillText('TOUCH SMASH', x, 34);
    }
  });
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 });
  const capMat = new THREE.MeshStandardMaterial({ color: 0x081633, roughness: 0.9 });

  const makeBoard = (w: number): THREE.Mesh => {
    const board = new THREE.Mesh(new THREE.BoxGeometry(w, 0.9, 0.12), capMat.clone());
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.9), mat);
    face.position.z = 0.062;
    board.add(face);
    board.position.y = 0.45;
    board.castShadow = true;
    return board;
  };

  const back1 = makeBoard(24);
  back1.position.set(0, 0.45, -17.2);
  scene.add(back1);
  const back2 = makeBoard(24);
  back2.position.set(0, 0.45, 17.2);
  back2.rotation.y = Math.PI;
  scene.add(back2);
  const side1 = makeBoard(32);
  side1.position.set(-12.6, 0.45, 0);
  side1.rotation.y = Math.PI / 2;
  scene.add(side1);
  const side2 = makeBoard(32);
  side2.position.set(12.6, 0.45, 0);
  side2.rotation.y = -Math.PI / 2;
  scene.add(side2);
}

function buildLightTowers(scene: THREE.Scene): void {
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x232c3f, roughness: 0.6, metalness: 0.5 });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xf3f7ff });
  for (const [x, z] of [
    [-14, -19],
    [14, -19],
    [-14, 19],
    [14, 19],
  ] as const) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 13, 8), poleMat);
    pole.position.set(x, 6.5, z);
    scene.add(pole);
    const head = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 0.4), lampMat);
    head.position.set(x, 13.2, z);
    head.lookAt(0, 0, 0);
    scene.add(head);
  }
}

function buildSky(scene: THREE.Scene): void {
  const tex = canvasTexture(16, 256, (ctx) => {
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#040817');
    grad.addColorStop(0.55, '#0a1330');
    grad.addColorStop(0.8, '#14264f');
    grad.addColorStop(1, '#1d3563');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 256);
  });
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(130, 24, 16),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false }),
  );
  scene.add(sky);
}

export function buildStadium(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x0a1226, 45, 120);

  buildSky(scene);
  buildCourt(scene);
  buildNet(scene);
  buildStands(scene);
  buildAdBoards(scene);
  buildLightTowers(scene);

  // 照明: ナイトセッションのフラッドライト
  const hemi = new THREE.HemisphereLight(0x93b2e8, 0x0a0f1e, 0.55);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xfff3dd, 2.4);
  key.position.set(12, 20, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -18;
  key.shadow.camera.right = 18;
  key.shadow.camera.top = 20;
  key.shadow.camera.bottom = -20;
  key.shadow.camera.near = 5;
  key.shadow.camera.far = 55;
  key.shadow.bias = -0.0005;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xbfd4ff, 0.8);
  fill.position.set(-13, 16, -8);
  scene.add(fill);

  return scene;
}
