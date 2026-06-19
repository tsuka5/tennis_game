# 06. データモデル・メッセージスキーマ

本章はコード生成時の「型の正」とする。TypeScriptで定義することを推奨（SHOULD）。
座標・速度は全て**論理座標**（[02](./02-coordinate-and-camera.md)）。時刻 `t` は送信側ローカルの ms（[05](./05-netcode-sync.md) 5.2でオフセット補正）。

## 6.1 列挙・基本型

```ts
type GameMode = 'wall' | 'singles' | 'doubles';
type Team = 'host' | 'client';            // ダブルスでもチームは2つ
type ShotType = 'normal' | 'smash' | 'lob';
type MatchPhase = 'lobby' | 'serve' | 'rally' | 'point_end' | 'game_over';

interface Vec2 { x: number; y: number; }
```

## 6.2 ドメインモデル

```ts
interface PlayerState {
  playerId: string;       // ピア識別子
  team: Team;
  pos: Vec2;              // 論理座標
  vel: Vec2;              // 論理速度
  t: number;              // 送信時刻(ms)
}

interface BallState {
  pos: Vec2;              // 論理座標(水平面)
  vel: Vec2;              // 論理速度(水平面)
  height: number;         // 擬似高さ h（>=0, 0で接地）
  vHeight: number;        // 高さ方向速度
  spin?: number;          // 任意: カーブ表現
  shot: ShotType;         // 直近に適用されたショット種別
  bounces: number;        // 現コートでのバウンド回数
  authority: string;      // 現在のボール権限ピアID
  hitId: number;          // 単調増加。重複/古い更新の破棄に使用
  t: number;
}

interface MatchSettings {
  mode: GameMode;
  pointsToWin: 3 | 5 | 7;     // 先取ポイント
  gamesToWin: 1;              // 既定1ゲーム
  deuce: boolean;             // 既定 false
  serveAlternation: 'per_point' | 'per_two';
}

interface Score {
  host: number;
  client: number;
}
```

## 6.3 試合状態（ホスト権威）

```ts
interface MatchState {
  phase: MatchPhase;
  settings: MatchSettings;
  score: Score;
  servingTeam: Team;
  servePos: Vec2;          // サーブ投入位置(論理)
  rallyId: number;         // ポイントごとに増加。古いラリーのイベント破棄に使用
}
```

## 6.4 DataChannel メッセージ（封筒）

全P2Pメッセージは共通封筒で包む（MUST）。

```ts
interface Envelope<T = unknown> {
  v: 1;                    // プロトコルバージョン（互換管理, MUST）
  type: MsgType;
  from: string;            // 送信ピアID
  t: number;               // 送信時刻(ms)
  seq: number;             // 送信側の単調増加シーケンス
  payload: T;
}

type MsgType =
  | 'PLAYER_STATE'         // 高頻度 / unreliable
  | 'BALL_STATE'           // 高頻度 / unreliable（権限保持ピアのみ送信）
  | 'BALL_HANDOFF'         // イベント / reliable・ordered
  | 'POINT_REPORT'         // クライアント→ホスト / reliable
  | 'POINT_RESULT'         // ホスト→全員 / reliable
  | 'MATCH_STATE'          // ホスト→全員 / reliable
  | 'SERVE'                // ホスト→全員 / reliable
  | 'PING' | 'PONG'        // 計測 / unreliable
  | 'LOBBY'                // ロビー/参加者更新 / reliable
  | 'BYE';                 // 退出通知 / reliable
```

ペイロード定義（主要）:

