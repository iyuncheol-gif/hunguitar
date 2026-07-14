import Image from "next/image";
import Link from "next/link";
import { locationInfo } from "@/constants";

// ── SEO 랜딩 페이지 공용 컴포넌트 ─────────────────────

export const LANDING_PAGES = [
  { slug: "/lessons/adult-beginner", label: "성인 초보 기타 레슨" },
  { slug: "/lessons/office-worker", label: "직장인 기타 레슨" },
  { slug: "/lessons/fingerstyle", label: "핑거스타일 기타 레슨" },
  { slug: "/pricing", label: "수강료·수업 방식" },
  { slug: "/trial", label: "체험레슨·상담" },
] as const;

export function LandingHero({
  badge,
  title,
  desc,
  image,
  imageAlt,
}: {
  badge: string;
  title: React.ReactNode;
  desc: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover -z-20"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[rgba(28,23,18,0.72)] via-[rgba(28,23,18,0.6)] to-[rgba(28,23,18,0.78)]" />
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          {badge}
        </p>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-snug mb-5">
          {title}
        </h1>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {desc}
        </p>
      </div>
    </section>
  );
}

export function Section({
  label,
  title,
  children,
  surface = false,
}: {
  label?: string;
  title: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section className={`py-16 md:py-20 ${surface ? "bg-surface" : ""}`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          {label && (
            <p className="text-primary/80 text-[11px] font-semibold tracking-[0.28em] uppercase mb-2">
              {label}
            </p>
          )}
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-heading">
            {title}
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mt-4" />
        </div>
        {children}
      </div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 bg-white rounded-2xl ring-1 ring-black/[0.04] px-5 py-4"
        >
          <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
            ✓
          </span>
          <span className="text-heading/90 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({
  items,
}: {
  items: { title: string; desc: string }[];
}) {
  return (
    <ol className="space-y-4">
      {items.map((step, i) => (
        <li
          key={i}
          className="flex items-start gap-4 bg-white rounded-2xl ring-1 ring-black/[0.04] p-5"
        >
          <span className="font-serif text-3xl text-primary/40 leading-none shrink-0 w-10">
            0{i + 1}
          </span>
          <div>
            <h3 className="font-bold text-heading text-base mb-1">
              {step.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CTABox({
  title = "부담 없이 시작해 보세요",
  desc = "체험수업은 30,000원, 당일 등록 시 전액 환불됩니다.",
}: {
  title?: string;
  desc?: string;
}) {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-heading rounded-3xl px-8 py-10 text-center text-white">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-3">
            {title}
          </h2>
          <p className="text-white/70 text-sm mb-7">{desc}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${locationInfo.phone}`}
              className="px-7 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
            >
              📞 {locationInfo.phone}
            </a>
            <Link
              href="/trial"
              className="px-7 py-3 bg-white/10 text-white text-sm font-semibold rounded-full ring-1 ring-white/25 hover:bg-white/15 transition-colors"
            >
              체험레슨 안내 보기
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-5">
            {locationInfo.address} · 정자역 6번 출구에서 480m
          </p>
        </div>
      </div>
    </section>
  );
}

export function CrossLinks({ current }: { current: string }) {
  const others = LANDING_PAGES.filter((p) => p.slug !== current);
  return (
    <section className="py-14">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-center text-muted text-xs tracking-[0.2em] uppercase mb-5">
          다른 프로그램 살펴보기
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={p.slug}
              className="px-4 py-2 bg-white text-heading text-sm rounded-full ring-1 ring-black/[0.06] hover:text-primary hover:ring-primary/30 transition-all"
            >
              {p.label}
            </Link>
          ))}
          <Link
            href="/"
            className="px-4 py-2 bg-white text-muted text-sm rounded-full ring-1 ring-black/[0.06] hover:text-primary hover:ring-primary/30 transition-all"
          >
            홈으로 →
          </Link>
        </div>
      </div>
    </section>
  );
}
