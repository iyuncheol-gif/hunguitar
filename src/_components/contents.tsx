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
          <h2 className="text-3xl font-bold text-heading uppercase mb-2">
            Contents
          </h2>
          <hr className="w-16 border-t-4 border-primary mx-auto mb-4" />
          <p className="text-muted">유용한 기타 팁과 콘텐츠를 만나보세요</p>
        </div>

        {/* Featured Content */}
        <div className="mb-12">
          <a
            href={featuredContent.link}
            target="_blank"
            rel="noreferrer"
            className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={featuredContent.image}
                alt={featuredContent.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full mb-3">
                  {featuredContent.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {featuredContent.title}
                </h3>
                <p className="text-white/80 text-sm max-w-2xl">
                  {featuredContent.description}
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Blog Posts Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll"
        >
          {displayedPosts.map((post, index) => (
            <a
              key={post.title}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Tag */}
                <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-md">
                  {post.tag}
                </span>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-lg font-bold text-heading mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-muted text-sm line-clamp-2">
                  {post.description}
                </p>

                {/* Read More */}
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  <span>자세히 보기</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
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
                </div>
              </div>
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
