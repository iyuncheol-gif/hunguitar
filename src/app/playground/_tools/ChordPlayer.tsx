"use client";

import { useState } from "react";
import { midiToFreq, strum, pluck, resumeCtx } from "../_audio";
import {
  ROOTS,
  QUALITIES,
  qualityById,
  chordName,
  chordNotes,
  chordVoicing,
  parseChord,
  PITCH,
} from "../_chords";
import { getFingering, type Fingering } from "../_fingerings";

// 줄별 개방현 MIDI: index 0 = 6번줄(저음 E) … 5 = 1번줄(고음 e)
const STRINGS_LOW = [40, 45, 50, 55, 59, 64];
const FRETS = 12;

// ── 실제 운지 폼 다이어그램 ──────────────────────────
function ChordForm({ fing }: { fing: Fingering }) {
  const W = 132;
  const H = 158;
  const padX = 18;
  const topY = 40;
  const rows = 4;
  const stringGap = (W - padX * 2) / 5;
  const fretGap = (H - topY - 16) / rows;
  const sx = (i: number) => padX + i * stringGap;

  const fretted = fing.frets.filter((f): f is number => f !== null && f > 0);
  const maxF = fretted.length ? Math.max(...fretted) : 1;
  const minF = fretted.length ? Math.min(...fretted) : 1;
  const base = maxF <= 4 ? 1 : minF;
  const showNut = base === 1;
  const rowCenterY = (fret: number) => topY + (fret - base + 0.5) * fretGap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-[132px] h-auto">
      {/* 포지션 라벨 */}
      {!showNut && (
        <text x={padX - 8} y={topY + fretGap - 4} textAnchor="end" fontSize="10" fill="#a89f90">
          {base}fr
        </text>
      )}
      {/* nut / 상단선 */}
      {showNut ? (
        <rect x={padX} y={topY - 3} width={W - padX * 2} height={4} rx={1} fill="var(--color-heading)" />
      ) : (
        <line x1={padX} y1={topY} x2={W - padX} y2={topY} stroke="#d9d2c7" strokeWidth={1} />
      )}
      {/* 프렛 라인 */}
      {Array.from({ length: rows }).map((_, r) => (
        <line key={r} x1={padX} y1={topY + (r + 1) * fretGap} x2={W - padX} y2={topY + (r + 1) * fretGap} stroke="#d9d2c7" strokeWidth={1} />
      ))}
      {/* 줄 */}
      {STRINGS_LOW.map((_, i) => (
        <line key={i} x1={sx(i)} y1={topY} x2={sx(i)} y2={H - 16} stroke="#c9c1b4" strokeWidth={1} />
      ))}
      {/* x / o 마커 */}
      {fing.frets.map((f, i) =>
        f === null ? (
          <text key={`m${i}`} x={sx(i)} y={topY - 10} textAnchor="middle" fontSize="11" fill="#a89f90">
            ×
          </text>
        ) : f === 0 ? (
          <circle key={`m${i}`} cx={sx(i)} cy={topY - 13} r="4" fill="none" stroke="#a89f90" strokeWidth={1.3} />
        ) : null
      )}
      {/* 바레 */}
      {fing.barre && (
        <rect
          x={sx(fing.barre.from) - 6}
          y={rowCenterY(fing.barre.fret) - 6}
          width={sx(fing.barre.to) - sx(fing.barre.from) + 12}
          height={12}
          rx={6}
          fill="var(--color-primary)"
        />
      )}
      {/* 운지 점 (바레보다 높은 프렛만 별도 표시) */}
      {fing.frets.map((f, i) => {
        if (f === null || f === 0) return null;
        if (fing.barre && f === fing.barre.fret) return null;
        return <circle key={`d${i}`} cx={sx(i)} cy={rowCenterY(f)} r="6.5" fill="var(--color-primary)" />;
      })}
    </svg>
  );
}

