/**
 * エントリポイント: メニュー UI、練習モード、パーティールームの起動。
 */
import './style.css';
import { sfx } from './core/audio';
import { Game, practiceGame } from './game/Game';
import type { RouletteKind } from './net/protocol';
import { PartyClient, PartyHost, rouletteEntriesFor } from './party/party';
import {
  DEFAULT_GROUP,
  adjustPoints,
  listGroups,
  listMembers,
  loadMyName,
  removeMember,
  saveMyName,
} from './party/storage';
import { RouletteView } from './ui/roulette';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

const menu = $('menu');
const menuHome = $('menu-home');
const menuJoin = $('menu-join');
const menuGroup = $('menu-group');
const menuManage = $('menu-manage');
const menuRoulette = $('menu-roulette');
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

// ===== 全画面表示（モバイルブラウザの URL バー対策） =====
// iPhone Safari など Fullscreen API 非対応の環境ではボタンを出さない
{
  const fsBtn = $('btn-fullscreen');
  const root = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void>;
  };
  const doc = document as Document & {
    webkitFullscreenElement?: Element | null;
    webkitExitFullscreen?: () => Promise<void>;
  };
  const supported = !!(root.requestFullscreen || root.webkitRequestFullscreen);
  const isFullscreen = () => !!(doc.fullscreenElement ?? doc.webkitFullscreenElement);

  if (supported) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', async () => {
      try {
        if (isFullscreen()) {
          await (doc.exitFullscreen ?? doc.webkitExitFullscreen)!.call(doc);
        } else {
          await (root.requestFullscreen ?? root.webkitRequestFullscreen)!.call(root);
          // ゲームは横画面前提なので、可能なら横向きに固定（非対応環境は無視）
          try {
            await (screen.orientation as unknown as {
              lock?: (o: string) => Promise<void>;
            }).lock?.('landscape');
          } catch {
            /* noop */
          }
        }
      } catch {
        /* ユーザー操作起点でない等で失敗しても無視 */
      }
    });
    const sync = () => {
      const on = isFullscreen();
      fsBtn.classList.toggle('active', on);
      fsBtn.title = on ? '全画面をやめる' : '全画面にする';
    };
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
  }
}

function myName(): string {
  const n = nameInput.value.trim().slice(0, 8);
  if (n) saveMyName(n);
  return n || 'プレイヤー';
}

function showPanel(panel: 'home' | 'join' | 'group' | 'manage' | 'roulette'): void {
  menuHome.hidden = panel !== 'home';
  menuJoin.hidden = panel !== 'join';
  menuGroup.hidden = panel !== 'group';
  menuManage.hidden = panel !== 'manage';
  menuRoulette.hidden = panel !== 'roulette';
}

/** 保存済みグループでセレクトを埋める。グループがなければ false */
function fillGroupSelect(sel: HTMLSelectElement): boolean {
  const groups = listGroups();
  const prev = sel.value;
  sel.innerHTML = '';
  for (const g of groups) {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = `📁 ${g}`;
    sel.appendChild(opt);
  }
  if (groups.includes(prev)) sel.value = prev;
  return groups.length > 0;
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

// ===== グループ管理 =====
const manageSelect = $('manage-select') as HTMLSelectElement;

function renderManage(): void {
  const hasGroups = fillGroupSelect(manageSelect);
  const rows = $('manage-rows');
  rows.innerHTML = '';
  $('manage-hint').textContent = hasGroups
    ? 'ポイントは ± で調整、🗑 でメンバーを削除できます'
    : 'まだデータがありません。パーティーで遊ぶとグループが作られます';
  if (!hasGroups) return;
  for (const m of listMembers(manageSelect.value)) {
    const tr = document.createElement('tr');
    const tds = ['', 'pts', 'tag', 'adj'].map((cls) => {
      const td = document.createElement('td');
      if (cls) td.className = cls;
      tr.appendChild(td);
      return td;
    });
    tds[0].textContent = m.name;
    tds[1].textContent = String(m.pts);
    tds[2].textContent = `${m.wins}勝${m.losses}敗`;
    for (const delta of [-10, 10]) {
      const b = document.createElement('button');
      b.className = 'pts-btn';
      b.textContent = delta > 0 ? '＋' : '－';
      b.onclick = () => {
        adjustPoints(manageSelect.value, m.name, delta);
        renderManage();
      };
      tds[3].appendChild(b);
    }
    const del = document.createElement('button');
    del.className = 'pts-btn';
    del.textContent = '🗑';
    del.onclick = () => {
      if (confirm(`${m.name} を「${manageSelect.value}」から削除しますか？`)) {
        removeMember(manageSelect.value, m.name);
        renderManage();
      }
    };
    tds[3].appendChild(del);
    rows.appendChild(tr);
  }
}

$('btn-manage').addEventListener('click', () => {
  showPanel('manage');
  renderManage();
});
manageSelect.addEventListener('change', renderManage);
$('btn-manage-back').addEventListener('click', () => showPanel('home'));

// ===== 即ルーレット（保存済みの台帳で抽選。ルーム不要） =====
const soloSelect = $('solo-group-select') as HTMLSelectElement;

function renderSoloRoulette(): void {
  const hasGroups = fillGroupSelect(soloSelect);
  const members = hasGroups ? listMembers(soloSelect.value) : [];
  const ok = members.length >= 2;
  $('solo-roulette-hint').textContent = !hasGroups
    ? 'まだデータがありません。パーティーで遊ぶとグループが作られます'
    : ok
      ? `${members.length}人のポイントから確率を計算します`
      : 'このグループにはメンバーが2人以上必要です';
  ($('btn-solo-penalty') as HTMLButtonElement).disabled = !ok;
  ($('btn-solo-reward') as HTMLButtonElement).disabled = !ok;
}

function spinSolo(kind: RouletteKind): void {
  const members = listMembers(soloSelect.value);
  if (members.length < 2) return;
  const { entries, winner } = rouletteEntriesFor(members, kind);
  roulette.show(kind, entries, winner);
}

$('btn-solo-roulette').addEventListener('click', () => {
  showPanel('roulette');
  renderSoloRoulette();
});
soloSelect.addEventListener('change', renderSoloRoulette);
$('btn-solo-penalty').addEventListener('click', () => spinSolo('penalty'));
$('btn-solo-reward').addEventListener('click', () => spinSolo('reward'));
$('btn-roulette-back').addEventListener('click', () => showPanel('home'));

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
