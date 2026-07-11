/**
 * 戦績の永続化（ホスト端末の localStorage）。
 * 「ポイント共有グループ」ごとに独立した台帳を持ち、
 * グループ × プレイヤー名をキーに累計ポイント・勝敗をずっと貯める。
 */

export interface PlayerStats {
  pts: number;
  wins: number;
  losses: number;
}

/** ポイントの取引履歴（誰が・いつ・何pt・なぜ。台帳の透明性のため全操作を記録） */
export interface LogEntry {
  /** epoch ms */
  t: number;
  name: string;
  /** 増減 */
  d: number;
  /** 理由（勝利/賭け/予想的中/手動調整 など） */
  why: string;
  /** 適用後の残高 */
  after: number;
}

/** グループごとに残す履歴の上限 */
const LOG_LIMIT = 300;

interface StoreV2 {
  groups: Record<string, Record<string, PlayerStats>>;
  /** グループ名 → 新しい順の取引履歴（v2 からの後付けフィールド） */
  logs?: Record<string, LogEntry[]>;
}

// キー名は旧名(touch-smash)のままだが、変更すると既存端末の
// ポイント台帳が消えるため意図的に据え置いている
const KEY = 'touch-smash-party-v2';
const OLD_KEY = 'touch-smash-party-v1';
const NAME_KEY = 'touch-smash-name';

export const DEFAULT_GROUP = 'みんな';

function load(): StoreV2 {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as StoreV2;
    // 旧形式（グループなし）からの移行
    const old = localStorage.getItem(OLD_KEY);
    if (old) {
      const v1 = JSON.parse(old) as { players: Record<string, PlayerStats> };
      const store: StoreV2 = { groups: { [DEFAULT_GROUP]: v1.players } };
      save(store);
      localStorage.removeItem(OLD_KEY);
      return store;
    }
  } catch {
    /* 壊れていたら作り直す */
  }
  return { groups: {} };
}

function save(store: StoreV2): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* プライベートモード等では保存できないが続行はできる */
  }
}

export function listGroups(): string[] {
  return Object.keys(load().groups).sort();
}

export function getStats(group: string, name: string): PlayerStats {
  const s = load().groups[group]?.[name];
  return s ? { ...s } : { pts: 0, wins: 0, losses: 0 };
}

/** 新メンバーの初期持ち点（参加した瞬間からベット・予想に参加できるように） */
export const INITIAL_PTS = 100;

/** 台帳にいなければ初期持ち点つきで登録して返す（既存メンバーはそのまま） */
export function ensureMember(group: string, name: string): PlayerStats {
  const store = load();
  const g = (store.groups[group] ??= {});
  if (!g[name]) {
    g[name] = { pts: INITIAL_PTS, wins: 0, losses: 0 };
    appendLog(store, group, {
      t: Date.now(),
      name,
      d: INITIAL_PTS,
      why: '参加ボーナス',
      after: INITIAL_PTS,
    });
    save(store);
  }
  return { ...g[name] };
}

function update(
  group: string,
  name: string,
  why: string,
  fn: (s: PlayerStats) => void,
): PlayerStats {
  const store = load();
  const g = (store.groups[group] ??= {});
  const s = (g[name] ??= { pts: 0, wins: 0, losses: 0 });
  const before = s.pts;
  fn(s);
  s.pts = Math.max(0, Math.round(s.pts));
  if (s.pts !== before) {
    appendLog(store, group, { t: Date.now(), name, d: s.pts - before, why, after: s.pts });
  }
  save(store);
  return { ...s };
}

function appendLog(store: StoreV2, group: string, entry: LogEntry): void {
  const logs = (store.logs ??= {});
  const list = (logs[group] ??= []);
  list.unshift(entry);
  if (list.length > LOG_LIMIT) list.length = LOG_LIMIT;
}

export function addResult(
  group: string,
  name: string,
  ptsDelta: number,
  won: boolean,
  why = won ? '勝利' : '敗北',
): PlayerStats {
  return update(group, name, why, (s) => {
    s.pts += ptsDelta;
    if (won) s.wins += 1;
    else s.losses += 1;
  });
}

/** ホストによる手動調整（動的なポイント変更） */
export function adjustPoints(
  group: string,
  name: string,
  delta: number,
  why = '手動調整',
): PlayerStats {
  return update(group, name, why, (s) => {
    s.pts += delta;
  });
}

/** 取引履歴（新しい順） */
export function listHistory(group: string, limit = 60): LogEntry[] {
  return (load().logs?.[group] ?? []).slice(0, limit);
}

export interface MemberRow extends PlayerStats {
  name: string;
}

/** グループの全メンバー（ポイント降順）。管理画面・単独ルーレット用 */
export function listMembers(group: string): MemberRow[] {
  const g = load().groups[group];
  if (!g) return [];
  return Object.entries(g)
    .map(([name, s]) => ({ name, ...s }))
    .sort((a, b) => b.pts - a.pts);
}

/** メンバーを台帳から削除する（管理画面用） */
export function removeMember(group: string, name: string): void {
  const store = load();
  const g = store.groups[group];
  if (!g) return;
  delete g[name];
  save(store);
}

export function resetPoints(group: string, names: string[]): void {
  const store = load();
  const g = store.groups[group];
  if (!g) return;
  for (const n of names) {
    if (g[n] && g[n].pts !== 0) {
      appendLog(store, group, { t: Date.now(), name: n, d: -g[n].pts, why: 'リセット', after: 0 });
      g[n].pts = 0;
    }
  }
  save(store);
}

// ---------- クラウド台帳の「知っている一覧」（この端末が作成/参加したもの） ----------

const LEDGER_KEY = 'lucky-smash-ledgers';

export interface StoredLedgerRef {
  id: string;
  name: string;
}

export function knownCloudLedgers(): StoredLedgerRef[] {
  try {
    const raw = localStorage.getItem(LEDGER_KEY);
    return raw ? (JSON.parse(raw) as StoredLedgerRef[]) : [];
  } catch {
    return [];
  }
}

export function rememberCloudLedger(ref: StoredLedgerRef): void {
  try {
    const list = knownCloudLedgers().filter((r) => r.id !== ref.id);
    list.unshift({ id: ref.id, name: ref.name });
    localStorage.setItem(LEDGER_KEY, JSON.stringify(list.slice(0, 30)));
  } catch {
    /* noop */
  }
}

export function loadMyName(): string {
  return localStorage.getItem(NAME_KEY) ?? '';
}

export function saveMyName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    /* noop */
  }
}
