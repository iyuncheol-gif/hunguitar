"use client";

import { useEffect, useRef, useState } from "react";
import { getMicAnalyser, autoCorrelate, freqToNote, NOTE_NAMES } from "../_audio";

const LOW = 36; // C2
const HIGH = 84; // C6

function midiName(midi: number) {
  return `${NOTE_NAMES[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

export default function VocalRange() {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState<string>("—");
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const recentRef = useRef<number[]>([]);

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setRunning(false);
    setLive("—");
  };

  useEffect(() => () => stop(), []);

  const reset = () => {
    setLow(null);
    setHigh(null);
    recentRef.current = [];
  };

  const start = async () => {
    setError(null);
    reset();
    try {
      const { analyser, stream } = await getMicAnalyser();
      streamRef.current = stream;
      setRunning(true);
      const buf = new Float32Array(analyser.fftSize);
      const loop = () => {
        analyser.getFloatTimeDomainData(buf);
        const freq = autoCorrelate(buf, analyser.context.sampleRate);
        if (freq) {
          const n = freqToNote(freq);
          setLive(`${n.name}${n.octave}`);
          // 연속 4프레임 같은 음 → 안정된 음으로 등록
          const r = recentRef.current;
          r.push(n.midi);
          if (r.length > 5) r.shift();
          if (r.length >= 4 && r.every((m) => m === n.midi)) {
            if (n.midi >= LOW && n.midi <= HIGH) {
              setLow((v) => (v === null ? n.midi : Math.min(v, n.midi)));
              setHigh((v) => (v === null ? n.midi : Math.max(v, n.midi)));
            }
          }
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch {
      setError(
        "마이크를 사용할 수 없어요. 브라우저에서 마이크 권한을 허용했는지 확인해 주세요."
      );
      setRunning(false);
    }
  };

  const span = low !== null && high !== null ? high - low : 0;
  const octaves = (span / 12).toFixed(1);
  const pct = (midi: number) => ((midi - LOW) / (HIGH - LOW)) * 100;

  return (
    <div className="max-w-xl mx-auto text-center">
      <p className="text-muted text-sm mb-8">
        낮은 음부터 높은 음까지 <b className="text-heading">&ldquo;아~&rdquo;</b> 하고
        길게 불러보세요. 당신의 음역대를 측정합니다. 🎤
      </p>

      {/* 현재 음 */}
      <div className="font-serif text-6xl font-semibold text-heading mb-1">
        {running ? live : "🎵"}
      </div>
      <div className="text-muted text-xs mb-8 tracking-[0.2em]">
        {running ? "현재 음" : "준비됐어요"}
      </div>

      {/* 음역대 바 */}
      <div className="relative h-4 bg-surface rounded-full mb-3 ring-1 ring-black/[0.04]">
        {low !== null && high !== null && (
          <div
            className="absolute top-0 bottom-0 bg-linear-to-r from-primary/70 to-primary rounded-full"
            style={{ left: `${pct(low)}%`, width: `${Math.max(2, pct(high) - pct(low))}%` }}
          />
        )}
      </div>
      <div className="flex justify-between text-[10px] text-muted mb-8">
        <span>C2</span>
        <span>C3</span>
        <span>C4</span>
        <span>C5</span>
        <span>C6</span>
      </div>

      {/* 결과 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-xl ring-1 ring-black/[0.05] py-4">
          <div className="text-xs text-muted mb-1">최저음</div>
          <div className="font-serif text-2xl font-semibold text-heading">
            {low !== null ? midiName(low) : "—"}
          </div>
        </div>
        <div className="bg-white rounded-xl ring-1 ring-black/[0.05] py-4">
          <div className="text-xs text-muted mb-1">음역</div>
          <div className="font-serif text-2xl font-semibold text-primary">
            {span > 0 ? `${octaves}옥` : "—"}
          </div>
        </div>
        <div className="bg-white rounded-xl ring-1 ring-black/[0.05] py-4">
          <div className="text-xs text-muted mb-1">최고음</div>
          <div className="font-serif text-2xl font-semibold text-heading">
            {high !== null ? midiName(high) : "—"}
          </div>
        </div>
      </div>

      {!running ? (
        <>
          <button
            onClick={start}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm"
          >
            🎤 음역대 측정 시작
          </button>
          {error && <p className="text-xs text-red-500/80 mt-3">{error}</p>}
        </>
      ) : (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2 text-sm text-muted border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            다시 측정
          </button>
          <button
            onClick={stop}
            className="px-5 py-2 text-sm bg-heading text-white rounded-full hover:bg-heading/90 transition-colors"
          >
            측정 종료
          </button>
        </div>
      )}
    </div>
  );
}
