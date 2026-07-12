/**
 * エントリポイント: メニュー UI、練習モード、パーティールームの起動。
 */
import './style.css';
import { sfx } from './core/audio';
import { firebaseEnabled } from './friends/firebase-config';
import type { FriendService } from './friends/friends';
import { Game, practiceGame } from './game/Game';
import { createLedger, isCloudRef, listKnownLedgers, openLedger } from './ledger/ledger';
import type { LedgerRef } from './ledger/ledger';
import type { RouletteKind } from './net/protocol';
import { PartyClient, PartyHost, rouletteEntriesFor } from './party/party';
import { DEFAULT_GROUP, loadMyName, saveMyName } from './party/storage';
import type { LogEntry } from './party/storage';
import { RouletteView } from './ui/roulette';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

const menu = $('menu');
const menuHome = $('menu-home');
const menuJoin = $('menu-join');
const menuGroup = $('menu-group');
const menuPractice = $('menu-practice');
const menuManage = $('menu-manage');
const menuRoulette = $('menu-roulette');
const menuFriends = $('menu-friends');
const groupSelect = $('group-select') as HTMLSelectElement;
const groupInput = $('group-input') as HTMLInputElement;
const nameInput = $('name-input') as HTMLInputElement;
const joinInput = $('join-input') as HTMLInputElement;
const joinStatus = $('join-status');
const menuToast = $('menu-toast');

const roulette = new RouletteView();

let practice: Game | null = null;
let party: PartyHost | PartyClient | null = null;
let friends: FriendService | null = null;

nameInput.value = loadMyName();

// ===== フレンド機能（Firebase 設定があるときだけチャンクを読み込む） =====
if (firebaseEnabled()) {
  void import('./friends/friends')
    .then((m) => m.FriendService.create(myName()))
    .then((svc) => {
      friends = svc;
      $('friend-my-code').textContent = svc.myCode;
    })
    .catch(() => {
      $('friend-status').textContent = 'フレンド機能に接続できませんでした';
    });
}

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

function showPanel(
  panel: 'home' | 'join' | 'group' | 'practice' | 'manage' | 'roulette' | 'friends',
): void {
  menuHome.hidden = panel !== 'home';
  menuJoin.hidden = panel !== 'join';
  menuGroup.hidden = panel !== 'group';
  menuPractice.hidden = panel !== 'practice';
  menuManage.hidden = panel !== 'manage';
  menuRoulette.hidden = panel !== 'roulette';
  menuFriends.hidden = panel !== 'friends';
}

/**
 * 知っている台帳（クラウド＋ローカル）でセレクトを埋める。
 * option.value は refs 配列のインデックス。台帳がなければ空配列を返す。
 */
function fillLedgerSelect(sel: HTMLSelectElement): LedgerRef[] {
  const refs = listKnownLedgers();
  const prevId = refs[Number(sel.value)]?.id;
  sel.innerHTML = '';
  refs.forEach((r, i) => {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = isCloudRef(r) ? `☁️ ${r.name}` : `📁 ${r.name}（この端末のみ）`;
    if (r.id === prevId) opt.selected = true;
    sel.appendChild(opt);
  });
  return refs;
}

function toMenu(message?: string): void {
  practice?.dispose();
  practice = null;
  party?.destroy();
  party = null;
  friends?.setRoom(null);
  menu.hidden = false;
  showPanel('home');
  joinStatus.textContent = '';
  menuToast.textContent = message ?? '';
}

// ===== ひとりで練習（CPU レベル選択 → 開始） =====
$('btn-practice').addEventListener('click', () => showPanel('practice'));
$('btn-practice-back').addEventListener('click', () => showPanel('home'));
for (const lv of [1, 2, 3] as const) {
  $(`btn-cpu-${lv}`).addEventListener('click', () => {
    menu.hidden = true;
    menuToast.textContent = '';
    (document.activeElement as HTMLElement | null)?.blur();
    practice = practiceGame(lv);
  });
}

// ===== パーティールームを作る（まずポイント共有グループを選ぶ） =====
let createRefs: LedgerRef[] = [];

$('btn-create').addEventListener('click', () => {
  createRefs = fillLedgerSelect(groupSelect);
  const fresh = document.createElement('option');
  fresh.value = 'new';
  fresh.textContent = '＋ 新しいグループを作る';
  groupSelect.appendChild(fresh);
  if (createRefs.length === 0) fresh.selected = true;
  groupInput.value = '';
  showPanel('group');
});

