"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MenuIcon } from "@/icons";
import { navItems, locationInfo } from "@/constants";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";
  // 섹션(해시) 링크는 홈이 아닐 때 "/#..." 로 보정해 어디서든 홈으로 이동
  const sectionHref = (h: string) => (isHome ? h : `/${h}`);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // 현재 섹션 감지
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 모바일 메뉴 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg py-2"
            : "bg-linear-to-b from-black/35 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={isHome ? "#home" : "/"}
            className={`transition-opacity duration-300 ${
              isMenuOpen ? "lg:opacity-100 opacity-0" : "opacity-100"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Image
                src={
                  isScrolled
                    ? "/assets/img/common/symbol.png"
                    : "/assets/img/common/symbol_white.png"
                }
                alt="분당기타&보컬 심볼"
                width={190}
                height={324}
                className="h-11 w-auto transition-all duration-300"
                priority
              />
              <span className="flex flex-col justify-center gap-[3px]">
                <Image
                  src={
                    isScrolled
                      ? "/assets/img/common/wordmark_en.png"
                      : "/assets/img/common/wordmark_en_white.png"
                  }
                  alt="Guitar & Vocal"
                  width={446}
                  height={94}
                  className="h-[22px] w-auto transition-all duration-300"
                  priority
                />
                <Image
                  src={
                    isScrolled
                      ? "/assets/img/common/wordmark_ko.png"
                      : "/assets/img/common/wordmark_ko_white.png"
                  }
                  alt="분당 기타 & 보컬 학원"
                  width={267}
                  height={43}
                  className="h-[15px] w-auto transition-all duration-300"
                  priority
                />
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.label}
                  href={sectionHref(item.href)}
                  className={`relative px-2.5 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-primary"
                      : isScrolled
                      ? "text-heading hover:text-primary focus:text-primary"
                      : "text-white/90 hover:text-primary focus:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}

            {/* Playground (별도 페이지) */}
            <Link
              href="/playground"
              className={`ml-1.5 inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-full ring-1 transition-colors duration-300 ${
                pathname === "/playground"
                  ? "bg-primary text-white ring-primary"
                  : isScrolled
                  ? "text-primary ring-primary/30 hover:bg-primary/5"
                  : "text-white ring-white/40 hover:bg-white/10"
              }`}
            >
              🎸 PLAY
            </Link>

            {/* CTA Button */}
            <a
              href={`tel:${locationInfo.phone}`}
              className="ml-1.5 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              상담문의
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 ${
              isMenuOpen
                ? "bg-gray-100"
                : isScrolled
                ? "bg-gray-100 hover:bg-gray-200"
                : "bg-white/80 hover:bg-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <CloseIcon className="w-5 h-5 text-heading" />
            ) : (
              <MenuIcon className="w-5 h-5 text-heading" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-40 w-80 max-w-[85vw] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Navigation Links */}
          <div className="flex-1 space-y-1">
            {navItems.map((item, index) => {
              const isActive = isHome && activeSection === item.href.replace("#", "");
              return (
                <Link
                  key={item.label}
                  href={sectionHref(item.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-heading hover:bg-gray-100"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/playground"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                pathname === "/playground"
                  ? "bg-primary/10 text-primary"
                  : "text-primary hover:bg-primary/5"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              🎸 PLAYGROUND
            </Link>
          </div>

          {/* Mobile CTA */}
          <div className="pt-6 border-t border-gray-100">
            <a
              href={`tel:${locationInfo.phone}`}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>
              {locationInfo.phone}
            </a>
            <p className="text-center text-muted text-sm mt-3">
              {locationInfo.hours}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
