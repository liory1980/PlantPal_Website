export class GardenAudio {
  private context: AudioContext | null = null;
  private output: GainNode | null = null;
  muted = false;
  unlock() {
    try {
      if (!this.context) { this.context = new AudioContext(); this.output = this.context.createGain(); this.output.gain.value = this.muted ? 0 : .16; this.output.connect(this.context.destination); }
      if (this.context.state === 'suspended') void this.context.resume().catch(() => {});
    } catch { /* Gameplay remains available without audio support. */ }
  }
  setMuted(muted: boolean) { this.muted = muted; if (this.output && this.context) this.output.gain.setTargetAtTime(muted ? 0 : .16, this.context.currentTime, .02); }
  play(kind: 'collect' | 'hit' | 'complete' | 'won' | 'lost') {
    const context = this.context;
    if (!context || !this.output || this.muted || context.state !== 'running') return;
    const notes = kind === 'collect' ? [880, 1174, 1568] : kind === 'hit' ? [180, 130] : kind === 'lost' ? [392, 330, 262] : [523, 659, 784, 1047];
    notes.forEach((frequency, i) => {
      const oscillator = context.createOscillator(); const gain = context.createGain();
      oscillator.type = kind === 'hit' ? 'triangle' : 'sine'; oscillator.frequency.value = frequency;
      const start = context.currentTime + i * .065;
      gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(.65, start + .008); gain.gain.exponentialRampToValueAtTime(.0001, start + .24);
      oscillator.connect(gain); gain.connect(this.output!); oscillator.start(start); oscillator.stop(start + .25);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    });
  }
  dispose() { if (this.context) void this.context.close().catch(() => {}); this.context = null; this.output = null; }
}
