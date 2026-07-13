"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronDownIcon } from "@/icons";
import { studentVoices } from "@/constants";

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 3;
// 이 길이를 넘으면 접어두고 카드별 '더보기'로 펼침
const CLAMP_THRESHOLD = 110;

export default function OurStudents() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [prevDisplayCount, setPrevDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const newItemsRef = useRef<HTMLDivElement[]>([]);

  const displayedStudents = studentVoices.slice(0, displayCount);
  const hasMore = displayCount < studentVoices.length;

  const toggleExpand = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleLoadMore = () => {
    setPrevDisplayCount(displayCount);
    setDisplayCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, studentVoices.length)
    );
  };

  // 새로 추가된 아이템에 애니메이션 적용
  useEffect(() => {
    if (displayCount > prevDisplayCount) {
      newItemsRef.current.forEach((el, idx) => {
        if (el) {
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";
          setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, idx * 100);
        }
      });
    }
  }, [displayCount, prevDisplayCount]);

  return (
    <section id="students" ref={sectionRef} className="py-20 animate-on-scroll">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Our Students
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">고객의 소리</p>
        </div>

        {/* Uniform Grid — 균일한 3열, 같은 행은 같은 높이 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedStudents.map((student, index) => {
            const isNewItem = index >= prevDisplayCount;
            const isLong = student.review.length > CLAMP_THRESHOLD;
            const isOpen = expanded.has(index);
            return (
              <div
                key={index}
                ref={(el) => {
                  if (isNewItem && el) {
                    newItemsRef.current[index - prevDisplayCount] = el;
                  }
                }}
                className="flex flex-col bg-white rounded-2xl ring-1 ring-black/[0.04] shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
              >
                {/* Card Header — 인라인 프로필 */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-9 h-9 shrink-0 rounded-full overflow-hidden ring-1 ring-black/[0.06]">
                    <Image
                      src={student.imageUrl}
                      alt={student.name}
                      fill
                      className="object-cover rounded-full"
                      sizes="36px"
                    />
                  </div>
                  <h4 className="font-bold text-heading text-sm truncate">
                    {student.name}
                  </h4>
                  <span className="ml-auto font-serif text-3xl text-primary/25 leading-none select-none">
                    &ldquo;
                  </span>
                </div>

                {/* Review Text — 길면 5줄 클램프 */}
                <p
                  className={`text-muted text-sm leading-relaxed whitespace-pre-line ${
                    isLong && !isOpen ? "line-clamp-5" : ""
                  }`}
                >
                  {student.review}
                </p>

                {/* 더보기 / 접기 */}
                {isLong && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="self-start mt-2 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                  >
                    {isOpen ? "접기 ↑" : "더보기 ↓"}
                  </button>
                )}

                {/* Shop Items Tags — 카드 하단에 고정 */}
                {student.shopItems.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-gray-100">
                    {student.shopItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2.5 py-0.5 bg-primary/[0.06] text-primary/90 text-[11px] rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-5 py-2 text-muted text-sm border border-gray-300 rounded-lg hover:border-primary hover:text-primary transition-colors duration-300"
            >
              더보기
              <ChevronDownIcon className="w-3 h-3 ml-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
