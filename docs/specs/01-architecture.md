# 01. アーキテクチャ

## 1.1 技術スタック

| 領域 | 採用技術 | 補足 |
|---|---|---|
| ゲームエンジン | **Phaser 3** | 物理は **Arcade Physics** を使用。 |
| 言語 | TypeScript（推奨） / JavaScript | 型でメッセージスキーマ（[06](./06-data-models.md)）を担保すべき（SHOULD）。 |
| 通信 | **WebRTC DataChannel** | 低遅延・順序/再送制御を用途別に設定（1.5）。 |
| シグナリング | **Cloudflare Workers + Durable Objects**（WebSocket） | ルームをDurable Objectで管理。SDP/ICE交換のみ。対戦データは流さない（D-5）。 |
| NAT越え | 公開 **STUN 複数**（既定） | `iceServers`にTURN差し込み口を用意（既定空）。TURNは任意（D-2, [09](./09-open-questions.md) Q-1）。 |
| ホスティング | 静的ホスティング + Cloudflare無料枠 | クライアントは静的配信。シグナリングはWorkers無料枠（D-1/D-5）。 |
| 対応端末 | iOS Safari 15+ / Android Chrome 90+ | 両対応。iOS固有制約を織り込む（D-6, [09](./09-open-questions.md) Q-9）。 |
| ビルド | Vite（推奨） | スマホ実機テストのため HTTPS ローカル配信ができること（WebRTC/タッチはセキュアコンテキスト必須）。 |

> **MUST**: 本番配信は **HTTPS（セキュアコンテキスト）** であること。WebRTC・センサー・タッチUIの一部はHTTPでは制限される。
> **MUST**: 対応ブラウザは iOS Safari 15+ / Android Chrome 90+ を一級サポート。iOS Safari の「画面向きロック非対応」「音声自動再生制限」を前提に設計する（[03](./03-controls-ux.md), [09](./09-open-questions.md) Q-9）。

## 1.2 トポロジー

スター型P2P。1台が**ホスト**、他が**クライアント**。

```
        (Host: Player A)
         /      |      \
        /       |       \
 (Client B) (Client C) (Client D)   ← ダブルス時。シングルスはB1台のみ
```

- 全DataChannelはホストを中心とするスター（ホスト⇔各クライアント）で接続する（MUST）。
- クライアント同士は直接接続しない。クライアント間で必要な情報はホストが中継する（MUST）。
- これにより接続数を抑え（N-1本）、権威の所在（ホスト）を単純化する。

## 1.3 シグナリングとルーム参加フロー

```
1. ホストが「部屋作成」→ ルームコード(roomId) 生成
2. ホストがシグナリングサーバにWebSocket接続し、roomId を登録
3. ホスト画面に 参加URL（roomId 埋め込み）と QRコード を表示
4. クライアントがURL/QRを開く → 同 roomId でシグナリングサーバに接続
5. シグナリングサーバ経由で SDP(offer/answer) と ICE candidate を交換
6. P2P (DataChannel) 確立 → 以降の対戦データはP2P直送、サーバは関与しない
7. 全員接続後、ホストがロビー→試合開始を制御
```

要件:
- **MUST**: ルームコードは推測困難な十分なエントロピー（例: 6〜8文字の base32）を持つこと。
- **MUST**: P2P確立後、シグナリング接続は維持してよい（再接続・後続参加者用）が、対戦データはシグナリング経路に流さないこと。
- **SHOULD**: ホスト不在/切断時はルーム消滅とし、クライアントへ通知する（[05](./05-netcode-sync.md) 切断仕様）。
- **MAY**: シグナリングサーバはルームのメタ情報（定員・モード）のみ保持し、ゲーム状態は保持しない。

### シグナリングサーバ要件（Cloudflare Workers + Durable Objects）

