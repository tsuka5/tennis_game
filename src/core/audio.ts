/**
 * Minimal sound effects (hit / score) per Q-7 (sound is minimal).
 * iOS Safari blocks audio until a user gesture, so unlock() must be called from
 * the first pointer event. See docs/specs/09-open-questions.md Q-7 / Q-9.
 */
class Sfx {
  private ctx: AudioContext | null = null;
  enabled = true;

  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) {
      this.enabled = false;
      return;
    }
    this.ctx = new Ctor();
  }

  private beep(freq: number, durMs: number, gain = 0.08): void {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'triangle';
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + durMs / 1000);
    osc.connect(g).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + durMs / 1000);
  }

  hit(): void {
    this.beep(420, 70);
  }
  smash(): void {
    this.beep(620, 90, 0.1);
  }
  score(): void {
    this.beep(300, 220, 0.09);
  }
}

export const sfx = new Sfx();