```ts
// 高頻度
type PlayerStatePayload = PlayerState;
type BallStatePayload = BallState;

// ヒット→相手コートへ送り出す権威イベント
interface BallHandoffPayload {
  ball: BallState;         // ヒット直後の確定ボール状態（authority は送り手のまま、越境で受け手へ）
  hitId: number;           // ball.hitId と一致。重複破棄キー
  shooter: string;         // 打ったピアID
  rallyId: number;
}

// 失点/得点イベントの報告（権限ピア → ホスト）
interface PointReportPayload {
  rallyId: number;
  cause: 'out' | 'net' | 'double_bounce' | 'miss';
  losingTeam: Team;        // 報告者の自己申告（ホストが検証）
  ballAtEvent: BallState;
}

// ホスト確定（唯一の正）
interface PointResultPayload {
  rallyId: number;
  winningTeam: Team;
  score: Score;
  nextServe: { servingTeam: Team; servePos: Vec2; rallyId: number };
  matchOver: boolean;
  winner?: Team;
}

interface ServePayload {
  servingTeam: Team;
  servePos: Vec2;
  ball: BallState;         // 投入初期状態
  rallyId: number;
}

interface PingPayload { id: number; }
interface PongPayload { id: number; echoT: number; } // echoT=対応PINGのt

interface LobbyPayload {
  players: { playerId: string; team: Team; ready: boolean }[];
  settings: MatchSettings;
  hostId: string;
}
```

## 6.5 シグナリング メッセージ（WebSocket）

P2P確立前のみ使用（[01](./01-architecture.md)）。ゲーム状態は含めない（MUST NOT）。

```ts
type SignalType =
  | 'create-room' | 'room-created'
  | 'join-room'   | 'join-ok' | 'join-error'
  | 'signal'                       // offer/answer/candidate中継
  | 'peer-joined' | 'peer-left'
  | 'error';

interface SignalMessage {
  type: SignalType;
  roomId: string;
  from?: string;
  to?: string;                     // 中継先ピア
  data?: RTCSessionDescriptionInit | RTCIceCandidateInit | { mode: GameMode; capacity: number };
}
```

## 6.6 設定（バランス調整パラメータ集約）

[03](./03-controls-ux.md)・[04](./04-game-rules.md)の実装定数は単一の設定オブジェクトに集約する（SHOULD）。

```ts
interface GameConfig {
  court: { COURT_W: number; COURT_H: number; NET_Y: number; NET_HEIGHT: number };
  player: {
    PLAYER_MAX_SPEED: number;
    HIT_RANGE: number;
    moveBounds: { minX: number; maxX: number; minY: number; maxY: number }; // 自コート可動矩形(Q-5)
  };
  joystick: { JOY_DEADZONE_PX: number; JOY_MAX_RADIUS_PX: number };
  shot: {
    SHOT_SPEED: number; SMASH_SPEED: number; LOB_SPEED: number; SHOT_MAX_ANGLE_DEG: number;
    SMASH_HEIGHT: number;          // 既定 0.6（Q-6）
    SMASH_INCOMING_SPEED: number;  // 既定 600（Q-6）
  };
  physics: { GRAVITY_H: number; BOUNCE_DAMP: number; MAX_BOUNCE: number };
  doubles: { DOUBLES_TIEBREAK_PX: number }; // 既定 24（Q-3）
  net: {
    sendRateHz: number; pingRateHz: number; timeoutMs: number; handoffGraceMs: number;
    rejoinGraceMs: number;        // 既定 10000（Q-8）
    iceServers: RTCIceServer[];   // 公開STUN複数。TURNは既定空（Q-1）
    signalingUrl: string;         // wss:// 接続先。環境変数で切替（Q-2）
  };
}
```

## 6.7 不変条件（Invariants）

実装・テストで常に保つべき条件（MUST）:
- I-1: 同期に用いる座標は常に論理座標。描画変換は同期状態を変更しない。
- I-2: 任意時刻で、あるボールのボール権限ピアはちょうど1（チーム）である。
- I-3: `hitId` / `rallyId` / `seq` は単調増加し、受信側は過去値を破棄する。
- I-4: スコアの正はホストの `MatchState.score` のみ。
- I-5: `BallState.bounces <= MAX_BOUNCE`（超過時に失点確定処理が走る）。
