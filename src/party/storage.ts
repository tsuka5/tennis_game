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

interface StoreV2 {
  groups: Record<string, Record<string, PlayerStats>>;
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

function update(group: string, name: string, fn: (s: PlayerStats) => void): PlayerStats {
  const store = load();
  const g = (store.groups[group] ??= {});
  const s = (g[name] ??= { pts: 0, wins: 0, losses: 0 });
  fn(s);
  s.pts = Math.max(0, Math.round(s.pts));
  save(store);
  return { ...s };
}

export function addResult(group: string, name: string, ptsDelta: number, won: boolean): PlayerStats {
  return update(group, name, (s) => {
    s.pts += ptsDelta;
    if (won) s.wins += 1;
    else s.losses += 1;
  });
}

/** ホストによる手動調整（動的なポイント変更） */
export function adjustPoints(group: string, name: string, delta: number): PlayerStats {
  return update(group, name, (s) => {
    s.pts += delta;
  });
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
    if (g[n]) g[n].pts = 0;
  }
  save(store);
}

const SPECIAL_KEY = 'lucky-smash-special';

/** 自作必殺技の読み込み（生値。使用側で sanitizeSpecial すること） */
export function loadSpecial(): unknown {
  try {
    const raw = localStorage.getItem(SPECIAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSpecial(sp: unknown): void {
  try {
    localStorage.setItem(SPECIAL_KEY, JSON.stringify(sp));
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
