/**
 * P2P メッセージ定義。ホストが権威（ボール物理・ルール判定・ロビー管理・
 * ルーレット抽選）を持ち、クライアントは入力とスイング要求だけを送る。
 * ルームはスター型: 全クライアントがホストに接続し、ホストが配信する。
 */

export type ShotKind = 'drive' | 'lob' | 'special';

/**
 * 自作必殺技（パーツの組み合わせ）。タイプ + 6ポイントを
 * 速さ/深さ/角度に配分。値はホスト側で必ずサニタイズする。
 */
export interface SpecialSpec {
  /** 発動時に表示される技名（最大10文字） */
  name: string;
  type: 'speed' | 'drop' | 'moon';
  /** 各 0..4、合計 6 まで */
  spd: number;
  dep: number;
  ang: number;
}

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
  smash: number;
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
  /** プレイヤー0側 [x, z, swing]（swing は符号=振る側、絶対値=残量） */
  hp: [number, number, number];
  /** プレイヤー1側 [x, z, swing]（同上） */
  cp: [number, number, number];
  ph: Phase;
  sc: Score;
  /** [連番, テキスト] 連番が進んだらフラッシュ表示 */
  msg: [number, string];
  fx: FxCounters;
  /** ポイント開始時に増える。増えたら対戦者は自分の位置を合わせる */
  reset: number;
  /** サーブ照準 [着地x, 着地z, パワー0..1]（await-serve 中のみ、それ以外は null） */
  sv: [number, number, number] | null;
  /** 必殺ゲージ 0..1 [player0, player1] */
  sm: [number, number];
}

/** ロビーのメンバー情報（ポイントはホストの端末に永続保存される） */
export interface MemberInfo {
  id: string;
  name: string;
  pts: number;
  wins: number;
  losses: number;
}

export type RouletteKind = 'penalty' | 'reward';

/**
 * 対戦前ベットの状態（ホスト権威。全画面に配信して表示を同期する）。
 * 実際の賭け金は両者の賭け額の低い方に揃え、勝者が総取りする。
 */
export interface BettingState {
  ids: [string, string];
  names: [string, string];
  /** 先取ゲーム数。0 は 1 ポイントサドンデス */
  gamesToWin: number;
  /** 対戦者それぞれの賭け額（null = 未確定） */
  stakes: [number | null, number | null];
  /** 観戦者の勝敗予想（的中で同額獲得、外れで没収） */
  predictions: { name: string; target: 0 | 1; amount: number }[];
}

/** クライアント → ホスト */
export type ClientMsg =
  | { t: 'hello'; name: string; sp?: SpecialSpec }
  | { t: 'pos'; p: [number, number]; sw: number }
  | { t: 'swing'; kind: ShotKind; aim: number; pw?: number }
  | { t: 'bet'; amount: number }
  | { t: 'predict'; target: 0 | 1; amount: number };

/** ホスト → 全クライアント */
export type HostMsg =
  | Snapshot
  | {
      t: 'lobby';
      code: string;
      /** ポイント共有グループ名（この単位で戦績が永続化される） */
      group: string;
      members: MemberInfo[];
      championId: string | null;
      gamesToWin: number;
      /** 直近の出来事（試合結果など）をロビーに表示する */
      banner: string;
    }
  | { t: 'match'; ids: [string, string]; names: [string, string]; gamesToWin: number }
  | { t: 'betting'; st: BettingState | null }
  | {
      t: 'roulette';
      kind: RouletteKind;
      entries: { name: string; pct: number }[];
      /** 当選した entries のインデックス（演出は各画面で同じ結果に収束） */
      winner: number;
    };

export type NetMsg = ClientMsg | HostMsg;