| 項目 | 要件 |
|---|---|
| プロトコル | WebSocket（WSS, セキュア） |
| 実装基盤 | Cloudflare Workers。**ルーム1つ = Durable Object 1インスタンス**（`roomId`でルーティング）（D-5） |
| 機能 | roomId ごとのメッセージ中継（offer/answer/candidate/参加通知/退出通知）のみ |
| 状態 | Durable Objectがルームの存在・参加者リスト・定員を保持。**ゲームロジックは持たない**（MUST NOT） |
| スケール | 同時数十ルーム程度を無料枠で処理。スリープによる初回遅延がないこと |
| 開発/デプロイ | `wrangler dev`（Miniflare）でローカル、`wrangler deploy`で本番（SHOULD） |
| 接続先設定 | クライアントの`wss://`接続先はビルド時環境変数で切替（`GameConfig.net.signalingUrl`）（MUST） |
| メッセージ種別 | `create-room` / `join-room` / `signal`(offer,answer,candidate) / `peer-joined` / `peer-left` / `error` |

## 1.4 権限モデル（Authority Model）— D-3

**ホスト権威 + 自コート委譲** を採用する。

| 対象 | 権威を持つ主体 | 根拠 |
|---|---|---|
| スコア・試合フェーズ・サーブ権・ゲームセット判定 | **ホスト**（権威） | 全ピアで唯一の正となる進行管理が必要 |
| 自コート内のボール物理・ヒット判定 | **そのコートのプレイヤー**（委譲） | 体感遅延ゼロのスイングを保証（[05](./05-netcode-sync.md)） |
| ボールが相手コートへ渡る瞬間（ハンドオフ） | 送り出した側 → 受け取る側へ権限移譲 | ラリーの往復を低遅延で繋ぐ |
| 競合・不整合（同時主張、得点の食い違い） | **ホストが裁定**（最終決定） | 単一権威で収束させる |

規則:
- **MUST**: 各プレイヤーは、ボールが自コートにある間のみ、そのボールの位置・速度・ヒット結果を権威的に決定できる。
- **MUST**: ボールがネットを越え相手コートへ入る時、ボール権限は受け取り側へ移る（[05](./05-netcode-sync.md) ハンドオフ）。
- **MUST**: 得点の発生（イン/アウト/ネット/空振り失点）は、その時点のボール権限保持ピアがホストへ報告し、**ホストが POINT_RESULT を確定・全体配信**する。
- **MUST**: クライアントは自身が観測したスコアより、ホストの POINT_RESULT を優先する（ホストが最終権威）。
- **SHOULD**: ダブルスでは「自チームの半面」を2人で共有し、ボール権限はチーム単位で扱う（チーム内の代表決定は[05](./05-netcode-sync.md)）。

## 1.5 DataChannel 設定方針

用途に応じて信頼性/順序性を変える（MUST 区別すること）。

| チャネル/メッセージ種別 | ordered | maxRetransmits | 理由 |
|---|---|---|---|
| 高頻度の状態同期（PLAYER_STATE, BALL_STATE） | false | 0（unreliable） | 最新値のみ重要。古いパケットの再送は不要。 |
| 重要イベント（BALL_HANDOFF, POINT_RESULT, MATCH_STATE, サーブ） | true | null（reliable） | 取りこぼすと進行が壊れる。確実に届ける。 |
| 計測（PING/PONG） | false | 0 | RTT計測。 |

> 実装は単一DataChannel内でメッセージ種別ごとに送信モードを切り替える方式、または用途別に複数DataChannelを開く方式のいずれでもよい（MAY）。ただし上表の信頼性特性を満たすこと（MUST）。

## 1.6 全体構成図

```
[ブラウザ: Host A]                         [ブラウザ: Client B]
  Phaser3 Game                               Phaser3 Game
  ├ Render (論理→ローカル変換: 恒等)          ├ Render (論理→ローカル変換: 180°反転)
  ├ Input  (ジョイスティック/ボタン)          ├ Input  (左右反転同期)
  ├ Physics(Arcade, 自コート権威)            ├ Physics(Arcade, 自コート権威)
  ├ NetSync(権限/ハンドオフ/補間)            ├ NetSync(同上)
  └ MatchState(権威: スコア/進行) ◀───────── (POINT_RESULT等を受領)
        │  ▲                                      │  ▲
        ▼  │  DataChannel (P2P, 対戦データ)        ▼  │
        └──┴──────────────────────────────────────┘──┘
                          │
              (確立時のみ) │ WebSocket
                          ▼
                  [Signaling Server]  ← SDP/ICE中継のみ・¥0運用
                          │
                          ▼
                  [STUN (公開, ¥0)]   ← TURNは任意(既定オフ)
```
