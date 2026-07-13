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
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={close}
      />

      {/* Card */}
      <div className="relative w-full max-w-md bg-surface rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* 상단 워터마크 심볼 */}
        <div className="pt-9 pb-2 flex justify-center">
          <Image
            src="/assets/img/common/symbol.png"
            alt=""
            width={190}
            height={324}
            className="h-16 w-auto opacity-90"
          />
        </div>

        <div className="px-8 pb-8 text-center">
          <p className="text-primary text-[11px] font-semibold tracking-[0.3em] uppercase mb-3">
            Notice
          </p>
          <h2 className="font-serif text-2xl font-semibold text-heading leading-snug mb-4">
            새 이름, 새 공간에서
            <br />
            만나요
          </h2>

          <p className="text-muted text-sm leading-relaxed mb-5">
            <span className="text-heading font-medium">
              훈:어쿠스틱기타하우스
            </span>
            가{" "}
            <span className="text-primary font-semibold">분당기타&보컬</span>로
            새롭게 태어났습니다.
            <br />
            더 넓고 쾌적한 공간으로 이전했어요.
          </p>

          {/* 새 주소 */}
          <div className="bg-white rounded-2xl ring-1 ring-black/[0.05] px-5 py-4 mb-6 text-left">
            <p className="text-[11px] text-muted mb-1">새로운 위치</p>
            <p className="text-heading text-sm font-semibold leading-snug">
              경기 성남시 분당구 느티로 65, 4층 403호
            </p>
            <p className="text-muted text-xs mt-1">분당선 정자역 인근</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5">
            <a
              href="#contact"
              onClick={close}
              className="flex-1 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              오시는 길 보기
            </a>
            <button
              onClick={close}
              className="flex-1 px-4 py-3 bg-white text-heading text-sm font-semibold rounded-full ring-1 ring-black/[0.08] hover:ring-primary/40 hover:text-primary transition-all"
            >
              닫기
            </button>
          </div>

          <button
            onClick={hideToday}
            className="mt-4 text-xs text-muted/80 hover:text-muted underline underline-offset-2 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
