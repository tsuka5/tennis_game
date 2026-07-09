/**
 * パーティールームの進行管理。
 * - PartyHost: メンバー管理・勝ち残りローテーション・ポイント付与（永続化）・
 *   ルーレット抽選・試合のライフサイクル。すべてホスト権威。
 * - PartyClient: ホストからの指示（ロビー/試合開始/スナップショット/ルーレット）
 *   に従って画面を切り替える。
 */
import { Game } from '../game/Game';
import { ClientNet, HostNet, randomCode } from '../net/peer';
import type { ClientMsg, HostMsg, MemberInfo, RouletteKind, Score, Snapshot } from '../net/protocol';
import { RouletteView } from '../ui/roulette';
import { addResult, adjustPoints, getStats, resetPoints } from './storage';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

const WIN_PTS = 100;
const PTS_PER_GAME = 20;
/** ルーレット重みのベース。0pt でも極端になりすぎないための下駄 */
const WEIGHT_BASE = 50;

function renderLobby(
  members: MemberInfo[],
  championId: string | null,
  opts: {
    code: string;
    group: string;
    banner: string;
    isHost: boolean;
    /** ホストのみ: ポイントの動的調整（±ボタン） */
    onAdjust?: (name: string, delta: number) => void;
  },
): void {
  ($('lobby-code') as HTMLElement).textContent = opts.code;
  ($('lobby-group') as HTMLElement).textContent = `グループ: ${opts.group}`;
  ($('lobby-banner') as HTMLElement).textContent = opts.banner;
  $('lobby-host-controls').hidden = !opts.isHost;
  $('lobby-guest-hint').hidden = opts.isHost;
  const rows = $('lobby-rows');
  rows.innerHTML = '';
  for (const m of members) {
    const tr = document.createElement('tr');
    const cells = ['tag', '', 'pts', 'tag', 'adj'].map((cls) => {
      const td = document.createElement('td');
      if (cls) td.className = cls;
      tr.appendChild(td);
      return td;
    });
    cells[0].textContent = m.id === championId ? '👑' : '';
    cells[1].textContent = m.name;
    cells[2].textContent = String(m.pts);
    cells[3].textContent = `${m.wins}勝${m.losses}敗`;
    if (opts.onAdjust) {
      for (const delta of [-10, 10]) {
        const b = document.createElement('button');
        b.className = 'pts-btn';
        b.dataset.name = m.name;
        b.dataset.delta = String(delta);
        b.textContent = delta > 0 ? '＋' : '－';
        b.onclick = () => opts.onAdjust?.(m.name, delta);
        cells[4].appendChild(b);
      }
    }
    rows.appendChild(tr);
  }
  if (opts.isHost) {
    const enough = members.length >= 2;
    ($('btn-start-match') as HTMLButtonElement).disabled = !enough;
    ($('btn-roulette-penalty') as HTMLButtonElement).disabled = !enough;
    ($('btn-roulette-reward') as HTMLButtonElement).disabled = !enough;
  }
}

function showLobbyScreen(visible: boolean): void {
  $('lobby').hidden = !visible;
}

function rouletteEntriesFor(
  members: MemberInfo[],
  kind: RouletteKind,
): { entries: { name: string; pct: number }[]; winner: number } {
  const weights = members.map((m) =>
    kind === 'reward' ? m.pts + WEIGHT_BASE : 1 / (m.pts + WEIGHT_BASE),
  );
  const total = weights.reduce((a, b) => a + b, 0);
  const entries = members.map((m, i) => ({ name: m.name, pct: (weights[i] / total) * 100 }));
  let r = Math.random() * total;
  let winner = 0;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) {
      winner = i;
      break;
    }
  }
  return { entries, winner };
}

// ============================================================ ホスト

export class PartyHost {
  private readonly net = new HostNet();
  private readonly roulette: RouletteView;
  private readonly members = new Map<string, MemberInfo>();
  private rotation: string[] = [];
  private championId: string | null = null;
  private game: Game | null = null;
  private currentIds: [string, string] | null = null;
  private readonly code = randomCode();
  private banner = 'メンバーの参加を待っています';
  private destroyed = false;

  private readonly group: string;

  /** ルームが閉じた（エラー含む）ときにメニューへ戻すためのフック */
  onEnd: (message?: string) => void = () => {};

