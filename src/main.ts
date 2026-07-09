/**
 * エントリポイント: メニュー UI、練習モード、パーティールームの起動。
 */
import './style.css';
import { sfx } from './core/audio';
import { Game, practiceGame } from './game/Game';
import { PartyClient, PartyHost } from './party/party';
import { DEFAULT_GROUP, listGroups, loadMyName, saveMyName } from './party/storage';
import { RouletteView } from './ui/roulette';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

const menu = $('menu');
const menuHome = $('menu-home');
const menuJoin = $('menu-join');
const menuGroup = $('menu-group');
const groupSelect = $('group-select') as HTMLSelectElement;
const groupInput = $('group-input') as HTMLInputElement;
const nameInput = $('name-input') as HTMLInputElement;
const joinInput = $('join-input') as HTMLInputElement;
const joinStatus = $('join-status');
const menuToast = $('menu-toast');

const roulette = new RouletteView();

let practice: Game | null = null;
let party: PartyHost | PartyClient | null = null;

nameInput.value = loadMyName();

// iOS Safari: 最初のユーザー操作で AudioContext を解放
window.addEventListener('pointerdown', () => sfx.unlock(), { once: true });

function myName(): string {
  const n = nameInput.value.trim().slice(0, 8);
  if (n) saveMyName(n);
  return n || 'プレイヤー';
}

function showPanel(panel: 'home' | 'join' | 'group'): void {
  menuHome.hidden = panel !== 'home';
  menuJoin.hidden = panel !== 'join';
  menuGroup.hidden = panel !== 'group';
}

function toMenu(message?: string): void {
  practice?.dispose();
  practice = null;
  party?.destroy();
  party = null;
  menu.hidden = false;
  showPanel('home');
  joinStatus.textContent = '';
  menuToast.textContent = message ?? '';
}

// ===== ひとりで練習 =====
$('btn-practice').addEventListener('click', () => {
  menu.hidden = true;
  menuToast.textContent = '';
  (document.activeElement as HTMLElement | null)?.blur();
  practice = practiceGame();
});

// ===== パーティールームを作る（まずポイント共有グループを選ぶ） =====
$('btn-create').addEventListener('click', () => {
  const groups = listGroups();
  groupSelect.innerHTML = '';
  for (const g of groups) {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = `📁 ${g}`;
    groupSelect.appendChild(opt);
  }
  const fresh = document.createElement('option');
  fresh.value = '';
  fresh.textContent = '＋ 新しいグループを作る';
  groupSelect.appendChild(fresh);
  if (groups.length === 0) fresh.selected = true;
  groupInput.value = '';
  showPanel('group');
});

$('btn-group-go').addEventListener('click', () => {
  const group =
    groupInput.value.trim().slice(0, 12) || groupSelect.value || DEFAULT_GROUP;
  menu.hidden = true;
  menuToast.textContent = '';
  const host = new PartyHost(myName(), group, roulette);
  party = host;
  host.onEnd = (message) => toMenu(message);
});

$('btn-group-back').addEventListener('click', () => showPanel('home'));

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
  const client = new PartyClient(code, myName(), roulette);
  party = client;
  client.onJoined = () => {
    menu.hidden = true;
    joinStatus.textContent = '';
  };
  client.onEnd = (message) => toMenu(message);
});

joinInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('btn-join-go').click();
  e.stopPropagation();
});

$('btn-join-back').addEventListener('click', () => {
  party?.destroy();
  party = null;
  showPanel('home');
});

// ===== ゲーム中の操作（練習モード用。パーティー中はロビーの退出ボタンで抜ける） =====
$('btn-quit').addEventListener('click', () => {
  if (practice) {
    toMenu();
  } else {
    party?.destroy();
    party = null;
    toMenu();
  }
});

$('btn-result-menu').addEventListener('click', () => toMenu());
$('btn-rematch').addEventListener('click', () => {
  practice?.rematch();
  (document.activeElement as HTMLElement | null)?.blur();
});
