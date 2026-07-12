/**
 * パーティールームの進行管理。
 * - PartyHost: メンバー管理・勝ち残りローテーション・ポイント付与（永続化）・
 *   ルーレット抽選・試合のライフサイクル。すべてホスト権威。
 * - PartyClient: ホストからの指示（ロビー/試合開始/スナップショット/ルーレット）
 *   に従って画面を切り替える。
 */
import { Game } from '../game/Game';
import type { Ledger, LedgerRef } from '../ledger/ledger';
import { isCloudRef } from '../ledger/ledger';
import { ClientNet, HostNet, randomCode } from '../net/peer';
import type {
  BettingState,
  ClientMsg,
  HostMsg,
  MemberInfo,
  RouletteKind,
  Score,
  Snapshot,
} from '../net/protocol';
import { newScore } from '../sim/score';
import { RouletteView } from '../ui/roulette';
import { rememberCloudLedger } from './storage';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

const WIN_PTS = 100;
/** サドンデス（1ポイント勝負）の勝利ボーナスは控えめに */
const SD_WIN_PTS = 30;
const PTS_PER_GAME = 20;
/** ルーレット重みのベース。0pt でも極端になりすぎないための下駄 */
const WEIGHT_BASE = 50;

/** 対戦者が選べる賭け額 */
const BET_CHIPS = [0, 10, 30, 50, 100];
/** 観戦者が予想に賭けられる額 */
const PREDICT_CHIPS = [10, 30, 50, 100];

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

// ---------------------------------------- ベット/観戦予想パネル

interface BetUiCtx {
  myId: string;
  isHost: boolean;
  /** チップの上限（持ちポイント） */
  myPts: number;
  onBet: (amount: number) => void;
  onPredict: (target: 0 | 1, amount: number) => void;
  onStart?: () => void;
  onCancel?: () => void;
}

/** 観戦予想のローカル選択状態（ハイライト用。確定値はホスト権威） */
let localPredict: { target: 0 | 1 | null; amount: number | null } = { target: null, amount: null };
let bettingKey = '';

