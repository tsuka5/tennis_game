# フレンド機能のセットアップ（Firebase）

フレンド機能（フレンドコード・オンライン表示・友達の部屋にワンタップ参加）を
有効にするには、自分の Firebase プロジェクト（無料）を作って設定を貼り付けます。
**未設定でもゲーム本体はすべて動きます**（フレンド機能だけ無効）。

所要時間: 約10分

## 1. Firebase プロジェクトを作る

1. https://console.firebase.google.com を開き、Google アカウントでログイン
2. 「プロジェクトを追加」→ 名前は自由（例: `lucky-smash`）
3. Google アナリティクスは **無効でOK** → 作成

## 2. Web アプリを登録して設定値を取得

1. プロジェクトのトップで **`</>`（ウェブ）** アイコンをクリック
2. アプリ名は自由（例: `lucky-smash-web`）→ 「アプリを登録」
3. 表示される `firebaseConfig` の値を控える（あとで使います）

## 3. 匿名認証を有効化

1. 左メニュー「構築 → Authentication」→「始める」
2. 「ログイン方法」タブ →「匿名」を選んで **有効にする** → 保存

## 4. Firestore を作成

1. 左メニュー「構築 → Firestore Database」→「データベースを作成」
2. ロケーションは `asia-northeast1`（東京）がおすすめ
3. 「本番環境モード」で作成
4. 「ルール」タブを開き、以下に置き換えて「公開」:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // プレイヤー: 本人だけが自分の情報を書ける。読み取りはログイン済みなら可
    match /players/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;

      // フレンド登録は相互に書き込むため、ログイン済みなら書き込み可
      match /friends/{fid} {
        allow read, write: if request.auth != null;
      }
    }
    // フレンドコード → uid の逆引き。上書き禁止（create のみ）
    match /codes/{code} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid;
    }
  }
}
```

## 5. 設定をゲームに貼り付ける

`src/friends/firebase-config.ts` を開き、手順2で控えた値を貼り付けます:

```ts
export const FIREBASE_CONFIG = {
  apiKey: 'AIza...',
  authDomain: 'xxx.firebaseapp.com',
  projectId: 'xxx',
  storageBucket: 'xxx.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef',
};
```

> Web 用の Firebase 設定は「秘密」ではないので、そのまま git にコミットして
> 問題ありません（アクセス制御は上記のセキュリティルールが担います）。

## 6. 承認済みドメインを追加（GitHub Pages で遊ぶ場合）

1. Authentication →「設定」→「承認済みドメイン」
2. `<ユーザー名>.github.io` を追加

## 7. 動作確認

```sh
npm run dev
```

ホーム →「👥 フレンド」で自分の6文字コードが表示されれば成功。
2台で開いてコードを教え合い、追加 → 片方がルームを作ると
もう片方のフレンド一覧に「🎾 XXXXX に参加」ボタンが出ます。

## しくみ（メモ）

- 匿名認証なのでアカウント登録は不要。**端末（ブラウザ）ごと**に1プレイヤー
- ブラウザのデータを消すとフレンドコードは新しくなります
- オンライン表示は約25秒ごとのハートビート（70秒途切れるとオフライン表示）
- 無料枠（Spark プラン）で十分収まる通信量です