// ── 지판 전체 구성음 위치(폴백) ──────────────────────
function Fretboard({ rootPc, pcs }: { rootPc: number; pcs: Set<number> }) {
  const nutX = 30;
  const fretGap = 36;
  const topPad = 16;
  const stringGap = 20;
  const W = nutX + FRETS * fretGap + 16;
  const H = topPad * 2 + stringGap * 5;
  const stringY = (i: number) => topPad + i * stringGap;
  const STR = [64, 59, 55, 50, 45, 40]; // 고음 e → 저음 E
  const inlays = [3, 5, 7, 9, 12];

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <svg viewBox={`0 0 ${W} ${H + 16}`} className="w-full min-w-[520px] h-auto">
        <rect x={nutX - 3} y={topPad - 4} width={4} height={stringGap * 5 + 8} rx={1} fill="var(--color-heading)" />
        {Array.from({ length: FRETS }).map((_, f) => (
          <line key={`fr${f}`} x1={nutX + (f + 1) * fretGap} y1={topPad - 4} x2={nutX + (f + 1) * fretGap} y2={topPad + stringGap * 5 + 4} stroke="#ddd6c9" strokeWidth={1} />
        ))}
        {inlays.map((f) => (
          <circle key={`in${f}`} cx={nutX + (f - 0.5) * fretGap} cy={H + 4} r={2.4} fill="#c9c1b4" />
        ))}
        {STR.map((_, i) => (
          <line key={`st${i}`} x1={nutX - 14} y1={stringY(i)} x2={W - 8} y2={stringY(i)} stroke="#c9c1b4" strokeWidth={1} />
        ))}
        {STR.map((openMidi, i) =>
          Array.from({ length: FRETS + 1 }).map((_, f) => {
            const pc = (openMidi + f) % 12;
            if (!pcs.has(pc)) return null;
            const x = f === 0 ? nutX - 14 : nutX + (f - 0.5) * fretGap;
            const isRoot = pc === rootPc;
            return (
              <g key={`n${i}-${f}`} className="cursor-pointer" onClick={async () => { await resumeCtx(); pluck(midiToFreq(openMidi + f), 0, 0.7); }}>
                <circle cx={x} cy={stringY(i)} r={8} fill={isRoot ? "var(--color-primary)" : "#fff"} stroke="var(--color-primary)" strokeWidth={isRoot ? 0 : 1.4} />
                <text x={x} y={stringY(i) + 3} textAnchor="middle" fontSize="7.5" fontWeight="600" fill={isRoot ? "#fff" : "var(--color-primary)"}>
                  {PITCH[pc].replace("#", "♯")}
                </text>
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}

export default function ChordPlayer() {
  const [rootPc, setRootPc] = useState(0);
  const [qualityId, setQualityId] = useState("maj");
  const [search, setSearch] = useState("");
  const [flash, setFlash] = useState(false);

  const q = qualityById(qualityId);
  const name = chordName(rootPc, q);
  const notes = chordNotes(rootPc, q);
  const pcs = new Set(notes.map((n) => n.pc));
  const fing = getFingering(rootPc, qualityId);

  const doStrum = (rPc: number, qId: string, up = false) => {
    const f = getFingering(rPc, qId);
    let midis: number[];
    if (f) {
      midis = f.frets
        .map((fr, i) => (fr === null ? null : STRINGS_LOW[i] + fr))
        .filter((m): m is number => m !== null);
    } else {
      midis = chordVoicing(rPc, qualityById(qId));
    }
    strum(midis.map(midiToFreq), up);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 400);
  };

  const play = async (up = false) => {
    await resumeCtx();
    doStrum(rootPc, qualityId, up);
  };

  const selectRoot = async (r: string) => {
    const pc = PITCH.indexOf(r);
    setRootPc(pc);
    setSearch("");
    await resumeCtx();
    doStrum(pc, qualityId);
  };

  const selectQuality = async (id: string) => {
    setQualityId(id);
    setSearch("");
    await resumeCtx();
    doStrum(rootPc, id);
  };

  const onSearch = (v: string) => {
    setSearch(v);
    const parsed = parseChord(v);
    if (parsed) {
      setRootPc(parsed.rootPc);
      setQualityId(parsed.qualityId);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* 검색 */}
      <div className="relative mb-5">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && parseChord(search)) play();
          }}
          placeholder="코드 검색 — 예: C, Am7, F#dim, Gsus4, A9, Cmaj7"
          className="w-full bg-white rounded-full ring-1 ring-black/[0.06] focus:ring-primary/40 outline-none px-5 py-3 text-sm text-heading placeholder:text-muted/60"
        />
      </div>

      {/* 루트 선택 */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-3">
        {ROOTS.map((r) => (
          <button
            key={r}
            onClick={() => selectRoot(r)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
              PITCH[rootPc] === r
                ? "bg-primary text-white"
                : "bg-white ring-1 ring-black/[0.05] text-heading hover:text-primary hover:ring-primary/30"
            }`}
          >
            {r.replace("#", "♯")}
          </button>
        ))}
      </div>

      {/* 코드타입 선택 */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-8">
        {QUALITIES.map((quality) => (
          <button
            key={quality.id}
            onClick={() => selectQuality(quality.id)}
            title={quality.label}
            className={`px-3 h-8 rounded-full text-xs font-medium transition-colors ${
              qualityId === quality.id
                ? "bg-primary text-white"
                : "bg-white ring-1 ring-black/[0.05] text-muted hover:text-primary hover:ring-primary/30"
            }`}
          >
            {quality.suffix === "" ? "maj" : quality.suffix}
          </button>
        ))}
      </div>

      {/* 결과 카드 */}
      <div
        className={`bg-white rounded-2xl ring-1 shadow-sm p-6 md:p-8 transition-all duration-200 ${
          flash ? "ring-primary shadow-lg" : "ring-black/[0.05]"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="font-serif text-4xl font-semibold text-heading">
              {name.replace("#", "♯")}
            </div>
            <div className="text-muted text-xs mt-1">{q.label}</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => play(false)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors shadow-sm"
            >
              ▶ 연주
            </button>
            <button
              onClick={() => play(true)}
              title="업 스트럼"
              className="w-10 h-10 rounded-full bg-white ring-1 ring-black/[0.06] text-heading hover:text-primary hover:ring-primary/30 transition-colors"
            >
              ↑
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start">
          {/* 운지 폼 or 안내 */}
          <div className="flex flex-col items-center">
            {fing ? (
              <>
                <ChordForm fing={fing} />
                <p className="text-[11px] text-muted mt-2">이렇게 잡아요 👆</p>
              </>
            ) : (
              <div className="w-[132px] h-[158px] flex items-center justify-center text-center text-[11px] text-muted bg-surface rounded-xl px-3">
                대표 운지 폼은 준비 중이에요. 아래 지판에서 구성음 위치를 확인하세요.
              </div>
            )}
          </div>

          {/* 구성음 */}
          <div>
            <p className="text-[11px] text-muted mb-2">구성음 (음을 누르면 소리나요)</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {notes.map((n, i) => (
                <button
                  key={i}
                  onClick={async () => {
                    await resumeCtx();
                    pluck(midiToFreq(48 + n.pc + (n.label === "9" ? 12 : 0)), 0, 0.7);
                  }}
                  className="flex flex-col items-center px-4 py-2 rounded-xl bg-surface hover:bg-primary/5 transition-colors"
                >
                  <span className="font-serif text-lg font-semibold text-heading">
                    {n.name.replace("#", "♯")}
                  </span>
                  <span className="text-[10px] text-primary/70 mt-0.5">{n.label}</span>
                </button>
              ))}
            </div>

            {/* 폼이 없을 때만 지판 전체 위치 지도 */}
            {!fing && (
              <div>
                <p className="text-[11px] text-muted mb-2">
                  지판 위 구성음 위치 ·{" "}
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary align-middle" /> 루트
                </p>
                <Fretboard rootPc={rootPc} pcs={pcs} />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-muted text-xs text-center mt-5">
        루트(C~B)와 코드타입을 고르거나 검색창에 직접 입력하세요. 자주 쓰는 코드는
        운지 폼을, 나머지는 구성음 위치를 보여줍니다. 🔊
      </p>
    </div>
  );
}
