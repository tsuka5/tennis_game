/**
 * ゲーム全体の定数。長さの単位はメートル（実際のテニスコート寸法）。
 * ワールド座標系: x = コート横方向, y = 上方向, z = コート縦方向。
 * プレイヤー0（ホスト）が z > 0 側、プレイヤー1（クライアント/AI）が z < 0 側。
 */

export const G = 9.81;

export const COURT = {
  LENGTH: 23.77,
  HALF_L: 11.885,
  /** シングルスコート幅の半分 */
  HALF_SW: 4.115,
  /** ダブルスコート幅の半分（ラインの外枠） */
  HALF_DW: 5.485,
  /** ネットからサービスラインまでの距離 */
  SERVICE_LINE: 6.4,
  /** ゲームプレイ上のネット高さ（実際は中央0.914m/ポスト1.07m） */
  NET_HEIGHT: 0.95,
  NET_POST_X: 5.02,
  /** イン/アウト判定の許容マージン（ボール半径ぶん、ライン上はイン） */
  LINE_MARGIN: 0.08,
} as const;

export const BALL = {
  R: 0.033,
  /** 見た目の半径（視認性のため実物よりやや大きく） */
  VISUAL_R: 0.075,
  /** 反発係数（大きめ＝高く弾む。落下が高いほどバウンドも大きくなる） */
  RESTITUTION: 0.88,
  FRICTION: 0.78,
  /** 空気抵抗（1秒あたりの水平速度減衰率） */
  DRAG: 0.045,
} as const;

export const PLAY = {
  /** プレイヤー移動速度 (m/s) */
  SPEED: 7.4,
  /** 打球可能な距離 */
  REACH: 2.1,
  /** 打球可能なボール高さの上限 */
  MAX_HIT_Y: 3.0,
  /** 横方向の移動限界 */
  BOUND_X: 7.0,
  /** ネット側への移動限界（|z| の最小値） */
  BOUND_Z_NEAR: 1.2,
  /** ベースライン後方への移動限界 */
  BOUND_Z_FAR: 16.0,
  /** スイングアニメーションの長さ (s) */
  SWING_TIME: 0.35,
  /** この高さ以上のボールをショットするとスマッシュになる */
  SMASH_MIN_Y: 1.35,
} as const;

export const SERVE = {
  /** サーブの立ち位置（ベースラインのすぐ外） */
  STAND_Z: COURT.HALF_L + 0.5,
  /** 立ち位置のセンターマーク寄り限界 */
  STAND_X_MIN: 0.25,
  /** 立ち位置のサイドライン寄り限界 */
  STAND_X_MAX: COURT.HALF_SW - 0.3,
  /** フリック最弱時のサーブ飛距離 (m) */
  DIST_MIN: 5,
  /** フリック強さで加算される飛距離 (m)。強すぎるとボックスを越えてフォルト */
  DIST_RANGE: 18,
} as const;

export const NET_RATE = {
  /** スナップショット/位置送信の間隔 (s) ≒ 30Hz */
  INTERVAL: 1 / 30,
} as const;

/** 練習モードの先取ゲーム数（パーティーではロビーで選択する） */
export const PRACTICE_GAMES_TO_WIN = 4;
