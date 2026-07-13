"use client";

import { useEffect, useRef, useState } from "react";
import { getCtx, resumeCtx, click } from "../_audio";

export default function Metronome() {
  const [bpm, setBpm] = useState(90);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [running, setRunning] = useState(false);
  const [displayBeat, setDisplayBeat] = useState(-1);

  const bpmRef = useRef(bpm);
  const bparRef = useRef(beatsPerBar);
  const nextNoteRef = useRef(0);
  const beatRef = useRef(0);
  const queueRef = useRef<{ time: number; beat: number }[]>([]);
  const intervalRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  bpmRef.current = bpm;
  bparRef.current = beatsPerBar;

  const stop = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    intervalRef.current = null;
    rafRef.current = null;
    queueRef.current = [];
    setRunning(false);
    setDisplayBeat(-1);
  };

  useEffect(() => () => stop(), []);

  const start = async () => {
    const ctx = await resumeCtx();
    if (!ctx) return;
    beatRef.current = 0;
    nextNoteRef.current = ctx.currentTime + 0.06;
    queueRef.current = [];

    intervalRef.current = window.setInterval(() => {
      const c = getCtx();
      if (!c) return;
      while (nextNoteRef.current < c.currentTime + 0.12) {
        const beat = beatRef.current;
        click(c, nextNoteRef.current, beat === 0);
        queueRef.current.push({ time: nextNoteRef.current, beat });
        nextNoteRef.current += 60 / bpmRef.current;
        beatRef.current = (beat + 1) % bparRef.current;
      }
    }, 25);

    const draw = () => {
      const c = getCtx();
      if (c) {
        while (queueRef.current.length && queueRef.current[0].time <= c.currentTime) {
          setDisplayBeat(queueRef.current.shift()!.beat);
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    setRunning(true);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-muted text-sm mb-8">
        박자에 맞춰 연습해 보세요. 첫 박은 강하게 울려요. 🥁
      </p>

      {/* BPM */}
      <div className="mb-1 font-serif text-6xl font-semibold text-heading tabular-nums">
        {bpm}
      </div>
      <div className="text-muted text-xs mb-6 tracking-[0.2em]">BPM</div>

      {/* Beat dots */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {Array.from({ length: beatsPerBar }).map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-100 ${
              displayBeat === i
                ? i === 0
                  ? "w-5 h-5 bg-primary"
                  : "w-5 h-5 bg-primary/70"
                : "w-3.5 h-3.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Slider */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setBpm((b) => Math.max(40, b - 1))}
          className="w-9 h-9 rounded-full bg-white ring-1 ring-black/[0.06] text-heading hover:ring-primary/40 shrink-0"
        >
          −
        </button>
        <input
          type="range"
          min={40}
          max={240}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="flex-1 accent-[color:var(--color-primary)]"
        />
        <button
          onClick={() => setBpm((b) => Math.min(240, b + 1))}
          className="w-9 h-9 rounded-full bg-white ring-1 ring-black/[0.06] text-heading hover:ring-primary/40 shrink-0"
        >
          +
        </button>
      </div>

      {/* Beats per bar */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-muted text-xs mr-1">박자</span>
        {[2, 3, 4, 6].map((n) => (
          <button
            key={n}
            onClick={() => setBeatsPerBar(n)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              beatsPerBar === n
                ? "bg-primary text-white"
                : "bg-white ring-1 ring-black/[0.06] text-muted hover:text-primary"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        onClick={running ? stop : start}
        className={`px-10 py-3.5 rounded-full font-semibold transition-colors shadow-sm ${
          running
            ? "bg-heading text-white hover:bg-heading/90"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {running ? "■ 정지" : "▶ 시작"}
      </button>
    </div>
  );
}