$('btn-group-go').addEventListener('click', () => {
  const btn = $('btn-group-go') as HTMLButtonElement;
  btn.disabled = true;
  btn.textContent = '台帳に接続中…';
  void (async () => {
    const typed = groupInput.value.trim().slice(0, 12).replace(/[/\\]/g, '');
    const selected = createRefs[Number(groupSelect.value)];
    const ledger =
      typed || !selected
        ? await createLedger(typed || DEFAULT_GROUP)
        : await openLedger(selected);
    menu.hidden = true;
    menuToast.textContent = '';
    const host = new PartyHost(myName(), ledger, roulette);
    party = host;
    friends?.setRoom(host.code);
    host.onEnd = (message) => toMenu(message);
  })().finally(() => {
    btn.disabled = false;
    btn.textContent = 'このグループでルーム作成';
  });
});

$('btn-group-back').addEventListener('click', () => showPanel('home'));

// ===== ルームに参加 =====
$('btn-join').addEventListener('click', () => {
  showPanel('join');
  joinInput.value = '';
  joinStatus.textContent = '';
  joinInput.focus();
});

function joinRoomByCode(code: string): void {
  showPanel('join');
  joinInput.value = code;
  joinStatus.textContent = '接続中…';
  const client = new PartyClient(code, myName(), roulette);
  party = client;
  client.onJoined = () => {
    menu.hidden = true;
    joinStatus.textContent = '';
    friends?.setRoom(code);
  };
  client.onEnd = (message) => toMenu(message);
}

$('btn-join-go').addEventListener('click', () => {
  const code = joinInput.value.trim().toUpperCase();
  if (code.length !== 5) {
    joinStatus.textContent = '5文字のコードを入力してください';
    return;
  }
  joinRoomByCode(code);
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
let manageRefs: LedgerRef[] = [];

function renderHistoryInto(box: HTMLElement, entries: LogEntry[]): void {
  box.innerHTML = '';
  if (entries.length === 0) {
    box.textContent = 'まだ履歴がありません';
    box.style.opacity = '0.5';
    return;
  }
  box.style.opacity = '1';
  const fmt = new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  for (const e of entries) {
    const row = document.createElement('div');
    row.className = 'history-row';
    const time = document.createElement('span');
    time.className = 'h-time';
    time.textContent = fmt.format(new Date(e.t));
    const name = document.createElement('span');
    name.className = 'h-name';
    name.textContent = e.name;
    const delta = document.createElement('span');
    delta.className = `h-delta ${e.d >= 0 ? 'plus' : 'minus'}`;
    delta.textContent = `${e.d >= 0 ? '+' : ''}${e.d}`;
    const why = document.createElement('span');
    why.className = 'h-why';
    why.textContent = `${e.why}（→${e.after}pt）`;
    row.append(time, name, delta, why);
    box.appendChild(row);
  }
}

async function renderManage(): Promise<void> {
  manageRefs = fillLedgerSelect(manageSelect);
  const rows = $('manage-rows');
  rows.innerHTML = '';
  const historyBox = $('manage-history');
  const ref = manageRefs[Number(manageSelect.value)] ?? manageRefs[0];
  $('manage-hint').textContent = ref
    ? 'ポイントは ± で調整、🗑 でメンバーを削除できます'
    : 'まだデータがありません。パーティーで遊ぶとグループが作られます';
  if (!ref) {
    historyBox.innerHTML = '';
    return;
  }
  historyBox.textContent = '読み込み中…';
  const ledger = await openLedger(ref);
  const [members, history] = await Promise.all([ledger.listMembers(), ledger.listHistory()]);
  renderHistoryInto(historyBox, history);
  rows.innerHTML = '';
  for (const m of members) {
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
        void ledger.adjustPoints(m.name, delta, '手動調整').then(() => renderManage());
      };
      tds[3].appendChild(b);
    }
    const del = document.createElement('button');
    del.className = 'pts-btn';
    del.textContent = '🗑';
    del.onclick = () => {
      if (confirm(`${m.name} を「${ref.name}」から削除しますか？`)) {
        void ledger.removeMember(m.name).then(() => renderManage());
      }
    };
    tds[3].appendChild(del);
    rows.appendChild(tr);
  }
}

