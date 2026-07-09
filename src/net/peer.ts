/**
 * PeerJS ラッパー。PeerJS のクラウドシグナリングサーバー（無料）で
 * ルームコード → WebRTC DataChannel のスター型 P2P を確立する。
 * ホストは複数クライアントを受け付け、全員に配信できる。
 */
import { Peer } from 'peerjs';
import type { DataConnection } from 'peerjs';
import type { ClientMsg, HostMsg } from './protocol';

const ID_PREFIX = 'touch-smash-v1-';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 紛らわしい文字を除外
export const MAX_MEMBERS = 8;

export function randomCode(): string {
  let c = '';
  for (let i = 0; i < 5; i++) c += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return c;
}

function friendlyError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  if (raw.includes('Could not connect to peer') || raw.includes('peer-unavailable')) {
    return 'ルームが見つかりませんでした。コードを確認してください。';
  }
  if (raw.includes('unavailable-id')) {
    return 'このコードは使用中です。もう一度お試しください。';
  }
  if (raw.includes('network') || raw.includes('server')) {
    return 'シグナリングサーバーに接続できません。ネット接続を確認してください。';
  }
  return raw;
}

/** ホスト側: ルームを開き、複数クライアントを受け付ける。 */
export class HostNet {
  private peer: Peer | null = null;
  private conns = new Map<string, DataConnection>();
  private closed = false;

  onJoin: (id: string) => void = () => {};
  onLeave: (id: string) => void = () => {};
  onData: (id: string, m: ClientMsg) => void = () => {};
  /** ルーム自体が維持できなくなった場合（シグナリングエラー等） */
  onFatal: (reason: string) => void = () => {};

  start(code: string, onReady: () => void): void {
    const peer = new Peer(ID_PREFIX + code);
    this.peer = peer;
    peer.on('open', () => onReady());
    peer.on('connection', (c) => {
      c.on('open', () => {
        if (this.conns.size >= MAX_MEMBERS - 1) {
          c.close();
          return;
        }
        this.conns.set(c.peer, c);
        c.on('data', (d) => this.onData(c.peer, d as ClientMsg));
        c.on('close', () => this.drop(c.peer));
        c.on('error', () => this.drop(c.peer));
        this.onJoin(c.peer);
      });
    });
    peer.on('error', (e) => {
      // 個別ピアへの接続失敗はルーム全体のエラーではない
      const type = (e as { type?: string }).type ?? '';
      if (type === 'peer-unavailable') return;
      if (!this.closed) {
        this.closed = true;
        this.onFatal(friendlyError(e));
      }
    });
    peer.on('disconnected', () => peer.reconnect());
  }

  private drop(id: string): void {
    if (this.conns.delete(id)) this.onLeave(id);
  }

  get memberIds(): string[] {
    return [...this.conns.keys()];
  }

  send(id: string, m: HostMsg): void {
    const c = this.conns.get(id);
    if (c?.open) c.send(m);
  }

  broadcast(m: HostMsg): void {
    for (const c of this.conns.values()) if (c.open) c.send(m);
  }

  destroy(): void {
    this.closed = true;
    try {
      for (const c of this.conns.values()) c.close();
      this.peer?.destroy();
    } catch {
      /* noop */
    }
    this.conns.clear();
    this.peer = null;
  }
}

/** クライアント側: ルームコードでホストに接続する。 */
export class ClientNet {
  private peer: Peer | null = null;
  private conn: DataConnection | null = null;
  private closed = false;

  myId = '';
  onData: (m: HostMsg) => void = () => {};
  onOpen: () => void = () => {};
  onClose: (reason: string) => void = () => {};

  join(code: string): void {
    const peer = new Peer();
    this.peer = peer;
    peer.on('open', (id) => {
      this.myId = id;
      const c = peer.connect(ID_PREFIX + code, { reliable: true });
      this.conn = c;
      c.on('open', () => this.onOpen());
      c.on('data', (d) => this.onData(d as HostMsg));
      c.on('close', () => this.fail(new Error('ホストとの接続が切れました')));
      c.on('error', (e) => this.fail(e));
    });
    peer.on('error', (e) => this.fail(e));
  }

  private fail(e: unknown): void {
    if (this.closed) return;
    this.closed = true;
    this.onClose(friendlyError(e));
    this.destroy();
  }

  send(m: ClientMsg): void {
    if (this.conn?.open) this.conn.send(m);
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
