// 브라우저 Web Audio 기반 사운드 엔진 (오디오 에셋 불필요)

type AudioCtor = typeof AudioContext;

let ctx: AudioContext | null = null;

export function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const w = window as unknown as { AudioContext?: AudioCtor; webkitAudioContext?: AudioCtor };
    const Ctor = w.AudioContext || w.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

// iOS/Chrome: 사용자 제스처 후 반드시 resume
export async function resumeCtx(): Promise<AudioContext | null> {
  const c = getCtx();
  if (c && c.state === "suspended") {
    try {
      await c.resume();
    } catch {
      /* ignore */
    }
  }
  return c;
}

// ── 음이름/주파수 변환 ──────────────────────────────
export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export type NoteInfo = {
  midi: number;
  name: string;
  octave: number;
  cents: number; // -50 ~ +50
};

export function freqToNote(freq: number): NoteInfo {
  const midiFloat = 69 + 12 * Math.log2(freq / 440);
  const midi = Math.round(midiFloat);
  const cents = Math.round((midiFloat - midi) * 100);
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return { midi, name, octave, cents };
}

// ── Karplus-Strong 발현음(뜯는 기타) 합성 ──────────
function makePluckBuffer(
  c: AudioContext,
  freq: number,
  seconds: number,
  decay: number
): AudioBuffer {
  const sr = c.sampleRate;
  const N = Math.max(2, Math.round(sr / freq));
  const length = Math.floor(sr * seconds);
  const buffer = c.createBuffer(1, length, sr);
  const out = buffer.getChannelData(0);
  const ring = new Float32Array(N);
  for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
  let idx = 0;
  for (let i = 0; i < length; i++) {
    const cur = ring[idx];
    const nxt = ring[(idx + 1) % N];
    out[i] = cur;
    ring[idx] = decay * 0.5 * (cur + nxt);
    idx = (idx + 1) % N;
  }
  return buffer;
}

export function pluck(
  freq: number,
  when = 0,
  gain = 0.7,
  seconds = 1.8,
  decay = 0.996
): void {
  const c = getCtx();
  if (!c) return;
  const buffer = makePluckBuffer(c, freq, seconds, decay);
  const src = c.createBufferSource();
  src.buffer = buffer;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = Math.min(7000, freq * 10);
  const g = c.createGain();
  g.gain.value = gain;
  src.connect(lp);
  lp.connect(g);
  g.connect(c.destination);
  src.start(c.currentTime + when);
}

// 여러 음을 살짝 시차를 두고 = 스트럼
export function strum(freqs: number[], up = false, gain = 0.5): void {
  const order = up ? [...freqs].reverse() : freqs;
  order.forEach((f, i) => pluck(f, i * 0.03, gain));
}

// ── 사인/삼각파 톤 (기준음·메트로놈) ────────────────
export function tone(
  freq: number,
  seconds = 1.6,
  type: OscillatorType = "triangle",
  gain = 0.22
): () => void {
  const c = getCtx();
  if (!c) return () => {};
  const o = c.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  const g = c.createGain();
  const t = c.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.02);
  g.gain.setValueAtTime(gain, t + Math.max(0.1, seconds - 0.12));
  g.gain.linearRampToValueAtTime(0, t + seconds);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + seconds + 0.02);
  return () => {
    try {
      o.stop();
    } catch {
      /* ignore */
    }
  };
}

// 메트로놈 클릭(특정 시각 예약)
export function click(c: AudioContext, time: number, accent: boolean): void {
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.value = accent ? 1500 : 900;
  g.gain.setValueAtTime(accent ? 0.5 : 0.32, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
  o.connect(g);
  g.connect(c.destination);
  o.start(time);
  o.stop(time + 0.06);
}

// ── 마이크 + 음정 감지(autocorrelation) ─────────────
export async function getMicAnalyser(): Promise<{
  analyser: AnalyserNode;
  stream: MediaStream;
  ctx: AudioContext;
}> {
  const c = await resumeCtx();
  if (!c) throw new Error("no-audio");
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false,
    },
  });
  const src = c.createMediaStreamSource(stream);
  const analyser = c.createAnalyser();
  analyser.fftSize = 2048;
  src.connect(analyser);
  return { analyser, stream, ctx: c };
}

export function autoCorrelate(
  buf: Float32Array,
  sampleRate: number
): number | null {
  const SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return null; // 너무 조용함

  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < thres) {
      r1 = i;
      break;
    }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < thres) {
      r2 = SIZE - i;
      break;
    }
  }
  const trimmed = buf.slice(r1, r2);
  const n = trimmed.length;
  const c = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      c[i] += trimmed[j] * trimmed[j + i];
    }
  }
  let d = 0;
  while (d < n - 1 && c[d] > c[d + 1]) d++;
  let maxval = -1;
  let maxpos = -1;
  for (let i = d; i < n; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;
  if (T0 <= 0) return null;
  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);
  const freq = sampleRate / T0;
  if (freq < 40 || freq > 2000) return null;
  return freq;
}
