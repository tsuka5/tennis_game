# 07. 受け入れ基準（Acceptance Criteria）

Given/When/Then 形式。各項はテスト（自動 or 手動）に落とせる粒度で記述する。
`[Auto]`=自動テスト推奨、`[Manual]`=実機/2台手動確認。

## AC-1 操作（[03](./03-controls-ux.md)）

- **AC-1.1** `[Manual]` Given 横画面でゲーム中, When 画面左半分の任意の点をタッチ, Then その点を中心にバーチャルジョイスティックが出現する。
- **AC-1.2** `[Manual]` Given ジョイスティック表示中, When 指を上方向にドラッグ, Then 自キャラが（自分視点で）上方向へ移動し, When 指を離す, Then 移動が停止しジョイスティックが消える。
- **AC-1.3** `[Manual]` Given 左で移動中, When 同時に右半分のAボタンをタップ, Then 移動とショットが同時に成立する（マルチタッチ）。
- **AC-1.4** `[Auto]` Given ボールが`HIT_RANGE`内, When Aタップ, Then ボールが相手コート方向へ打ち返される。Given ボールが範囲外, When Aタップ, Then 無効入力となり失点しない。
- **AC-1.5** `[Auto]` Given 打球の瞬間, When ジョイスティックを右に倒している, Then ボールは自分視点で右方向へ飛ぶ（左で左、中立でストレート）。
- **AC-1.6** `[Manual]` Given Bタップ, Then 山なり（高`height`・低速）のロブが相手頭上方向へ飛ぶ。
- **AC-1.7** `[Manual]` Given 端末を縦持ち, Then 「横にしてください」案内が表示され, When 横にする, Then 案内が消えプレイ可能になる。

## AC-2 座標・反転（[02](./02-coordinate-and-camera.md)）

- **AC-2.1** `[Manual]` Given ホストとクライアントが接続, Then 双方の画面で「自分が手前（下）・相手が奥（上）」に描画される。
- **AC-2.2** `[Manual]` Given 接続中, When クライアントがキャラを自分視点で右へ動かす, Then ホスト画面では同一の論理移動が破綻なく（左方向として）描画され、位置がズレない。
- **AC-2.3** `[Auto]` Given 任意の論理座標, When ローカル変換→逆変換, Then 元の論理座標に一致する（ホスト=恒等、クライアント=180°回転が可逆）。
- **AC-2.4** `[Auto]` 同期に渡る値が論理座標であり、描画変換が同期ペイロードを変更しないこと（不変条件 I-1）。

## AC-3 接続・マッチング（[01](./01-architecture.md), [04](./04-game-rules.md)）

- **AC-3.1** `[Manual]` Given ホストが部屋作成, Then 参加URLとQRが表示される。
- **AC-3.2** `[Manual]` Given クライアントがURL/QRを開く, When 同roomIdで参加, Then 30秒以内（同一Wi-Fi）にP2Pが確立しロビーに入る（G-1）。
- **AC-3.3** `[Auto]` Given P2P確立後, Then 対戦データはDataChannelのみを流れ、シグナリングWebSocketにゲーム状態が流れない（I/O検査）。
- **AC-3.4** `[Manual]` Given シングルス定員2, When 3人目が参加を試みる, Then 拒否され理由が提示される。
- **AC-3.5** `[Manual]` Given ネット未接続, When 壁打ちモード起動, Then オフラインで起動しラリーできる。

## AC-4 同期・ラグ隠蔽（[05](./05-netcode-sync.md)）★コア

- **AC-4.1** `[Manual/Auto]` Given 人工遅延150msを注入, When 自コートのボールにAでスイング, Then 自画面では遅延なく即ヒットする（空振りしない）。
- **AC-4.2** `[Auto]` Given ハンドオフを100往復, Then ボールが消失・二重化しない（常にちょうど1つのボール権限、I-2）。
- **AC-4.3** `[Auto]` Given 重複/古い`hitId`のハンドオフ受信, Then 受信側はそれを破棄する（I-3）。
- **AC-4.4** `[Auto]` Given 双方が同一ボールに同時ヒットを主張, When ホスト裁定, Then より早い`t`の一方が採用され、状態が1つに収束する。
- **AC-4.5** `[Manual]` Given パケット欠落（unreliable）, Then リモートキャラ/ボールは補間で滑らかに表示され、ワープでプレイが破綻しない。
- **AC-4.6** `[Manual]` Given クライアント切断, Then ホストが検知し適切に通知する（シングルス=中断、ダブルス=離脱通知）。Given ホスト切断, Then ルーム消滅が全員へ通知される。

## AC-5 ルール・スコア（[04](./04-game-rules.md)）

- **AC-5.1** `[Auto]` Given ボールが自コート外に落下, Then アウトで相手に1点入る。
- **AC-5.2** `[Auto]` Given 自打球がネット（`NET_Y`手前・`height<NET_HEIGHT`）, Then ネットで失点する。
- **AC-5.3** `[Auto]` Given 自コートで`MAX_BOUNCE`を超えてバウンド, Then 取り逃しで失点する（I-5）。
- **AC-5.4** `[Auto]` Given 失点発生, When 権限ピアがPOINT_REPORT送信, Then ホストがPOINT_RESULTを確定し全員のスコアが一致する（I-4）。
- **AC-5.5** `[Manual]` Given 先取ポイント（既定3）到達, Then ゲームセット画面（勝者/最終スコア/再戦・退出）が表示される。
- **AC-5.6** `[Manual]` Given ルーム作成画面, Then 先取ポイント数とモード（シングルス/ダブルス）を選択でき、全員へ反映される。

## AC-6 非機能（[01](./01-architecture.md), 本書 7.x）

- **AC-6.1** `[Manual]` 対象スマホ実機で 30fps 以上（目標60fps）で動作する。
- **AC-6.2** `[Manual]` 本番はHTTPSで配信され、WebRTC/タッチが機能する。
- **AC-6.3** `[Manual]` 運用に有料サービス契約が不要（無料シグナリング+STUN）であることを構成で確認できる（G-5）。

## 受け入れ判定の運用
- 各フェーズ完了時（[08](./08-roadmap.md)）に、当該フェーズが依存するACを満たすことを確認してから次フェーズへ進む（MUST）。
- `[Auto]` は可能な限りCI/ユニット/シミュレーションで自動化する（SHOULD）。
