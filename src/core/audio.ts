/**
 * WebAudio による効果音合成（アセット不要）。
 * iOS Safari 対策: 最初のユーザー操作で unlock() を呼ぶこと。
 */
class Sfx {
  private ctx: AudioContext | null = null;

  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctor) this.ctx = new Ctor();
  }

  private noise(dur: number, freq: number, q: number, gain: number, type: BiquadFilterType = 'bandpass'): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const t = ctx.currentTime;
    const len = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const flt = ctx.createBiquadFilter();
    flt.type = type;
    flt.frequency.value = freq;
    flt.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(flt).connect(g).connect(ctx.destination);
    src.start(t);
  }

  private tone(freq: number, dur: number, gain: number, type: OscillatorType = 'sine', delay = 0): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur);
  }

  /** ラケットの打球音 */
  hit(): void {
    this.noise(0.07, 1600, 1.2, 0.35, 'highpass');
    this.tone(240, 0.09, 0.22, 'triangle');
  }

  /** スマッシュ（強い打球音） */
  smash(): void {
    this.noise(0.1, 1100, 1, 0.5, 'highpass');
    this.tone(150, 0.18, 0.28, 'sawtooth');
    this.tone(300, 0.1, 0.18, 'triangle');
  }

  /** バウンド音 */
  bounce(): void {
    this.tone(130, 0.09, 0.16, 'sine');
    this.noise(0.05, 500, 1, 0.1, 'lowpass');
  }

  /** ネット音 */
  net(): void {
    this.noise(0.16, 320, 0.8, 0.25, 'lowpass');
  }

  /** 空振り */
  whoosh(): void {
    this.noise(0.12, 900, 0.7, 0.08, 'bandpass');
  }

  /** ポイント獲得（軽い歓声風） */
  point(): void {
    this.noise(0.9, 1100, 0.4, 0.18, 'bandpass');
    this.tone(660, 0.18, 0.1, 'triangle');
  }

  /** フォルト */
  fault(): void {
    this.tone(220, 0.16, 0.14, 'square');
    this.tone(165, 0.22, 0.12, 'square');
  }

  /** ルーレットの目盛りを通過するカチッ音（終盤ほど音が上がる） */
  rlTick(intensity = 0.5): void {
    this.tone(750 + 650 * intensity, 0.035, 0.045 + 0.07 * intensity, 'square');
  }

  /** 当選ファンファーレ（ご褒美） */
  rlFanfare(): void {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => this.tone(f, 0.32, 0.15, 'triangle', i * 0.11));
    this.tone(1319, 0.5, 0.1, 'triangle', 0.44);
    this.noise(1.1, 1200, 0.4, 0.14, 'bandpass');
  }

  /** 罰ゲーム決定のドラマチックな重低音 */
  rlThud(): void {
    this.tone(110, 0.5, 0.28, 'sawtooth');
    this.tone(82, 0.75, 0.24, 'sawtooth', 0.14);
    this.noise(0.45, 190, 0.8, 0.25, 'lowpass');
  }
}

export const sfx = new Sfx();
