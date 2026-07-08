/**
 * P2P メッセージ定義。ホストが権威（ボール物理・ルール判定）を持ち、
 * クライアントは自分の位置とスイング要求を送る。
 */

export type ShotKind = 'drive' | 'lob';

export type Phase = 'await-serve' | 'rally' | 'between' | 'over';

export interface Score {
  /** 現在のゲーム内の生ポイント数 [player0, player1] */
  points: [number, number];
  games: [number, number];
  server: 0 | 1;
  finished: boolean;
  winner: 0 | 1 | null;
}

/** 効果音・演出用のイベントカウンタ。増分を検知した側が再生する。 */
export interface FxCounters {
  hit: number;
  bounce: number;
  net: number;
  point: number;
  fault: number;
}

export interface Snapshot {
  t: 's';
  /** ボール [px, py, pz, vx, vy, vz] */
  b: [number, number, number, number, number, number];
  /** ボールが物理シミュレーション中か（サーブ待ちは false） */
  ba: boolean;
  /** ホスト側プレイヤー [x, z, swing]（swing は符号=振る側、絶対値=残量） */
  hp: [number, number, number];
  /** クライアント側プレイヤー [x, z, swing]（同上） */
  cp: [number, number, number];
  ph: Phase;
  sc: Score;
  /** [連番, テキスト] 連番が進んだらフラッシュ表示 */
  msg: [number, string];
  fx: FxCounters;
  /** ポイント開始時に増える。増えたらクライアントは自分の位置を cp に合わせる */
  reset: number;
}

export type ClientMsg =
  | { t: 'pos'; p: [number, number]; sw: number }
  | { t: 'swing'; kind: ShotKind; aim: number }
  | { t: 'rematch' };

export type HostMsg = Snapshot | { t: 'start' };

export type NetMsg = ClientMsg | HostMsg;
