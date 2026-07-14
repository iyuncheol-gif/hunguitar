"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "notice-rebrand-hide-until";

export default function NoticeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const until = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (Date.now() > until) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  // 열려 있는 동안 배경 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const hideToday = () => {
    try {
      const until = new Date();
      until.setHours(24, 0, 0, 0); // 오늘 자정까지
      localStorage.setItem(STORAGE_KEY, String(until.getTime()));
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="분당기타앤보컬 이전 안내"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1c1712]/70" onClick={close} />

      {/* Ticket */}
      <div className="relative w-full max-w-sm -rotate-1 animate-fade-in-up">
        <div className="relative bg-[#fdfbf7] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* 상단 티켓 헤더 스트립 */}
          <div className="flex items-center justify-between px-6 py-3 bg-heading text-white/90">
            <span className="text-[10px] tracking-[0.35em] font-semibold">
              MOVING NOTICE
            </span>
            <span className="text-[10px] tracking-[0.2em] text-white/50">
              № 2026-01
            </span>
          </div>

          {/* 스탬프 */}
          <div className="absolute top-14 right-4 rotate-12 select-none pointer-events-none">
            <div className="w-[86px] h-[86px] rounded-full border-2 border-primary/70 flex items-center justify-center">
              <div className="w-[72px] h-[72px] rounded-full border border-primary/50 flex flex-col items-center justify-center text-primary/80">
                <span className="text-[9px] tracking-[0.2em] font-bold">NEW</span>
                <span className="text-[13px] tracking-[0.12em] font-serif font-bold leading-tight">
                  OPEN
                </span>
                <span className="text-[8px] tracking-[0.15em]">2026</span>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="px-7 pt-7 pb-5">
            <Image
              src="/assets/img/common/symbol.png"
              alt=""
              width={190}
              height={324}
              className="h-11 w-auto mb-4 opacity-80"
            />
            <p className="text-muted text-[13px] mb-1.5">
              <span className="line-through decoration-primary/50 decoration-[1.5px]">
                훈:어쿠스틱기타하우스
              </span>
              <span className="mx-2 text-primary">→</span>
            </p>
            <h2 className="font-serif text-[30px] font-semibold text-heading leading-tight mb-3">
              분당기타<span className="text-primary">&</span>보컬
            </h2>
            <p className="text-muted text-[13px] leading-relaxed">
              새 이름, 더 넓어진 공간으로
              <br />
              여러분을 초대합니다.
            </p>
          </div>

          {/* 절취선 */}
          <div className="relative flex items-center px-5" aria-hidden>
            <span className="absolute -left-3 w-6 h-6 rounded-full bg-[#1c1712]/70" />
            <span className="absolute -right-3 w-6 h-6 rounded-full bg-[#1c1712]/70" />
            <span className="w-full border-t-2 border-dashed border-heading/15" />
          </div>

          {/* 티켓 스텁 — 위치/시간 + 바코드 */}
          <div className="px-7 pt-5 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] tracking-[0.25em] text-primary font-bold mb-1">
                  LOCATION
                </p>
                <p className="text-heading text-[13px] font-semibold leading-snug">
                  분당구 느티로 65, 4층 403호
                </p>
                <p className="text-muted text-[11px] mt-0.5">
                  정자역 6번 출구에서 480m
                </p>
                <p className="text-[9px] tracking-[0.25em] text-primary font-bold mt-3 mb-1">
                  OPEN
                </p>
                <p className="text-heading text-[13px] font-semibold">
                  평일 10:00 – 21:00
                </p>
              </div>
              {/* 바코드 */}
              <div className="flex items-end gap-[3px] h-[72px] shrink-0 pt-1" aria-hidden>
                {[3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2].map((w, i) => (
                  <span
                    key={i}
                    className="bg-heading/80"
                    style={{ width: w, height: "100%" }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 mt-6">
              <a
                href="/#contact"
                onClick={close}
                className="flex-1 text-center px-4 py-2.5 bg-primary text-white text-[13px] font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                오시는 길 보기
              </a>
              <button
                onClick={close}
                className="flex-1 px-4 py-2.5 bg-transparent text-heading text-[13px] font-semibold rounded-lg border border-heading/15 hover:border-primary/40 hover:text-primary transition-all"
              >
                닫기
              </button>
            </div>
            <button
              onClick={hideToday}
              className="block mx-auto mt-3.5 text-[11px] text-muted/70 hover:text-muted underline underline-offset-2 transition-colors"
            >
              오늘 하루 보지 않기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
