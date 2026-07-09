/**
 * テニスのスコア進行（15/30/40/デュース/アドバンテージ、先取ゲーム制）。
 */
import type { Score } from '../net/protocol';

export function newScore(server: 0 | 1): Score {
  return { points: [0, 0], games: [0, 0], server, finished: false, winner: null };
}

export function addPoint(sc: Score, w: 0 | 1, gamesToWin: number): void {
  if (sc.finished) return;
  sc.points[w]++;
  const [a, b] = sc.points;
  const lead = Math.abs(a - b);
  if ((a >= 4 || b >= 4) && lead >= 2) {
    const g = a > b ? 0 : 1;
    sc.games[g]++;
    sc.points = [0, 0];
    sc.server = sc.server === 0 ? 1 : 0;
    if (sc.games[g] >= gamesToWin) {
      sc.finished = true;
      sc.winner = g;
    }
  }
}

/** 各プレイヤーの現在ポイント表示（'0'|'15'|'30'|'40'|'Ad'|'-'）。 */
export function pointStrings(sc: Score): [string, string] {
  const L = ['0', '15', '30', '40'];
  const [a, b] = sc.points;
  if (a >= 3 && b >= 3) {
    if (a === b) return ['40', '40'];
    return a > b ? ['Ad', '–'] : ['–', 'Ad'];
  }
  return [L[Math.min(a, 3)], L[Math.min(b, 3)]];
}

/** ポイント確定後のコール（例: "30 - 15" / "デュース"）。first 視点で並べる。 */
export function pointCall(sc: Score, first: 0 | 1): string {
  const [a, b] = sc.points;
  if (a === 0 && b === 0) return 'ゲーム！';
  if (a >= 3 && b >= 3) {
    if (a === b) return 'デュース';
    return 'アドバンテージ';
  }
  const s = pointStrings(sc);
  return `${s[first]} - ${s[1 - first]}`;
}
