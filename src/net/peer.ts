/**
 * PeerJS ラッパー。PeerJS のクラウドシグナリングサーバー（無料）で
 * ルームコード → WebRTC DataChannel の P2P 接続を確立する。
 */
import { Peer } from 'peerjs';
import type { DataConnection } from 'peerjs';
import type { NetMsg } from './protocol';

const ID_PREFIX = 'touch-smash-v1-';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 紛らわしい文字を除外

export function randomCode(): string {
  let c = '';
  for (let i = 0; i < 5; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return c;
}

export class NetSession {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  private closed = false;

  onData: (d: NetMsg) => void = () => {};
  onOpen: () => void = () => {};
  onClose: (reason: string) => void = () => {};

  /** ルームを作って相手を待つ。code が使用中などのエラーは onClose に流れる。 */
  host(code: string, onReady: () => void): void {
    const peer = new Peer(ID_PREFIX + code);
    this.peer = peer;
    peer.on('open', () => onReady());
    peer.on('connection', (c) => {
      if (this.conn) {
        c.close();
        return; // 1vs1 のみ
      }
      this.wire(c);
    });
    peer.on('error', (e) => this.fail(e));
    peer.on('disconnected', () => peer.reconnect());
  }

  /** コードを指定してルームに参加する。 */
  join(code: string): void {
    const peer = new Peer();
    this.peer = peer;
    peer.on('open', () => {
      const c = peer.connect(ID_PREFIX + code, { reliable: true });
      this.wire(c);
    });
    peer.on('error', (e) => this.fail(e));
  }

  private wire(c: DataConnection): void {
    this.conn = c;
    c.on('open', () => this.onOpen());
    c.on('data', (d) => this.onData(d as NetMsg));
    c.on('close', () => this.fail(new Error('相手との接続が切れました')));
    c.on('error', (e) => this.fail(e));
  }

  private fail(e: unknown): void {
    if (this.closed) return;
    this.closed = true;
    const raw = e instanceof Error ? e.message : String(e);
    let reason = raw;
    if (raw.includes('Could not connect to peer') || raw.includes('peer-unavailable')) {
      reason = 'ルームが見つかりませんでした。コードを確認してください。';
    } else if (raw.includes('unavailable-id')) {
      reason = 'このコードは使用中です。もう一度お試しください。';
    } else if (raw.includes('network') || raw.includes('server')) {
      reason = 'シグナリングサーバーに接続できません。ネット接続を確認してください。';
    }
    this.onClose(reason);
    this.destroy();
  }

  get connected(): boolean {
    return this.conn?.open === true;
  }

  send(msg: NetMsg): void {
    if (this.conn?.open) this.conn.send(msg);
  }

  destroy(): void {
    this.closed = true;
    try {
      this.conn?.close();
      this.peer?.destroy();
    } catch {
      /* noop */
    }
    this.conn = null;
    this.peer = null;
  }
}
