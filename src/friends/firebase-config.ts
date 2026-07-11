/**
 * Firebase 設定。FIREBASE_SETUP.md の手順で自分のプロジェクトの値に
 * 置き換えるとフレンド機能が有効になる。
 * 空のままでもゲーム本体はすべて動く（フレンド機能だけ無効になる）。
 * ※ Web 用 Firebase 設定は公開しても問題ない値（秘密鍵ではない）。
 */
export const FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

export function firebaseEnabled(): boolean {
  return FIREBASE_CONFIG.apiKey !== '' && FIREBASE_CONFIG.projectId !== '';
}