$('btn-manage').addEventListener('click', () => {
  showPanel('manage');
  void renderManage();
});
manageSelect.addEventListener('change', () => void renderManage());
$('btn-manage-back').addEventListener('click', () => showPanel('home'));

// ===== 即ルーレット（保存済みの台帳で抽選。ルーム不要） =====
const soloSelect = $('solo-group-select') as HTMLSelectElement;
let soloRefs: LedgerRef[] = [];

async function renderSoloRoulette(): Promise<void> {
  soloRefs = fillLedgerSelect(soloSelect);
  const ref = soloRefs[Number(soloSelect.value)] ?? soloRefs[0];
  const members = ref ? await (await openLedger(ref)).listMembers() : [];
  const ok = members.length >= 2;
  $('solo-roulette-hint').textContent = !ref
    ? 'まだデータがありません。パーティーで遊ぶとグループが作られます'
    : ok
      ? '回す前に当選確率を確認できます'
      : 'このグループにはメンバーが2人以上必要です';
  ($('btn-solo-penalty') as HTMLButtonElement).disabled = !ok;
  ($('btn-solo-reward') as HTMLButtonElement).disabled = !ok;

  // 確率プレビュー（ポイント → 罰/ご褒美それぞれの当選率）
  $('solo-preview').hidden = !ok;
  const rows = $('solo-preview-rows');
  rows.innerHTML = '';
  if (!ok) return;
  const pen = rouletteEntriesFor(members, 'penalty').entries;
  const rew = rouletteEntriesFor(members, 'reward').entries;
  members.forEach((m, i) => {
    const tr = document.createElement('tr');
    const tds = ['', 'pts', 'tag', 'tag'].map((cls) => {
      const td = document.createElement('td');
      if (cls) td.className = cls;
      tr.appendChild(td);
      return td;
    });
    tds[0].textContent = m.name;
    tds[1].textContent = String(m.pts);
    tds[2].textContent = `${pen[i].pct.toFixed(0)}%`;
    tds[3].textContent = `${rew[i].pct.toFixed(0)}%`;
    rows.appendChild(tr);
  });
}

function spinSolo(kind: RouletteKind): void {
  const ref = soloRefs[Number(soloSelect.value)] ?? soloRefs[0];
  if (!ref) return;
  void openLedger(ref)
    .then((l) => l.listMembers())
    .then((members) => {
      if (members.length < 2) return;
      const { entries, winner } = rouletteEntriesFor(members, kind);
      roulette.show(kind, entries, winner);
    });
}

$('btn-solo-roulette').addEventListener('click', () => {
  showPanel('roulette');
  void renderSoloRoulette();
});
soloSelect.addEventListener('change', () => void renderSoloRoulette());
$('btn-solo-penalty').addEventListener('click', () => spinSolo('penalty'));
$('btn-solo-reward').addEventListener('click', () => spinSolo('reward'));
$('btn-roulette-back').addEventListener('click', () => showPanel('home'));

// ===== フレンド =====
const friendCodeInput = $('friend-code-input') as HTMLInputElement;
const friendStatus = $('friend-status');

async function refreshFriendList(): Promise<void> {
  if (!friends) return;
  const list = await friends.listFriends().catch(() => null);
  if (!list || menuFriends.hidden) return;
  const el = $('friend-list');
  el.innerHTML = '';
  if (list.length === 0) {
    friendStatus.textContent = 'まだフレンドがいません。コードを教え合って追加しよう';
    return;
  }
  friendStatus.textContent = '';
  for (const f of list) {
    const row = document.createElement('div');
    row.className = 'friend-row';
    const dot = document.createElement('span');
    dot.textContent = f.online ? '🟢' : '⚪';
    const name = document.createElement('span');
    name.className = 'f-name';
    name.textContent = f.name;
    row.append(dot, name);
    if (f.online && f.roomCode) {
      const join = document.createElement('button');
      join.className = 'btn f-join';
      join.textContent = `🎾 ${f.roomCode} に参加`;
      join.onclick = () => joinRoomByCode(f.roomCode as string);
      row.appendChild(join);
    } else {
      const st = document.createElement('span');
      st.className = 'tag';
      st.style.opacity = '0.5';
      st.textContent = f.online ? 'オンライン' : 'オフライン';
      row.appendChild(st);
    }
    el.appendChild(row);
  }
}