  constructor(myName: string, group: string, roulette: RouletteView) {
    this.roulette = roulette;
    this.group = group;
    this.members.set('host', { id: 'host', name: myName, ...getStats(group, myName) });
    this.rotation.push('host');

    this.net.onData = (id, m) => this.onData(id, m);
    this.net.onLeave = (id) => this.removeMember(id);
    this.net.onFatal = (reason) => {
      this.destroy();
      this.onEnd(reason);
    };

    ($('lobby-code') as HTMLElement).textContent = '接続中…';
    showLobbyScreen(true);
    this.net.start(this.code, () => this.refreshLobby());

    // ホスト操作（onclick 代入なのでリスナーは重複しない）
    ($('btn-start-match') as HTMLButtonElement).onclick = () => this.startMatch();
    ($('btn-roulette-penalty') as HTMLButtonElement).onclick = () => this.spinRoulette('penalty');
    ($('btn-roulette-reward') as HTMLButtonElement).onclick = () => this.spinRoulette('reward');
    ($('btn-reset-pts') as HTMLButtonElement).onclick = () => this.resetAllPoints();
    ($('btn-lobby-leave') as HTMLButtonElement).onclick = () => {
      this.destroy();
      this.onEnd();
    };
  }

  private get memberList(): MemberInfo[] {
    return [...this.members.values()];
  }

  private gamesToWin(): number {
    return Number(($('games-select') as HTMLSelectElement).value) || 2;
  }

  private lobbyMsg(): HostMsg {
    return {
      t: 'lobby',
      code: this.code,
      group: this.group,
      members: this.memberList,
      championId: this.championId,
      gamesToWin: this.gamesToWin(),
      banner: this.banner,
    };
  }

  private refreshLobby(): void {
    renderLobby(this.memberList, this.championId, {
      code: this.code,
      group: this.group,
      banner: this.banner,
      isHost: true,
      onAdjust: (name, delta) => this.adjust(name, delta),
    });
    this.net.broadcast(this.lobbyMsg());
  }

  /** ポイントの動的調整（永続化して全員に共有） */
  private adjust(name: string, delta: number): void {
    const member = this.memberList.find((m) => m.name === name);
    if (!member) return;
    const stats = adjustPoints(this.group, name, delta);
    Object.assign(member, stats);
    this.refreshLobby();
  }

  private onData(id: string, m: ClientMsg): void {
    if (m.t === 'hello') {
      this.addMember(id, m.name);
      return;
    }
    // 対戦中クライアントの入力を該当プレイヤーへ
    if (this.game && this.currentIds) {
      const idx = this.currentIds.indexOf(id);
      if (idx === 0 || idx === 1) this.game.applyRemoteInput(idx, m);
    }
  }

  private addMember(id: string, rawName: string): void {
    let name = rawName.trim().slice(0, 8) || 'ゲスト';
    // 同名は別人として扱えるよう連番を付ける（戦績は名前キーのため）
    const names = new Set(this.memberList.map((mm) => mm.name));
    let n = 2;
    const base = name;
    while (names.has(name)) name = `${base}${n++}`;

    this.members.set(id, { id, name, ...getStats(this.group, name) });
    this.rotation.push(id);
    this.banner = `${name} さんが参加しました`;
    this.refreshLobby();
    // 試合中に入ってきたら観戦してもらう
    if (this.game && this.currentIds) {
      const p0 = this.members.get(this.currentIds[0]);
      const p1 = this.members.get(this.currentIds[1]);
      if (p0 && p1) {
        this.net.send(id, {
          t: 'match',
          ids: this.currentIds,
          names: [p0.name, p1.name],
          gamesToWin: this.gamesToWin(),
        });
      }
    }
  }

  private removeMember(id: string): void {
    const m = this.members.get(id);
    if (!m) return;
    this.members.delete(id);
    this.rotation = this.rotation.filter((x) => x !== id);
    if (this.championId === id) this.championId = null;
    this.banner = `${m.name} さんが退出しました`;

    // 対戦中のプレイヤーが落ちたら試合中止
    if (this.currentIds?.includes(id)) {
      const otherId = this.currentIds[0] === id ? this.currentIds[1] : this.currentIds[0];
      this.abortMatch();
      if (this.members.has(otherId) && otherId !== this.championId && !this.rotation.includes(otherId)) {
        this.rotation.unshift(otherId);
      }
      this.banner = `${m.name} さんが切断したため試合を中止しました`;
    }
    this.refreshLobby();
  }

  // ---------- 試合 ----------

  private startMatch(): void {
    if (this.game || this.members.size < 2) return;
    // 勝ち残り: チャンピオンが p0、挑戦者はローテーションの先頭
    let p0Id: string;
    if (this.championId && this.members.has(this.championId)) {
      p0Id = this.championId;
    } else {
      p0Id = this.rotation.shift() as string;
    }
    this.rotation = this.rotation.filter((x) => x !== p0Id);
    const p1Id = this.rotation.shift();
    if (!p1Id) {
      this.rotation.unshift(p0Id);
      return;
    }
    this.currentIds = [p0Id, p1Id];
    const names: [string, string] = [
      (this.members.get(p0Id) as MemberInfo).name,
      (this.members.get(p1Id) as MemberInfo).name,
    ];
    const gamesToWin = this.gamesToWin();
    this.net.broadcast({ t: 'match', ids: this.currentIds, names, gamesToWin });

    showLobbyScreen(false);
    const myIdx = this.currentIds.indexOf('host');
    this.game = new Game({
      authority: true,
      playerIdx: myIdx === 0 || myIdx === 1 ? myIdx : null,
      names,
      gamesToWin,
      practice: false,
      net: {
        send: () => {},
        broadcast: (s: Snapshot) => this.net.broadcast(s),
      },
      onMatchOver: (winnerIdx, score) => this.onMatchOver(winnerIdx, score),
    });
  }

