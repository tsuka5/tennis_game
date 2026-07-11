/**
 * Firebase 設定。FIREBASE_SETUP.md の手順で自分のプロジェクトの値に
 * 置き換えるとフレンド機能が有効になる。
 * ※ Web 用 Firebase 設定は公開しても問題ない値（秘密鍵ではない）。
 * ※ 初期化（initializeApp）は friends.ts 側で行うので、ここは値だけ。
 */
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBSIjJ-iKtZVW45Oc2aNkUNa38x8QohT7w',
  authDomain: 'lucky-smash-e9b2c.firebaseapp.com',
  projectId: 'lucky-smash-e9b2c',
  storageBucket: 'lucky-smash-e9b2c.firebasestorage.app',
  messagingSenderId: '379532269721',
  appId: '1:379532269721:web:1feef732337374e0580008',
  measurementId: 'G-PNKPZJGRRV',
};

export function firebaseEnabled(): boolean {
  return FIREBASE_CONFIG.apiKey !== '' && FIREBASE_CONFIG.projectId !== '';
}
