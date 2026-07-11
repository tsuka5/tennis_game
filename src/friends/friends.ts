/**
 * フレンド機能（Firebase 匿名認証 + Firestore）。
 * - 端末ごとに匿名アカウントを作り、6文字のフレンドコードを発行
 * - コードを教え合って相互フレンド登録
 * - ハートビートでオンライン状態と「今いるルームコード」を公開し、
 *   フレンドはワンタップでそのルームに参加できる
 *
 * このモジュールは firebase-config.ts が設定済みのときだけ動的 import される
 * （未設定ならバンドルごと読み込まれない）。
 */
import {
  Firestore,
  Timestamp,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { fb } from './fb';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
/** ハートビート間隔 (ms)。この2倍強を超えて更新がなければオフライン扱い */
const HEARTBEAT_MS = 25_000;
const ONLINE_WINDOW_MS = 70_000;

export interface FriendInfo {
  uid: string;
  name: string;
  online: boolean;
  /** フレンドが今いるルームコード（公開していなければ null） */
  roomCode: string | null;
}

function randomFriendCode(): string {
  let c = '';
  for (let i = 0; i < 6; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return c;
}

export class FriendService {
  myCode = '';

  private hbTimer: number | undefined;
  private roomCode: string | null = null;

  private constructor(
    private readonly db: Firestore,
    private readonly uid: string,
    private name: string,
  ) {}

  /** 匿名ログインしてプレイヤー登録（初回はフレンドコードを発行）。 */
  static async create(name: string): Promise<FriendService> {
    const { db, uid } = await fb();
    const svc = new FriendService(db, uid, name);
    await svc.ensurePlayer();
    svc.startHeartbeat();
    return svc;
  }

  private playerRef(uid = this.uid) {
    return doc(this.db, 'players', uid);
  }

  private async ensurePlayer(): Promise<void> {
    const snap = await getDoc(this.playerRef());
    let code = (snap.exists() ? (snap.data().code as string | undefined) : undefined) ?? '';
    if (!code) {
      // コード → uid の逆引きを登録（32^6 通りなので衝突はほぼないが一応確認）
      for (let i = 0; i < 5 && !code; i++) {
        const cand = randomFriendCode();
        const cref = doc(this.db, 'codes', cand);
        if (!(await getDoc(cref)).exists()) {
          await setDoc(cref, { uid: this.uid });
          code = cand;
        }
      }
    }
    this.myCode = code;
    await this.beat();
  }

  private startHeartbeat(): void {
    this.hbTimer = window.setInterval(() => void this.beat().catch(() => {}), HEARTBEAT_MS);
  }

  private async beat(): Promise<void> {
    await setDoc(
      this.playerRef(),
      { name: this.name, code: this.myCode, room: this.roomCode, ts: serverTimestamp() },
      { merge: true },
    );
  }

  setName(name: string): void {
    if (name && name !== this.name) {
      this.name = name;
      void this.beat().catch(() => {});
    }
  }

  /** 今いるルームを公開/非公開にする（フレンドの「参加」ボタンに出る） */
  setRoom(code: string | null): void {
    this.roomCode = code;
    void this.beat().catch(() => {});
  }

  /** フレンドコードで相互登録。成功したら相手の名前を返す */
  async addFriendByCode(rawCode: string): Promise<string | null> {
    const code = rawCode.trim().toUpperCase();
    if (code.length !== 6) return null;
    const cs = await getDoc(doc(this.db, 'codes', code));
    if (!cs.exists()) return null;
    const fuid = cs.data().uid as string;
    if (fuid === this.uid) return null;
    const fdoc = await getDoc(this.playerRef(fuid));
    const fname = (fdoc.data()?.name as string | undefined) ?? 'フレンド';
    await setDoc(doc(this.db, 'players', this.uid, 'friends', fuid), { name: fname });
    await setDoc(doc(this.db, 'players', fuid, 'friends', this.uid), { name: this.name });
    return fname;
  }

  /** フレンド一覧とオンライン状態・滞在ルームを取得（ポーリング用） */
  async listFriends(): Promise<FriendInfo[]> {
    const fs = await getDocs(collection(this.db, 'players', this.uid, 'friends'));
    const savedNames = new Map(fs.docs.map((d) => [d.id, (d.data().name as string) ?? '']));
    const uids = fs.docs.map((d) => d.id);
    const out: FriendInfo[] = [];
    // Firestore の in クエリは最大30件ずつ
    for (let i = 0; i < uids.length; i += 30) {
      const chunk = uids.slice(i, i + 30);
      const snaps = await getDocs(
        query(collection(this.db, 'players'), where(documentId(), 'in', chunk)),
      );
      for (const s of snaps.docs) {
        const d = s.data();
        const ts = d.ts as Timestamp | undefined;
        out.push({
          uid: s.id,
          name: (d.name as string) || savedNames.get(s.id) || 'フレンド',
          online: !!ts && Date.now() - ts.toMillis() < ONLINE_WINDOW_MS,
          roomCode: (d.room as string | null) ?? null,
        });
      }
    }
    // オンライン優先 → 名前順
    return out.sort((a, b) => Number(b.online) - Number(a.online) || a.name.localeCompare(b.name));
  }

  destroy(): void {
    window.clearInterval(this.hbTimer);
  }
}
