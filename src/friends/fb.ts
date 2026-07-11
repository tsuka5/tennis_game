/**
 * Firebase の共有初期化（フレンド機能とクラウド台帳で共用）。
 * このモジュールは firebase-config が設定済みのときだけ動的 import される。
 */
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './firebase-config';

let ready: Promise<{ db: Firestore; uid: string }> | null = null;

/** 匿名ログイン済みの Firestore ハンドルを返す（初回のみ初期化） */
export function fb(): Promise<{ db: Firestore; uid: string }> {
  if (!ready) {
    ready = (async () => {
      const app = initializeApp(FIREBASE_CONFIG);
      const cred = await signInAnonymously(getAuth(app));
      return { db: getFirestore(app), uid: cred.user.uid };
    })();
  }
  return ready;
}