  private onMatchOver(winnerIdx: 0 | 1, score: Score): void {
    if (!this.currentIds) return;
    const winnerId = this.currentIds[winnerIdx];
    const loserId = this.currentIds[(1 - winnerIdx) as 0 | 1];
    const winner = this.members.get(winnerId);
    const loser = this.members.get(loserId);
    if (winner && loser) {
      const loserGames = score.games[(1 - winnerIdx) as 0 | 1];
      const loserPts = loserGames * PTS_PER_GAME;
      // 過去データとして永続保存（グループ×名前キー）し、メモリ上へ反映
      Object.assign(winner, { id: winnerId }, addResult(this.group, winner.name, WIN_PTS, true));
      Object.assign(loser, { id: loserId }, addResult(this.group, loser.name, loserPts, false));
      this.banner = `🏆 ${winner.name} の勝ち！ +${WIN_PTS}pt ／ ${loser.name} +${loserPts}pt`;
      this.championId = winnerId;
      this.rotation.push(loserId);
    }
    // 決着の余韻を見せてからロビーへ
    window.setTimeout(() => this.endMatch(), 2000);
  }

  private endMatch(): void {
    if (this.destroyed) return;
    this.abortMatch();
    this.refreshLobby();
  }

  /** 試合画面を畳む（ポイント処理はしない） */
  private abortMatch(): void {
    this.game?.dispose();
    this.game = null;
    this.currentIds = null;
    showLobbyScreen(true);
  }

  // ---------- ルーレット / ポイント ----------

  private spinRoulette(kind: RouletteKind): void {
    if (this.game || this.members.size < 2) return; // 対戦相手がいるロビーでのみ
    const list = this.memberList;
    const { entries, winner } = rouletteEntriesFor(list, kind);
    this.net.broadcast({ t: 'roulette', kind, entries, winner });
    this.roulette.show(kind, entries, winner);
  }

  private resetAllPoints(): void {
    resetPoints(this.group, this.memberList.map((m) => m.name));
    for (const m of this.members.values()) m.pts = 0;
    this.banner = 'ポイントをリセットしました';
    this.refreshLobby();
  }

  destroy(): void {
    this.destroyed = true;
    this.game?.dispose();
    this.game = null;
    this.roulette.hide();
    showLobbyScreen(false);
    this.net.destroy();
  }
}

// ============================================================ クライアント

export class PartyClient {
  private readonly net = new ClientNet();
  private readonly roulette: RouletteView;
  private game: Game | null = null;
  private joined = false;
  private destroyed = false;

  onEnd: (message?: string) => void = () => {};
  /** 最初のロビー受信（=入室成功）で呼ばれる */
  onJoined: () => void = () => {};

  constructor(code: string, myName: string, roulette: RouletteView) {
    this.roulette = roulette;
    this.net.onOpen = () => this.net.send({ t: 'hello', name: myName });
    this.net.onClose = (reason) => {
      this.destroy();
      this.onEnd(reason);
    };
    this.net.onData = (m) => this.onData(m);
    this.net.join(code);

    ($('btn-lobby-leave') as HTMLButtonElement).onclick = () => {
      this.destroy();
      this.onEnd();
    };
  }

  private onData(m: HostMsg): void {
    if (m.t === 's') {
      this.game?.applySnapshot(m);
      return;
    }
    if (m.t === 'lobby') {
      if (!this.joined) {
        this.joined = true;
        this.onJoined();
      }
      // ロビー表示 = 試合終了の合図でもある
      this.game?.dispose();
      this.game = null;
      renderLobby(m.members, m.championId, {
        code: m.code,
        group: m.group,
        banner: m.banner,
        isHost: false,
      });
      showLobbyScreen(true);
      return;
    }
    if (m.t === 'match') {
      showLobbyScreen(false);
      this.game?.dispose();
      const idx = m.ids.indexOf(this.net.myId);
      this.game = new Game({
        authority: false,
        playerIdx: idx === 0 || idx === 1 ? idx : null,
        names: m.names,
        gamesToWin: m.gamesToWin,
        practice: false,
        net: {
          send: (c: ClientMsg) => this.net.send(c),
          broadcast: () => {},
        },
      });
      return;
    }
    if (m.t === 'roulette') {
      this.roulette.show(m.kind, m.entries, m.winner);
    }
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.game?.dispose();
    this.game = null;
    this.roulette.hide();
    showLobbyScreen(false);
    this.net.destroy();
  }
}
