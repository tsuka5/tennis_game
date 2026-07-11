/**
 * 自作必殺技のデフォルトとサニタイズ。値の上限はここで強制するので、
 * クライアントが改造した値を送ってきてもホスト側でバランスが守られる。
 */
import type { SpecialSpec } from '../net/protocol';

/** 配分できる合計ポイント */
export const SPECIAL_POINTS = 6;
/** 1項目の上限 */
export const SPECIAL_MAX = 4;

export const DEFAULT_SPECIAL: SpecialSpec = {
  name: '必殺スマッシュ',
  type: 'speed',
  spd: 3,
  dep: 2,
  ang: 1,
};

export function sanitizeSpecial(raw: unknown): SpecialSpec {
  const r = (raw ?? {}) as Partial<SpecialSpec>;
  const type = r.type === 'drop' || r.type === 'moon' ? r.type : 'speed';
  const pt = (v: unknown): number =>
    Math.max(0, Math.min(SPECIAL_MAX, Math.round(Number(v) || 0)));
  let spd = pt(r.spd);
  let dep = pt(r.dep);
  let ang = pt(r.ang);
  // 合計オーバーは角度→深さ→速さの順に削る
  while (spd + dep + ang > SPECIAL_POINTS) {
    if (ang > 0) ang--;
    else if (dep > 0) dep--;
    else spd--;
  }
  const name = String(r.name ?? '').trim().slice(0, 10) || DEFAULT_SPECIAL.name;
  return { name, type, spd, dep, ang };
}
