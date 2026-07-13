"use client";

import Link from "next/link";
import { useState } from "react";
import ChordPlayer from "./_tools/ChordPlayer";
import Tuner from "./_tools/Tuner";
import Metronome from "./_tools/Metronome";
import VocalRange from "./_tools/VocalRange";

const TABS = [
  { id: "chord", icon: "🎸", label: "코드 연주기", en: "Chords" },
  { id: "tuner", icon: "🎚️", label: "조율기", en: "Tuner" },
  { id: "metronome", icon: "🥁", label: "메트로놈", en: "Metronome" },
  { id: "vocal", icon: "🎤", label: "음역대", en: "Vocal Range" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function PlaygroundPage() {
  const [tab, setTab] = useState<TabId>("chord");

  return (
    <section className="min-h-screen bg-surface pt-28 md:pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/#home"
            className="inline-flex items-center gap-1 text-muted text-sm hover:text-primary transition-colors mb-4"
          >
            ← 홈으로
          </Link>
          <p className="text-primary/80 text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            Music Playground
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-heading uppercase tracking-wide mb-3">
            Playground
          </h1>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">
            직접 코드를 눌러보고, 조율하고, 음역대까지 — 미니 뮤직 랩
          </p>
          <p className="text-[11px] text-muted/70 mt-2">
            🔊 소리가 재생됩니다 · 기기 볼륨을 켜주세요
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                tab === t.id
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white text-muted ring-1 ring-black/[0.05] hover:text-primary hover:ring-primary/30"
              }`}
            >
              <span className="text-base leading-none">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Active tool */}
        <div className="animate-fade-in-up">
          {tab === "chord" && <ChordPlayer />}
          {tab === "tuner" && <Tuner />}
          {tab === "metronome" && <Metronome />}
          {tab === "vocal" && <VocalRange />}
        </div>
      </div>
    </section>
  );
}