$('btn-friends').addEventListener('click', () => {
  showPanel('friends');
  if (!firebaseEnabled()) {
    friendStatus.textContent =
      'フレンド機能は未設定です。FIREBASE_SETUP.md の手順で有効化できます';
    return;
  }
  if (friends) $('friend-my-code').textContent = friends.myCode;
  friendStatus.textContent = '読み込み中…';
  void refreshFriendList();
  // パネルを見ている間はオンライン状態を定期更新
  const timer = window.setInterval(() => {
    if (menuFriends.hidden) {
      window.clearInterval(timer);
      return;
    }
    void refreshFriendList();
  }, 15000);
});

$('btn-friend-add').addEventListener('click', () => {
  if (!friends) return;
  friendStatus.textContent = '追加中…';
  void friends
    .addFriendByCode(friendCodeInput.value)
    .catch(() => null)
    .then((name) => {
      if (name) {
        friendStatus.textContent = `${name} さんとフレンドになりました！`;
        friendCodeInput.value = '';
        void refreshFriendList();
      } else {
        friendStatus.textContent = 'コードが見つかりませんでした';
      }
    });
});

$('btn-friends-back').addEventListener('click', () => showPanel('home'));

// 名前を変えたらフレンド側の表示名も更新
nameInput.addEventListener('change', () => friends?.setName(myName()));

// ===== 招待の共有（LINE / コピー） =====
function currentRoomCode(): string | null {
  const code = ($('lobby-code').textContent ?? '').trim();
  return /^[A-Z0-9]{5}$/.test(code) ? code : null;
}

function inviteText(code: string): string {
  const url = `${location.origin}${location.pathname}?room=${code}`;
  return `🎾 ラッキースマッシュで遊ぼう！\n${url}\nリンクを開いて「参加する」を押すだけ！（ルームコード: ${code}）`;
}

$('btn-share-line').addEventListener('click', () => {
  const code = currentRoomCode();
  if (!code) return;
  window.open(`https://line.me/R/share?text=${encodeURIComponent(inviteText(code))}`, '_blank');
});

$('btn-copy-invite').addEventListener('click', () => {
  const code = currentRoomCode();
  if (!code) return;
  const btn = $('btn-copy-invite');
  void navigator.clipboard
    .writeText(inviteText(code))
    .then(() => {
      btn.textContent = '✓ コピーしました';
    })
    .catch(() => {
      btn.textContent = 'コピーできませんでした';
    })
    .then(() => {
      window.setTimeout(() => (btn.textContent = '📋 コピー'), 1600);
    });
});

// ===== 招待リンク（?room=XXXXX）で開いたらコードを自動入力 =====
{
  const roomParam = new URLSearchParams(location.search).get('room');
  if (roomParam && /^[A-Za-z0-9]{5}$/.test(roomParam)) {
    showPanel('join');
    joinInput.value = roomParam.toUpperCase();
    joinStatus.textContent = '招待コードを受け取りました！「参加する」でスタート';
    // リロードや共有で残らないよう URL からは消しておく
    history.replaceState(null, '', location.pathname);
  }
}

// ===== ロビーのポイント履歴（全員が監査できる） =====
$('btn-lobby-history').addEventListener('click', () => {
  const ref = party?.historyRef ?? null;
  const box = $('history-modal-list');
  $('history-modal').hidden = false;
  if (!ref) {
    box.textContent =
      'この部屋の台帳はホスト端末にあるため、ここからは見られません（クラウド台帳なら全員見られます）';
    box.style.opacity = '0.6';
    return;
  }
  box.textContent = '読み込み中…';
  void openLedger(ref)
    .then((l) => l.listHistory(100))
    .then((h) => renderHistoryInto(box, h))
    .catch(() => {
      box.textContent = '読み込みに失敗しました';
    });
});
$('btn-history-close').addEventListener('click', () => {
  $('history-modal').hidden = true;
});

// ===== あそびかたヘルプ =====
for (const id of ['btn-help', 'btn-help-home']) {
  $(id).addEventListener('click', () => {
    $('help').hidden = false;
  });
}
$('btn-help-close').addEventListener('click', () => {
  $('help').hidden = true;
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
