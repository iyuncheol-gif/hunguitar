"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronDownIcon } from "@/icons";
import { studentVoices } from "@/constants";

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 3;

export default function OurStudents() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const [prevDisplayCount, setPrevDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const newItemsRef = useRef<HTMLDivElement[]>([]);

  const displayedStudents = studentVoices.slice(0, displayCount);
  const hasMore = displayCount < studentVoices.length;

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
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-heading uppercase mb-2">
            Our Students
          </h2>
          <hr className="w-16 border-t-4 border-primary mx-auto mb-4" />
          <p className="text-muted">고객의 소리</p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {displayedStudents.map((student, index) => {
            const isNewItem = index >= prevDisplayCount;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (isNewItem && el) {
                    newItemsRef.current[index - prevDisplayCount] = el;
                  }
                }}
                className="break-inside-avoid bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Card Header with Profile - 중앙 정렬 */}
                <div className="p-5 pb-4">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image */}
                    <div className="relative w-16 h-16 mb-3">
                      <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-primary/60 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={student.imageUrl}
                            alt={student.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <h4 className="font-bold text-heading text-base">
                      {student.name}
                    </h4>
                  </div>
                </div>

                {/* Review Text */}
                <div className="px-5 pb-4">
                  <div className="relative">
                    <span className="absolute -top-1 -left-1 text-3xl text-primary/20 font-serif">
                      &quot;
                    </span>
                    <p className="text-muted text-sm leading-relaxed pl-4 whitespace-pre-line">
                      {student.review}
                    </p>
                  </div>
                </div>

                {/* Shop Items Tags */}
                {student.shopItems.length > 0 && (
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {student.shopItems.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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
