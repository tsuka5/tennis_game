# タッチ・スマッシュ 仕様書（Spec-Driven Development 用）

P2Pマルチプレイヤーテニス **「タッチ・スマッシュ」** の実装可能レベル仕様書。
本ディレクトリのドキュメントは、コード生成・テスト設計・受け入れ判定の「正」とする。

## ドキュメント一覧

| No. | ファイル | 内容 |
|---|---|---|
| 00 | [00-overview.md](./00-overview.md) | 概要・目的・スコープ・用語定義 |
| 01 | [01-architecture.md](./01-architecture.md) | 技術スタック・トポロジー・シグナリング・権限モデル |
| 02 | [02-coordinate-and-camera.md](./02-coordinate-and-camera.md) | 座標系・画面180度反転・カメラ制御 |
| 03 | [03-controls-ux.md](./03-controls-ux.md) | タッチ操作・UI/UX仕様 |
| 04 | [04-game-rules.md](./04-game-rules.md) | ゲームルール・マッチング・試合設定 |
| 05 | [05-netcode-sync.md](./05-netcode-sync.md) | P2P同期・ラグ隠蔽・ボール権限委譲 |
| 06 | [06-data-models.md](./06-data-models.md) | データモデル・DataChannelメッセージスキーマ |
| 07 | [07-acceptance-criteria.md](./07-acceptance-criteria.md) | 受け入れ基準（Given/When/Then） |
| 08 | [08-roadmap.md](./08-roadmap.md) | フェーズ別ロードマップ・各フェーズのDoD |
| 09 | [09-open-questions.md](./09-open-questions.md) | 前提・既定値・未決事項 |

## 確定した主要な設計判断（Decision Log）

| ID | 決定事項 | 内容 |
|---|---|---|
| D-1 | シグナリング | 自作の最小WebSocketシグナリングサーバを**無料ホスティング枠**で運用（実質¥0）。ルームコードをURL/QRに埋め込む。 |
| D-2 | NAT越え | 公開STUNのみ使用（¥0）。TURN（中継）は「同一Wi-Fi/近接利用」前提のため**任意（既定オフ）**。難NAT環境向けに後付け可能な設計とする。 |
| D-3 | 権限モデル | **ホスト権威 + 自コート委譲**。スコア／試合進行はホストが権威。各プレイヤーは自コート内のヒット判定権限を委譲され、結果をP2P送信。競合時はホストが裁定。 |
| D-4 | 納品形式 | 分割ドキュメント（本ディレクトリ）。コードは本タスクでは生成しない。 |
| D-5 | シグナリング実装基盤 | **Cloudflare Workers + Durable Objects**。WebSocketをDurable Objectでルーム単位管理。無料枠・スリープなし・低遅延。 |
| D-6 | 対応端末/ブラウザ | **iOS Safari 15+ / Android Chrome 90+**（両対応）。iOS Safariの制約（画面向きロック非対応・自動再生制限）を仕様に織り込む。 |
| D-7 | サウンド/演出 | **最小限**。ヒット音・得点音と簡素な得点/ゲームセット表示のみ。BGM・凝った演出は範囲外。 |

未決事項（Q-1〜Q-10）はすべて確定済み。詳細と確定理由は [09-open-questions.md](./09-open-questions.md) を参照。

## 用語

本書では RFC 2119 の **MUST / SHOULD / MAY**（〜しなければならない / 〜すべき / 〜してもよい）を要件強度として用いる。
