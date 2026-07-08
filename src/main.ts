/**
 * エントリポイント: メニュー UI と P2P 接続フロー、ゲームの起動/終了。
 */
import './style.css';
import { sfx } from './core/audio';
import { Game } from './game/Game';
import type { GameMode } from './game/Game';
import { NetSession, randomCode } from './net/peer';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

const menu = $('menu');
const menuHome = $('menu-home');
const menuHost = $('menu-host');
const menuJoin = $('menu-join');
const joinInput = $('join-input') as HTMLInputElement;
const joinStatus = $('join-status');

let game: Game | null = null;
let net: NetSession | null = null;

// iOS Safari: 最初のユーザー操作で AudioContext を解放
window.addEventListener('pointerdown', () => sfx.unlock(), { once: true });

function showPanel(panel: 'home' | 'host' | 'join'): void {
  menuHome.hidden = panel !== 'home';
  menuHost.hidden = panel !== 'host';
  menuJoin.hidden = panel !== 'join';
}

function toMenu(message?: string): void {
  game?.dispose();
  game = null;
  net?.destroy();
  net = null;
  menu.hidden = false;
  showPanel('home');
  joinStatus.textContent = '';
  if (message) {
    joinStatus.textContent = message;
    showPanel('join');
  }
}

function startGame(mode: GameMode, session: NetSession | null): void {
  menu.hidden = true;
  (document.activeElement as HTMLElement | null)?.blur();
  game = new Game(mode, session);
  game.onExit = () => toMenu();
  if (session) {
    session.onClose = (reason) => {
      toMenu();
      window.setTimeout(() => alert(reason), 50);
    };
  }
}

// ===== ひとりで練習 =====
$('btn-practice').addEventListener('click', () => {
  startGame('practice', null);
});

// ===== ルームを作る =====
$('btn-create').addEventListener('click', () => {
  const code = randomCode();
  $('room-code').textContent = '接続中…';
  showPanel('host');
  net = new NetSession();
  net.onClose = (reason) => {
    if (!game) {
      showPanel('home');
      window.setTimeout(() => alert(reason), 50);
    }
  };
  net.host(code, () => {
    $('room-code').textContent = code;
  });
  net.onOpen = () => {
    net?.send({ t: 'start' });
    startGame('host', net);
  };
});

$('btn-host-back').addEventListener('click', () => {
  net?.destroy();
  net = null;
  showPanel('home');
});

// ===== ルームに参加 =====
$('btn-join').addEventListener('click', () => {
  showPanel('join');
  joinInput.value = '';
  joinStatus.textContent = '';
  joinInput.focus();
});

$('btn-join-go').addEventListener('click', () => {
  const code = joinInput.value.trim().toUpperCase();
  if (code.length !== 5) {
    joinStatus.textContent = '5文字のコードを入力してください';
    return;
  }
  joinStatus.textContent = '接続中…';
  net = new NetSession();
  net.onClose = (reason) => {
    if (!game) joinStatus.textContent = reason;
  };
  // ホストからの start（または最初のスナップショット）で開始
  net.onData = (m) => {
    if (game) return;
    if (m.t === 'start' || m.t === 's') startGame('client', net);
  };
  net.join(code);
});

joinInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('btn-join-go').click();
  e.stopPropagation();
});

$('btn-join-back').addEventListener('click', () => {
  net?.destroy();
  net = null;
  showPanel('home');
});

// ===== ゲーム中の操作 =====
$('btn-quit').addEventListener('click', () => toMenu());
$('btn-result-menu').addEventListener('click', () => toMenu());
$('btn-rematch').addEventListener('click', () => {
  game?.rematch();
  (document.activeElement as HTMLElement | null)?.blur();
});
