"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const LESSON_PROGRAMS = [
  {
    href: "/lessons/adult-beginner",
    image: "/assets/img/studio/entrance.jpg",
    tag: "가장 인기",
    title: "성인 초보 기타 레슨",
    desc: "악보를 몰라도, 악기가 없어도 OK. 첫 곡 완주까지 함께하는 왕초보 전용 과정.",
  },
  {
    href: "/lessons/office-worker",
    image: "/assets/img/studio/lounge.jpg",
    tag: "저녁 타임",
    title: "직장인 기타 레슨",
    desc: "정자동·판교 퇴근길에. 야근에도 유연한 횟수 차감제로 꾸준히 이어가세요.",
  },
  {
    href: "/lessons/fingerstyle",
    image: "/assets/img/studio/detail.jpg",
    tag: "원장 직강",
    title: "핑거스타일 기타 레슨",
    desc: "기타 한 대로 완성하는 연주. 작편곡 경력 원장의 전문 커리큘럼.",
  },
];

const INFO_PROGRAMS = [
  {
    href: "/pricing",
    icon: "₩",
    title: "수강료·수업 방식 안내",
    desc: "체험 30,000원부터 전 과정 가격과 수업 규정을 투명하게 공개합니다.",
  },
  {
    href: "/trial",
    icon: "★",
    title: "체험레슨·상담 안내",
    desc: "당일 등록 시 전액 환불. 예약부터 등록까지 3단계로 안내해 드려요.",
  },
];

export default function Programs() {
  const sectionRef = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="py-20 animate-on-scroll"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Programs
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">나에게 맞는 과정을 찾아보세요</p>
        </div>

        {/* Lesson Programs — 사진 카드 3종 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {LESSON_PROGRAMS.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group flex flex-col bg-white rounded-2xl ring-1 ring-black/[0.05] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-primary text-[11px] font-semibold rounded-full">
                  {program.tag}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-semibold text-heading mb-2 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1">
                  {program.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-medium">
                  자세히 보기
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Programs — 슬림 카드 2종 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INFO_PROGRAMS.map((program) => (
            <Link
              key={program.href}
              href={program.href}
              className="group flex items-center gap-5 bg-white rounded-2xl ring-1 ring-black/[0.05] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-6"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-serif text-xl font-bold shrink-0">
                {program.icon}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-base font-semibold text-heading mb-1 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {program.desc}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-muted/50 shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1"
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
          ))}
        </div>
      </div>
    </section>
  );
}
