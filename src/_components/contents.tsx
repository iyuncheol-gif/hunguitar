"use client";

import Image from "next/image";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronDownIcon } from "@/icons";
import { featuredContent, blogPosts, INITIAL_DISPLAY_COUNT } from "@/constants";

export default function Contents() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>();
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedPosts = isExpanded
    ? blogPosts
    : blogPosts.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-surface animate-on-scroll"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Contents
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">유용한 기타 팁과 콘텐츠를 만나보세요</p>
        </div>

        {/* Featured Content — 브랜드 사진 기반 배너 */}
        <div className="mb-12">
          <a
            href={featuredContent.link}
            target="_blank"
            rel="noreferrer"
            className="group block relative rounded-2xl overflow-hidden ring-1 ring-black/[0.05] shadow-md hover:shadow-lg transition-all duration-500"
          >
            <div className="relative h-[240px] md:h-[300px]">
              <Image
                src={featuredContent.image}
                alt={featuredContent.title}
                fill
                className="object-cover object-[center_35%] grayscale-[0.45] brightness-110 contrast-[0.92] transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
              {/* 크림 톤 워시(전체) + 좌측 강조로 페이지 톤과 어울리게 */}
              <div className="absolute inset-0 bg-[rgba(247,244,239,0.5)]" />
              <div className="absolute inset-0 bg-linear-to-r from-[rgba(247,244,239,0.95)] via-[rgba(247,244,239,0.68)] to-[rgba(247,244,239,0.28)]" />

              <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 max-w-2xl">
                <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                  {featuredContent.tag}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-heading mb-3">
                  {featuredContent.title}
                </h3>
                <p className="text-muted text-sm mb-5">
                  {featuredContent.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-heading group-hover:text-primary text-sm font-semibold transition-colors">
                  읽어보기
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
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Blog Posts — 에디토리얼 리스트 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-on-scroll"
        >
          {displayedPosts.map((post) => (
            <a
              key={post.title}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 bg-white rounded-2xl p-4 pr-5 ring-1 ring-black/[0.04] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Thumbnail — 작게, 무드 해치지 않게 */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-surface ring-1 ring-black/[0.06]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="96px"
                />
              </div>

              {/* Copy */}
              <div className="min-w-0 flex-1">
                <span className="inline-block px-2 py-0.5 bg-primary/[0.08] text-primary/90 text-[11px] font-medium rounded-full mb-1.5">
                  {post.tag}
                </span>
                <h4 className="text-base font-bold text-heading group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-muted text-sm line-clamp-1 mt-0.5">
                  {post.description}
                </p>
              </div>

              {/* Arrow */}
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
            </a>
          ))}
        </div>

        {/* Expand Button */}
        {!isExpanded && blogPosts.length > INITIAL_DISPLAY_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center px-5 py-2 text-muted text-sm border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors duration-300"
            >
              더보기
              <ChevronDownIcon className="w-3 h-3 ml-1" />
            </button>
          </div>
        )}

        {/* Visit Blog Link */}
        <div className="mt-12 p-6 bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-heading mb-1">
                더 많은 콘텐츠가 궁금하신가요?
              </h3>
              <p className="text-muted text-sm">
                네이버 블로그에서 기타 레슨 팁, 연주 영상, 악보 등 다양한
                콘텐츠를 만나보세요
              </p>
            </div>
            <a
              href="https://blog.naver.com/hun_guitar"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              <Image
                src="/assets/img/social/blog.png"
                alt="Naver Blog"
                width={20}
                height={20}
                className="w-5 h-5 mr-2"
              />
              블로그 방문하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