function renderBetPanel(st: BettingState | null, ctx?: BetUiCtx): void {
  const panel = $('bet-panel');
  if (!st || !ctx) {
    panel.hidden = true;
    return;
  }
  // 新しいベットが開いたら予想の選択状態をリセット
  const key = st.ids.join('|');
  if (key !== bettingKey) {
    bettingKey = key;
    localPredict = { target: null, amount: null };
  }
  panel.hidden = false;
  // ベット受付中はロビーの通常操作を隠す
  $('lobby-host-controls').hidden = true;
  $('lobby-guest-hint').hidden = true;

  const modeLabel = st.gamesToWin === 0 ? '1ポイント勝負' : `${st.gamesToWin}ゲーム先取`;
  $('bet-matchup').textContent = `${st.names[0]} 🆚 ${st.names[1]}（${modeLabel}）`;

  const meIdx = st.ids.indexOf(ctx.myId);
  const isPlayer = meIdx === 0 || meIdx === 1;
  $('bet-my').hidden = !isPlayer;
  $('bet-predict').hidden = isPlayer;

  if (isPlayer) {
    const chips = $('bet-chips');
    chips.innerHTML = '';
    for (const a of BET_CHIPS) {
      const b = document.createElement('button');
      b.className = 'chip' + (st.stakes[meIdx] === a ? ' sel' : '');
      b.textContent = `${a}pt`;
      b.disabled = a > ctx.myPts;
      b.onclick = () => ctx.onBet(a);
      chips.appendChild(b);
    }
  } else {
    const p0 = $('predict-p0') as HTMLButtonElement;
    const p1 = $('predict-p1') as HTMLButtonElement;
    p0.textContent = `🎾 ${st.names[0]}`;
    p1.textContent = `🎾 ${st.names[1]}`;
    p0.className = 'btn' + (localPredict.target === 0 ? ' sel' : '');
    p1.className = 'btn' + (localPredict.target === 1 ? ' sel' : '');
    const pick = (t: 0 | 1): void => {
      localPredict.target = t;
      if (localPredict.amount !== null) ctx.onPredict(t, localPredict.amount);
      else renderBetPanel(st, ctx); // 選択ハイライトだけ更新
    };
    p0.onclick = () => pick(0);
    p1.onclick = () => pick(1);
    const chips = $('predict-chips');
    chips.innerHTML = '';
    for (const a of PREDICT_CHIPS) {
      const b = document.createElement('button');
      b.className = 'chip' + (localPredict.amount === a ? ' sel' : '');
      b.textContent = `${a}pt`;
      b.disabled = a > ctx.myPts || localPredict.target === null;
      b.onclick = () => {
        localPredict.amount = a;
        ctx.onPredict(localPredict.target as 0 | 1, a);
      };
      chips.appendChild(b);
    }
  }

  // 状況表示
  const [s0, s1] = st.stakes;
  $('bet-stake-line').textContent =
    s0 !== null && s1 !== null ? `💰 賭け金 ${Math.min(s0, s1)}pt — 勝者総取り！` : '両者の賭け待ち…';
  const stakeMarks = st.names.map((n, i) => `${n} ${st.stakes[i] === null ? '…' : '✓'}`);
  const predTxt = st.predictions.length
    ? `　予想: ${st.predictions.map((p) => `${p.name}→${st.names[p.target]} ${p.amount}pt`).join(' / ')}`
    : '';
  $('bet-status').textContent = `賭け: ${stakeMarks.join(' ／ ')}${predTxt}`;

  $('bet-host-controls').hidden = !ctx.isHost;
  if (ctx.isHost) {
    const startBtn = $('btn-bet-start') as HTMLButtonElement;
    startBtn.disabled = s0 === null || s1 === null;
    startBtn.onclick = () => ctx.onStart?.();
    ($('btn-bet-cancel') as HTMLButtonElement).onclick = () => ctx.onCancel?.();
  }
}

