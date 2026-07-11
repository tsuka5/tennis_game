/**
 * クラウド台帳（Firestore 実装）。firebase 設定があるときだけ動的 import される。
 * データ構造:
 *   ledgers/{id}                … { name, createdAt }
 *   ledgers/{id}/members/{名前} … { pts, wins, losses }
 *   ledgers/{id}/logs/{auto}    … { t, name, d, why, after, by }
 * すべての増減はトランザクションで行い、必ず logs に記録される
 * （誰の操作かも by = 匿名uid で残る）。
 */
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit as qLimit,
  orderBy,
  query,
  runTransaction,
} from 'firebase/firestore';
import { fb } from '../friends/fb';
import type { LogEntry, MemberRow, PlayerStats } from '../party/storage';
import { INITIAL_PTS, rememberCloudLedger } from '../party/storage';
import type { Ledger, LedgerRef } from './ledger';

/** Firestore のドキュメント ID に使えない文字を除去 */
const safeName = (name: string): string => name.replace(/[/\\.]/g, '＿') || '＿';

class CloudLedger implements Ledger {
  constructor(
    readonly ref: LedgerRef,
    private readonly db: Firestore,
    private readonly uid: string,
  ) {}

  private memberRef(name: string) {
    return doc(this.db, 'ledgers', this.ref.id, 'members', safeName(name));
  }

  private logsCol() {
    return collection(this.db, 'ledgers', this.ref.id, 'logs');
  }

  /** 読み取り→加工→書き込みをトランザクションで行い、変化があれば履歴も残す */
  private async mutate(
    name: string,
    why: string,
    fn: (s: PlayerStats) => void,
  ): Promise<PlayerStats> {
    return runTransaction(this.db, async (tx) => {
      const mref = this.memberRef(name);
      const snap = await tx.get(mref);
      const s: PlayerStats = snap.exists()
        ? (snap.data() as PlayerStats)
        : { pts: 0, wins: 0, losses: 0 };
      const before = s.pts;
      fn(s);
      s.pts = Math.max(0, Math.round(s.pts));
      tx.set(mref, s);
      if (s.pts !== before) {
        tx.set(doc(this.logsCol()), {
          t: Date.now(),
          name,
          d: s.pts - before,
          why,
          after: s.pts,
          by: this.uid,
        });
      }
      return { ...s };
    });
  }

  async ensureMember(name: string): Promise<PlayerStats> {
    return runTransaction(this.db, async (tx) => {
      const mref = this.memberRef(name);
      const snap = await tx.get(mref);
      if (snap.exists()) return { ...(snap.data() as PlayerStats) };
      const s: PlayerStats = { pts: INITIAL_PTS, wins: 0, losses: 0 };
      tx.set(mref, s);
      tx.set(doc(this.logsCol()), {
        t: Date.now(),
        name,
        d: INITIAL_PTS,
        why: '参加ボーナス',
        after: INITIAL_PTS,
        by: this.uid,
      });
      return { ...s };
    });
  }

  async getStats(name: string): Promise<PlayerStats> {
    const snap = await getDoc(this.memberRef(name));
    return snap.exists() ? { ...(snap.data() as PlayerStats) } : { pts: 0, wins: 0, losses: 0 };
  }

  addResult(name: string, delta: number, won: boolean, why: string): Promise<PlayerStats> {
    return this.mutate(name, why, (s) => {
      s.pts += delta;
      if (won) s.wins += 1;
      else s.losses += 1;
    });
  }

  adjustPoints(name: string, delta: number, why: string): Promise<PlayerStats> {
    return this.mutate(name, why, (s) => {
      s.pts += delta;
    });
  }

  async resetPoints(names: string[]): Promise<void> {
    for (const n of names) {
      await this.mutate(n, 'リセット', (s) => {
        s.pts = 0;
      });
    }
  }

  async listMembers(): Promise<MemberRow[]> {
    const snaps = await getDocs(collection(this.db, 'ledgers', this.ref.id, 'members'));
    return snaps.docs
      .map((d) => {
        const s = d.data() as PlayerStats;
        return { name: d.id, pts: s.pts, wins: s.wins, losses: s.losses };
      })
      .sort((a, b) => b.pts - a.pts);
  }

  async listHistory(limit = 60): Promise<LogEntry[]> {
    const snaps = await getDocs(query(this.logsCol(), orderBy('t', 'desc'), qLimit(limit)));
    return snaps.docs.map((d) => d.data() as LogEntry);
  }

  async removeMember(name: string): Promise<void> {
    await deleteDoc(this.memberRef(name));
  }
}

export async function createCloudLedger(name: string): Promise<Ledger> {
  const { db, uid } = await fb();
  const docRef = await addDoc(collection(db, 'ledgers'), { name, createdAt: Date.now(), by: uid });
  const ref: LedgerRef = { id: docRef.id, name };
  rememberCloudLedger(ref);
  return new CloudLedger(ref, db, uid);
}

export async function openCloudLedger(ref: LedgerRef): Promise<Ledger> {
  const { db, uid } = await fb();
  rememberCloudLedger(ref);
  return new CloudLedger(ref, db, uid);
}
