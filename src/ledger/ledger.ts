/**
 * ポイント台帳の抽象化。
 * - Firebase 設定があれば「クラウド台帳」(Firestore): 誰がホストでも同じ
 *   グループを引き継げて、履歴は全員がいつでも自分の端末から監査できる
 * - なければ従来どおり「ローカル台帳」(この端末の localStorage)
 * クラウド側の失敗時はローカルへ自動フォールバックする。
 */
import { firebaseEnabled } from '../friends/firebase-config';
import type { LogEntry, MemberRow, PlayerStats } from '../party/storage';
import {
  addResult as lsAddResult,
  adjustPoints as lsAdjust,
  ensureMember as lsEnsure,
  getStats as lsGetStats,
  listGroups as lsListGroups,
  listHistory as lsHistory,
  listMembers as lsMembers,
  removeMember as lsRemove,
  resetPoints as lsReset,
  knownCloudLedgers,
} from '../party/storage';

const LOCAL_PREFIX = 'local:';

/** 台帳の参照。id が 'local:' で始まるものはこの端末のローカル台帳 */
export interface LedgerRef {
  id: string;
  name: string;
}

export function isCloudRef(ref: LedgerRef): boolean {
  return !ref.id.startsWith(LOCAL_PREFIX);
}

export interface Ledger {
  readonly ref: LedgerRef;
  ensureMember(name: string): Promise<PlayerStats>;
  getStats(name: string): Promise<PlayerStats>;
  addResult(name: string, delta: number, won: boolean, why: string): Promise<PlayerStats>;
  adjustPoints(name: string, delta: number, why: string): Promise<PlayerStats>;
  resetPoints(names: string[]): Promise<void>;
  listMembers(): Promise<MemberRow[]>;
  listHistory(limit?: number): Promise<LogEntry[]>;
  removeMember(name: string): Promise<void>;
}

// ---------------------------------------- ローカル実装

class LocalLedger implements Ledger {
  readonly ref: LedgerRef;
  private readonly group: string;

  constructor(name: string) {
    this.group = name;
    this.ref = { id: LOCAL_PREFIX + name, name };
  }

  ensureMember(name: string): Promise<PlayerStats> {
    return Promise.resolve(lsEnsure(this.group, name));
  }

  getStats(name: string): Promise<PlayerStats> {
    return Promise.resolve(lsGetStats(this.group, name));
  }

  addResult(name: string, delta: number, won: boolean, why: string): Promise<PlayerStats> {
    return Promise.resolve(lsAddResult(this.group, name, delta, won, why));
  }

  adjustPoints(name: string, delta: number, why: string): Promise<PlayerStats> {
    return Promise.resolve(lsAdjust(this.group, name, delta, why));
  }

  resetPoints(names: string[]): Promise<void> {
    lsReset(this.group, names);
    return Promise.resolve();
  }

  listMembers(): Promise<MemberRow[]> {
    return Promise.resolve(lsMembers(this.group));
  }

  listHistory(limit?: number): Promise<LogEntry[]> {
    return Promise.resolve(lsHistory(this.group, limit));
  }

  removeMember(name: string): Promise<void> {
    lsRemove(this.group, name);
    return Promise.resolve();
  }
}

// ---------------------------------------- ファクトリ

/** 既存の台帳を開く（クラウド失敗時は同名のローカル台帳にフォールバック） */
export async function openLedger(ref: LedgerRef): Promise<Ledger> {
  if (isCloudRef(ref) && firebaseEnabled()) {
    try {
      const m = await import('./cloud');
      return await m.openCloudLedger(ref);
    } catch {
      /* オフライン等はローカルへ */
    }
  }
  return new LocalLedger(ref.name);
}

/** 新しい台帳を作る（クラウド優先、失敗時はローカル） */
export async function createLedger(name: string): Promise<Ledger> {
  if (firebaseEnabled()) {
    try {
      const m = await import('./cloud');
      return await m.createCloudLedger(name);
    } catch {
      /* オフライン等はローカルへ */
    }
  }
  return new LocalLedger(name);
}

/**
 * この端末が知っている台帳の一覧。
 * クラウド台帳（作った/参加したことがある）＋ローカル台帳（旧データ含む）。
 */
export function listKnownLedgers(): LedgerRef[] {
  const cloud: LedgerRef[] = firebaseEnabled() ? knownCloudLedgers() : [];
  const local: LedgerRef[] = lsListGroups().map((name) => ({ id: LOCAL_PREFIX + name, name }));
  return [...cloud, ...local];
}