/** ポイント量から重み付き抽選のエントリと当選者を作る（単独ルーレットでも使用） */
export function rouletteEntriesFor(
  members: { name: string; pts: number }[],
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
  /** ルームコード（フレンド機能の「今いる部屋」公開にも使う） */
  readonly code = randomCode();
  private banner = 'メンバーの参加を待っています';
  private destroyed = false;

  // ベット/観戦予想（ホスト権威）
  private betting: BettingState | null = null;
  /** ベット中止時にローテーションへ戻す id（先頭に戻す順） */
  private bettingRestore: string[] = [];
  private readonly predictionsById = new Map<string, { target: 0 | 1; amount: number }>();
  private currentStake = 0;
  private currentGamesToWin = 2;
  /** 現在の試合が清算済みか（棄権と通常決着の二重清算を防ぐ） */
  private matchSettled = false;

  private readonly ledger: Ledger;

  /** クラウド台帳なら全員に共有する参照（履歴の監査・次回ホスト用） */
  get ledgerRef(): LedgerRef | null {
    return isCloudRef(this.ledger.ref) ? this.ledger.ref : null;
  }

  /** 履歴閲覧用（ホストはローカル台帳でも見られる） */
  get historyRef(): LedgerRef {
    return this.ledger.ref;
  }

  /** ルームが閉じた（エラー含む）ときにメニューへ戻すためのフック */
  onEnd: (message?: string) => void = () => {};

  constructor(myName: string, ledger: Ledger, roulette: RouletteView) {
    this.roulette = roulette;
    this.ledger = ledger;
    this.members.set('host', { id: 'host', name: myName, pts: 0, wins: 0, losses: 0 });
    this.rotation.push('host');
    // 台帳からホスト自身の持ち点を読み込む（初参加なら参加ボーナス付与）
    void this.ledger.ensureMember(myName).then((stats) => {
      const me = this.members.get('host');
      if (me && !this.destroyed) {
        Object.assign(me, stats);
        this.refreshLobby();
      }
    });

    this.net.onData = (id, m) => this.onData(id, m);
    this.net.onLeave = (id) => void this.removeMember(id);
    this.net.onFatal = (reason) => {
      this.destroy();
      this.onEnd(reason);
    };

    ($('lobby-code') as HTMLElement).textContent = '接続中…';
    showLobbyScreen(true);
    this.net.start(this.code, () => this.refreshLobby());

    // ホスト操作（onclick 代入なのでリスナーは重複しない）
    ($('btn-start-match') as HTMLButtonElement).onclick = () => this.openBetting();
    ($('btn-roulette-penalty') as HTMLButtonElement).onclick = () => this.spinRoulette('penalty');
    ($('btn-roulette-reward') as HTMLButtonElement).onclick = () => this.spinRoulette('reward');
    ($('btn-reset-pts') as HTMLButtonElement).onclick = () => void this.resetAllPoints();
    ($('btn-lobby-leave') as HTMLButtonElement).onclick = () => {
      this.destroy();
      this.onEnd();
    };
  }

  private get memberList(): MemberInfo[] {
    return [...this.members.values()];
  }

  private gamesToWin(): number {
    const v = Number(($('games-select') as HTMLSelectElement).value);
    return Number.isFinite(v) && v >= 0 ? v : 2;
  }

  private lobbyMsg(): HostMsg {
    return {
      t: 'lobby',
      code: this.code,
      group: this.ledger.ref.name,
      ledger: this.ledgerRef,
      members: this.memberList,
      championId: this.championId,
      gamesToWin: this.gamesToWin(),
      banner: this.banner,
    };
  }

  private refreshLobby(): void {
    // ポイントの手動調整はロビーには置かない（ホーム → グループ管理 で行う）
    renderLobby(this.memberList, this.championId, {
      code: this.code,
      group: this.ledger.ref.name,
      banner: this.banner,
      isHost: true,
    });
    // ベット中は renderLobby が戻したホスト操作を再び隠してパネルを出す
    if (this.betting) this.renderBet();
    else renderBetPanel(null);
    this.net.broadcast(this.lobbyMsg());
  }

  private onData(id: string, m: ClientMsg): void {
    if (m.t === 'hello') {
      void this.addMember(id, m.name);
      return;
    }
    if (m.t === 'bet') {
      this.setBet(id, m.amount);
      return;
    }
    if (m.t === 'predict') {
      this.setPredict(id, m.target, m.amount);
      return;
    }
    // 対戦中クライアントの入力を該当プレイヤーへ
    if (this.game && this.currentIds) {
      const idx = this.currentIds.indexOf(id);
      if (idx === 0 || idx === 1) this.game.applyRemoteInput(idx, m);
    }
  }

  private async addMember(id: string, rawName: string): Promise<void> {
    let name = rawName.trim().slice(0, 8) || 'ゲスト';
    // 同名は別人として扱えるよう連番を付ける（戦績は名前キーのため）
    const names = new Set(this.memberList.map((mm) => mm.name));
    let n = 2;
    const base = name;
    while (names.has(name)) name = `${base}${n++}`;

    // 先に 0pt で入室させ、台帳から読めたら反映（初参加なら参加ボーナス）
    this.members.set(id, { id, name, pts: 0, wins: 0, losses: 0 });
    this.rotation.push(id);
    this.banner = `${name} さんが参加しました`;
    this.refreshLobby();
    const stats = await this.ledger.ensureMember(name);
    const m = this.members.get(id);
    if (m && !this.destroyed) {
      Object.assign(m, stats);
      if (stats.wins + stats.losses === 0 && stats.pts === 100) {
        this.banner = `${name} さんが参加しました（🎁 参加ボーナス +100pt）`;
      }
      this.refreshLobby();
    }
    // ベット受付中に入ってきたら予想に参加してもらう
    if (this.betting) this.net.send(id, { t: 'betting', st: this.betting });
    // 試合中に入ってきたら観戦してもらう
    if (this.game && this.currentIds) {
      const p0 = this.members.get(this.currentIds[0]);
      const p1 = this.members.get(this.currentIds[1]);
      if (p0 && p1) {
        this.net.send(id, {
          t: 'match',
          ids: this.currentIds,
          names: [p0.name, p1.name],
          gamesToWin: this.currentGamesToWin,
        });
      }
    }
  }

  private async removeMember(id: string): Promise<void> {
    const m = this.members.get(id);
    if (!m) return;

    // 対戦中のプレイヤーの切断・退出は棄権負け。通常の決着と同じ清算
    // （勝利pt・賭け金・観戦予想・履歴）をメンバー削除前に行う
    let forfeited = false;
    if (this.currentIds?.includes(id) && !this.matchSettled) {
      const winnerIdx = (this.currentIds[0] === id ? 1 : 0) as 0 | 1;
      await this.onMatchOver(winnerIdx, this.game?.authScore() ?? newScore(0), true);
      forfeited = true;
    }

    this.members.delete(id);
    this.rotation = this.rotation.filter((x) => x !== id);
    if (this.championId === id) this.championId = null;
    this.banner = forfeited
      ? `🚪 ${m.name} さんが途中退出（棄権負け）／ ${this.banner}`
      : `${m.name} さんが退出しました`;

    // ベット中の退出: 対戦者ならベット中止、予想者なら予想を取り消す
    if (this.betting) {
      if (this.betting.ids.includes(id)) {
        this.cancelBetting(`${m.name} さんが退出したためベットを中止しました`);
      } else if (this.predictionsById.delete(id)) {
        this.syncPredictions();
      }
    }

    this.refreshLobby();
  }

  // ---------- ベット受付 ----------

  /** 対戦カードを決めてベット/観戦予想の受付を開く */
  private openBetting(): void {
    if (this.game || this.betting || this.members.size < 2) return;
    // 勝ち残り: チャンピオンが p0、挑戦者はローテーションの先頭
    let p0Id: string;
    let fromRotation = false;
    if (this.championId && this.members.has(this.championId)) {
      p0Id = this.championId;
    } else {
      p0Id = this.rotation.shift() as string;
      fromRotation = true;
    }
    this.rotation = this.rotation.filter((x) => x !== p0Id);
    const p1Id = this.rotation.shift();
    if (!p1Id) {
      if (fromRotation) this.rotation.unshift(p0Id);
      return;
    }
    this.bettingRestore = fromRotation ? [p0Id, p1Id] : [p1Id];
    this.predictionsById.clear();
    this.currentGamesToWin = this.gamesToWin();
    this.betting = {
      ids: [p0Id, p1Id],
      names: [
        (this.members.get(p0Id) as MemberInfo).name,
        (this.members.get(p1Id) as MemberInfo).name,
      ],
      gamesToWin: this.currentGamesToWin,
      stakes: [null, null],
      predictions: [],
    };
    this.banner = '対戦前ベット受付中！';
    this.refreshLobby();
    this.refreshBetting();
  }

  private renderBet(): void {
    const my = this.members.get('host');
    renderBetPanel(this.betting, {
      myId: 'host',
      isHost: true,
      myPts: my ? my.pts : 0,
      onBet: (a) => this.setBet('host', a),
      onPredict: (t, a) => this.setPredict('host', t, a),
      onStart: () => this.launchMatch(),
      onCancel: () => this.cancelBetting('ベットを中止しました'),
    });
  }

  private refreshBetting(): void {
    this.renderBet();
    this.net.broadcast({ t: 'betting', st: this.betting });
  }

  private setBet(id: string, amount: number): void {
    const bt = this.betting;
    if (!bt) return;
    const idx = bt.ids.indexOf(id);
    if (idx !== 0 && idx !== 1) return;
    const m = this.members.get(id);
    if (!m) return;
    bt.stakes[idx] = Math.max(0, Math.min(Math.round(amount), m.pts));
    this.refreshBetting();
  }

  private setPredict(id: string, target: 0 | 1, amount: number): void {
    const bt = this.betting;
    if (!bt || bt.ids.includes(id) || (target !== 0 && target !== 1)) return;
    const m = this.members.get(id);
    if (!m) return;
    this.predictionsById.set(id, {
      target,
      amount: Math.max(0, Math.min(Math.round(amount), m.pts)),
    });
    this.syncPredictions();
  }

  private syncPredictions(): void {
    if (!this.betting) return;
    this.betting.predictions = [...this.predictionsById.entries()]
      .filter(([pid]) => this.members.has(pid))
      .map(([pid, p]) => ({
        name: (this.members.get(pid) as MemberInfo).name,
        target: p.target,
        amount: p.amount,
      }));
    this.refreshBetting();
  }

  private cancelBetting(msg: string): void {
    if (!this.betting) return;
    this.rotation.unshift(...this.bettingRestore);
    this.bettingRestore = [];
    this.betting = null;
    this.predictionsById.clear();
    this.banner = msg;
    this.net.broadcast({ t: 'betting', st: null });
    this.refreshLobby();
  }

  // ---------- 試合 ----------

  /** 両者の賭けが揃ったら試合開始（賭け金は低い方に揃える） */
  private launchMatch(): void {
    const bt = this.betting;
    if (!bt || this.game) return;
    const [s0, s1] = bt.stakes;
    if (s0 === null || s1 === null) return;
    this.currentStake = Math.min(s0, s1);
    this.currentIds = bt.ids;
    this.matchSettled = false;
    const names = bt.names;
    const gamesToWin = bt.gamesToWin;
    this.betting = null;
    this.bettingRestore = [];
    renderBetPanel(null);
    this.net.broadcast({ t: 'betting', st: null });
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

  private async onMatchOver(winnerIdx: 0 | 1, score: Score, forfeit = false): Promise<void> {
    if (!this.currentIds || this.matchSettled) return;
    this.matchSettled = true;
    const winnerId = this.currentIds[winnerIdx];
    const loserId = this.currentIds[(1 - winnerIdx) as 0 | 1];
    const currentIds = this.currentIds;
    const winner = this.members.get(winnerId);
    const loser = this.members.get(loserId);
    // 決着の余韻を見せてからロビーへ（清算はその間に台帳へ書き込む）
    window.setTimeout(() => this.endMatch(), 2000);
    if (winner && loser) {
      const winPts = this.currentGamesToWin === 0 ? SD_WIN_PTS : WIN_PTS;
      const loserGames = score.games[(1 - winnerIdx) as 0 | 1];
      const stake = this.currentStake;
      const winnerDelta = winPts + stake;
      const loserDelta = loserGames * PTS_PER_GAME - stake;
      const stakeNote = stake > 0 ? `（賭け${stake}pt込み）` : '';
      const winWhy = forfeit
        ? `${loser.name}の途中棄権で勝利${stakeNote}`
        : `${loser.name}に勝利${stakeNote}`;
      const loseWhy = forfeit
        ? `途中棄権で${winner.name}に敗北${stakeNote}`
        : `${winner.name}に敗北${stakeNote}`;
      Object.assign(
        winner,
        { id: winnerId },
        await this.ledger.addResult(winner.name, winnerDelta, true, winWhy),
      );
      Object.assign(
        loser,
        { id: loserId },
        await this.ledger.addResult(loser.name, loserDelta, false, loseWhy),
      );
      let banner =
        `🏆 ${winner.name} の勝ち！ +${winnerDelta}pt ／ ` +
        `${loser.name} ${loserDelta >= 0 ? '+' : ''}${loserDelta}pt` +
        (stake > 0 ? `（賭け金 ${stake}pt）` : '');
      // 観戦予想の清算（的中で同額獲得、外れで没収）
      const settled: string[] = [];
      for (const [pid, p] of this.predictionsById) {
        const pm = this.members.get(pid);
        if (!pm || p.amount <= 0) continue;
        const hit = currentIds[p.target] === winnerId;
        const delta = hit ? p.amount : -p.amount;
        Object.assign(
          pm,
          { id: pid },
          await this.ledger.adjustPoints(pm.name, delta, hit ? '勝敗予想が的中' : '勝敗予想はずれ'),
        );
        settled.push(`${hit ? '🎯' : '💧'}${pm.name}${delta >= 0 ? '+' : ''}${delta}`);
      }
      if (settled.length) banner += ` ／ 予想: ${settled.join(' ')}`;
      this.banner = banner;
      this.championId = winnerId;
      this.rotation.push(loserId);
    }
    this.currentStake = 0;
    this.predictionsById.clear();
    // 台帳書き込みがロビー表示より遅れた場合に備えて再反映
    if (!this.destroyed && !this.game) this.refreshLobby();
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
    this.currentStake = 0;
    this.predictionsById.clear();
    showLobbyScreen(true);
  }

  // ---------- ルーレット / ポイント ----------

  private spinRoulette(kind: RouletteKind): void {
    if (this.game || this.betting || this.members.size < 2) return; // 対戦相手がいるロビーでのみ
    const list = this.memberList;
    const { entries, winner } = rouletteEntriesFor(list, kind);
    this.net.broadcast({ t: 'roulette', kind, entries, winner });
    this.roulette.show(kind, entries, winner);
  }

  private async resetAllPoints(): Promise<void> {
    await this.ledger.resetPoints(this.memberList.map((m) => m.name));
    for (const m of this.members.values()) m.pts = 0;
    this.banner = 'ポイントをリセットしました';
    this.refreshLobby();
  }

  destroy(): void {
    // ホスト自身が対戦中に退出する場合も棄権負けとして台帳へ清算する
    if (!this.destroyed && this.game && this.currentIds?.includes('host') && !this.matchSettled) {
      const winnerIdx = (this.currentIds[0] === 'host' ? 1 : 0) as 0 | 1;
      void this.onMatchOver(winnerIdx, this.game.authScore() ?? newScore(0), true);
    }
    this.destroyed = true;
    this.game?.dispose();
    this.game = null;
    this.betting = null;
    renderBetPanel(null);
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
  private lastMembers: MemberInfo[] = [];
  private lastBetting: BettingState | null = null;
  /** ロビーで共有された台帳参照（履歴の閲覧用。ローカル台帳の部屋では null） */
  historyRef: LedgerRef | null = null;

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
      this.lastMembers = m.members;
      this.historyRef = m.ledger;
      // 参加した台帳を覚えておく＝次回は自分がホストでも同じグループを使える
      if (m.ledger) rememberCloudLedger(m.ledger);
      renderLobby(m.members, m.championId, {
        code: m.code,
        group: m.group,
        banner: m.banner,
        isHost: false,
      });
      // ロビー再描画がベットパネルの表示状態を巻き戻すことがあるため復元
      renderBetPanel(this.lastBetting, this.betCtx());
      showLobbyScreen(true);
      return;
    }
    if (m.t === 'betting') {
      this.lastBetting = m.st;
      renderBetPanel(m.st, this.betCtx());
      // ベット終了時はロビーの通常表示（ゲスト向けヒント）へ戻す
      if (!m.st) $('lobby-guest-hint').hidden = false;
      return;
    }
    if (m.t === 'match') {
      this.lastBetting = null;
      renderBetPanel(null);
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

  private betCtx(): BetUiCtx {
    const me = this.lastMembers.find((mm) => mm.id === this.net.myId);
    return {
      myId: this.net.myId,
      isHost: false,
      myPts: me ? me.pts : 0,
      onBet: (amount) => this.net.send({ t: 'bet', amount }),
      onPredict: (target, amount) => this.net.send({ t: 'predict', target, amount }),
    };
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.game?.dispose();
    this.game = null;
    this.lastBetting = null;
    renderBetPanel(null);
    this.roulette.hide();
    showLobbyScreen(false);
    this.net.destroy();
  }
}
