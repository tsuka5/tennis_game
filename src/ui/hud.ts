/**
 * DOM ベースの HUD: スコアボード、センターメッセージ、サーブヒント、リザルト。
 */
import type { Score } from '../net/protocol';
import { pointStrings } from '../sim/score';

const $ = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;

export class Hud {
  private msgTimer: number | undefined;

  private readonly root = $('hud');
  private readonly msg = $('msg');
  private readonly serveHint = $('serve-hint');
  private readonly flickMeter = $('flick-meter');
  private readonly flickMeterFill = $('flick-meter-fill');
  private readonly result = $('result');
  private readonly resultTitle = $('result-title');
  private readonly resultDetail = $('result-detail');

  show(myName: string, oppName: string, spectating = false): void {
    $('sb-name-me').textContent = myName;
    $('sb-name-opp').textContent = oppName;
    $('spectating').hidden = !spectating;
    this.root.hidden = false;
    this.result.hidden = true;
    this.msg.classList.remove('show');
    this.serveHint.hidden = true;
    this.flickMeter.hidden = true;
  }

  hide(): void {
    this.root.hidden = true;
  }

  /** mySide: 自分のプレイヤー番号（0=ホスト, 1=クライアント） */
  setScore(sc: Score, mySide: 0 | 1): void {
    const pts = pointStrings(sc);
    const opp = (1 - mySide) as 0 | 1;
    $('sb-games-me').textContent = String(sc.games[mySide]);
    $('sb-games-opp').textContent = String(sc.games[opp]);
    $('sb-points-me').textContent = pts[mySide];
    $('sb-points-opp').textContent = pts[opp];
    $('sb-row-me').classList.toggle('serving', sc.server === mySide);
    $('sb-row-opp').classList.toggle('serving', sc.server === opp);
  }

  flash(text: string, ms = 1600): void {
    this.msg.textContent = text;
    this.msg.classList.add('show');
    window.clearTimeout(this.msgTimer);
    this.msgTimer = window.setTimeout(() => this.msg.classList.remove('show'), ms);
  }

  setServeHint(visible: boolean): void {
    this.serveHint.hidden = !visible;
  }

  /** フリック中のパワーゲージ 0..1（null で非表示。緑=弱 → 赤=強） */
  setFlickPower(p: number | null): void {
    this.flickMeter.hidden = p === null;
    if (p === null) return;
    this.flickMeterFill.style.width = `${Math.round(p * 100)}%`;
    this.flickMeterFill.style.background = `hsl(${Math.round(120 * (1 - p))}, 90%, 55%)`;
  }

  showResult(won: boolean, detail: string): void {
    this.resultTitle.textContent = won ? 'WIN' : 'LOSE';
    this.resultTitle.className = won ? 'win' : 'lose';
    this.resultDetail.textContent = detail;
    this.result.hidden = false;
  }

  hideResult(): void {
    this.result.hidden = true;
  }
}
