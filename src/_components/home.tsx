import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <header
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center text-white pt-40 pb-20 overflow-hidden"
    >
      {/* Background Image (slow ken-burns zoom) */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/assets/img/home/bg.jpg"
          alt="분당기타&보컬 스튜디오"
          fill
          priority
          className="object-cover hero-zoom"
        />
      </div>

      {/* Overlays: warm gradient + radial vignette for depth/focus */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[rgba(43,37,32,0.30)] via-[rgba(43,37,32,0.42)] to-[rgba(43,37,32,0.82)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(28,23,18,0.55)_100%)]" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          <Image
            src="/assets/img/common/symbol_white.png"
            alt="분당기타&보컬 심볼"
            width={190}
            height={324}
            priority
            className="hero-reveal h-20 md:h-24 w-auto mb-6 [filter:drop-shadow(0_4px_18px_rgba(0,0,0,0.5))]"
            style={{ animationDelay: "0.05s" }}
          />
          <h1
            className="hero-reveal font-serif text-5xl md:text-6xl xl:text-7xl font-semibold mb-4"
            style={{ animationDelay: "0.2s" }}
          >
            Guitar &amp; Vocal
          </h1>

          {/* Tagline with decorative flanking lines */}
          <div
            className="hero-reveal flex items-center gap-3 md:gap-4 mb-7"
            style={{ animationDelay: "0.35s" }}
          >
            <span className="h-px w-8 md:w-14 bg-linear-to-r from-transparent to-white/50" />
            <p className="tracking-[0.35em] text-sm md:text-base text-white/90 whitespace-nowrap">
              분당 기타 &amp; 보컬 학원
            </p>
            <span className="h-px w-8 md:w-14 bg-linear-to-l from-transparent to-white/50" />
          </div>

          <p
            className="hero-reveal text-base md:text-lg mb-9 max-w-2xl text-white/90 leading-relaxed"
            style={{ animationDelay: "0.5s" }}
          >
            기타부터 보컬까지, 밝고 쾌적한 방음 스튜디오에서 전문 강사의 1:1 맞춤
            레슨으로 나만의 음악을 시작하세요!
          </p>

          <Link
            href="#services"
            className="hero-reveal group relative inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-9 rounded-full transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(169,117,69,0.7)] hover:shadow-[0_14px_40px_-8px_rgba(169,117,69,0.85)] hover:-translate-y-0.5 [text-shadow:none]"
            style={{ animationDelay: "0.65s" }}
          >
            레슨 둘러보기
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-reveal absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animationDelay: "1s" }}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/60">
          SCROLL
        </span>
        <span className="relative block w-px h-9 bg-white/20 overflow-hidden">
          <span className="hero-scroll-dot absolute top-0 left-0 block w-px h-3 bg-white/90" />
        </span>
      </div>
    </header>
  );
}
