"use client";

import { useEffect, useRef, useState } from "react";
import {
  midiToFreq,
  tone,
  resumeCtx,
  getMicAnalyser,
  autoCorrelate,
  freqToNote,
} from "../_audio";

const STRINGS = [
  { label: "6", note: "E2", midi: 40 },
  { label: "5", note: "A2", midi: 45 },
  { label: "4", note: "D3", midi: 50 },
  { label: "3", note: "G3", midi: 55 },
  { label: "2", note: "B3", midi: 59 },
  { label: "1", note: "E4", midi: 64 },
].map((s) => ({ ...s, freq: midiToFreq(s.midi) }));

type Detected = {
  string: (typeof STRINGS)[number];
  cents: number;
  note: string;
} | null;

export default function Tuner() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detected, setDetected] = useState<Detected>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setMicOn(false);
    setDetected(null);
  };

  useEffect(() => () => stopMic(), []);

  const playReference = async (freq: number, note: string) => {
    await resumeCtx();
    setPlaying(note);
    tone(freq, 2.2, "triangle", 0.25);
    window.setTimeout(() => setPlaying((p) => (p === note ? null : p)), 2200);
  };

  const startMic = async () => {
    setError(null);
    try {
      const { analyser } = await getMicAnalyser();
      setMicOn(true);
      const buf = new Float32Array(analyser.fftSize);
      const loop = () => {
        analyser.getFloatTimeDomainData(buf);
        const freq = autoCorrelate(buf, analyser.context.sampleRate);
        if (freq) {
          // 6개 개방현 중 가장 가까운 줄
          let best = STRINGS[0];
          let bestCents = Infinity;
          for (const s of STRINGS) {
            const cents = 1200 * Math.log2(freq / s.freq);
            if (Math.abs(cents) < Math.abs(bestCents)) {
              bestCents = cents;
              best = s;
            }
          }
          const n = freqToNote(freq);
          setDetected({
            string: best,
            cents: Math.max(-50, Math.min(50, Math.round(bestCents))),
            note: `${n.name}${n.octave}`,
          });
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch {
      setError(
        "마이크를 사용할 수 없어요. 브라우저에서 마이크 권한을 허용했는지 확인해 주세요."
      );
      setMicOn(false);
    }
  };

  const cents = detected?.cents ?? 0;
  const inTune = detected && Math.abs(cents) <= 5;

  return (
    <div className="max-w-xl mx-auto">
      {/* 기준음 재생 */}
      <p className="text-muted text-sm text-center mb-5">
        각 줄의 <b className="text-heading">기준음</b>을 듣고 귀로 맞춰보세요.
      </p>
      <div className="grid grid-cols-6 gap-2 mb-10">
        {STRINGS.map((s) => (
          <button
            key={s.note}
            onClick={() => playReference(s.freq, s.note)}
            className={`flex flex-col items-center py-4 rounded-xl ring-1 transition-all duration-200 ${
              playing === s.note
                ? "bg-primary text-white ring-primary shadow-md"
                : "bg-white ring-black/[0.05] hover:ring-primary/40 hover:-translate-y-0.5 shadow-sm"
            }`}
          >
            <span
              className={`font-serif text-lg font-semibold ${
                playing === s.note ? "text-white" : "text-heading"
              }`}
            >
              {s.note[0]}
            </span>
            <span
              className={`text-[10px] mt-0.5 ${
                playing === s.note ? "text-white/80" : "text-muted"
              }`}
            >
              {s.label}번줄
            </span>
          </button>
        ))}
      </div>

      {/* 마이크 실시간 조율 */}
      <div className="bg-white rounded-2xl ring-1 ring-black/[0.05] shadow-sm p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="font-serif text-lg font-semibold text-heading">
            실시간 조율
          </span>
          <span className="text-[11px] text-muted bg-surface px-2 py-0.5 rounded-full">
            마이크
          </span>
        </div>

        {!micOn ? (
          <>
            <button
              onClick={startMic}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm"
            >
              🎤 마이크로 조율 시작
            </button>
            {error && (
              <p className="text-xs text-red-500/80 mt-3">{error}</p>
            )}
            <p className="text-[11px] text-muted mt-3">
              현을 하나씩 튕기면 어느 줄인지, 얼마나 맞았는지 알려드려요.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl font-serif font-semibold text-heading mb-1">
              {detected ? detected.note : "—"}
            </div>
            <p className="text-sm text-muted mb-5">
              {detected ? `${detected.string.label}번줄 (${detected.string.note})` : "현을 튕겨보세요"}
            </p>

            {/* 니들 미터 */}
            <div className="relative h-10 mx-auto max-w-sm mb-2">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-heading/40 -translate-x-1/2 -translate-y-1/2" />
              <div
                className={`absolute top-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ${
                  inTune ? "bg-[#03C75A]" : "bg-primary"
                }`}
                style={{ left: `calc(50% + ${cents}%)` }}
              />
            </div>
            <p
              className={`text-sm font-semibold mb-5 ${
                inTune ? "text-[#03C75A]" : "text-primary"
              }`}
            >
              {!detected
                ? " "
                : inTune
                ? "✓ 완벽해요!"
                : cents < 0
                ? `▼ 조금 낮아요 (${cents})`
                : `▲ 조금 높아요 (+${cents})`}
            </p>

            <button
              onClick={stopMic}
              className="px-5 py-2 text-sm text-muted border border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              마이크 끄기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
