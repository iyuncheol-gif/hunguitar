"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import AutoplayPlugin from "embla-carousel-autoplay";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronLeftIcon, ChevronRightIcon } from "@/icons";
import { benefits, galleryImages } from "@/constants";

// 슬라이드 이동 시 사진이 프레임 안에서 반대로 미끄러지는 패럴랙스 강도
// (화면에 3장이 보이므로, 보이는 범위(약 3스냅) 전체에서 ±19% 안에 들도록 고정 계수 사용)
const TWEEN_FACTOR = 0.66;
const MAX_PARALLAX = 19; // % — 레이어 여유폭(±20%) 안에서 클램프

export default function Gallery() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const benefitRef = useScrollAnimation<HTMLDivElement>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // SSG 호환성을 위해 useRef로 autoplay 플러그인 인스턴스 관리
  const autoplayRef = useRef(
    AutoplayPlugin({ delay: 4000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: 45,
    },
    [autoplayRef.current]
  );

  // 패럴랙스 트윈
  const tweenNodes = useRef<(HTMLElement | null)[]>([]);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api
      .slideNodes()
      .map((node) => node.querySelector<HTMLElement>(".parallax-layer"));
  }, []);

  const tweenParallax = useCallback((api: EmblaCarouselType) => {
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          });
        }

        const raw = diffToTarget * (-1 * TWEEN_FACTOR) * 100;
        const translate = Math.max(-MAX_PARALLAX, Math.min(MAX_PARALLAX, raw));
        // 제자리에서 멀수록 살짝 줌인 → 팬+줌이 겹치며 깊이감
        const scale = 1 + Math.min(Math.abs(translate) * 0.005, 0.09);
        const node = tweenNodes.current[slideIndex];
        if (node)
          node.style.transform = `translateX(${translate}%) scale(${scale})`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);

    return () => {
      emblaApi
        .off("reInit", setTweenNodes)
        .off("reInit", tweenParallax)
        .off("scroll", tweenParallax)
        .off("slideFocus", tweenParallax);
    };
  }, [emblaApi, setTweenNodes, tweenParallax]);

  const handleMouseEnter = useCallback(() => {
    autoplayRef.current.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    autoplayRef.current.play();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // emblaApi 초기화 및 select 이벤트 구독
  useEffect(() => {
    if (!emblaApi) return;

    const updateSelectedIndex = () => {
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex((prev) => {
        setPrevIndex(prev);
        return newIndex;
      });
    };

    // 초기값 설정
    updateSelectedIndex();

    // 이벤트 리스너 등록
    emblaApi.on("select", updateSelectedIndex);
    return () => {
      emblaApi.off("select", updateSelectedIndex);
    };
  }, [emblaApi]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 bg-surface animate-on-scroll"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Gallery
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">분당기타&amp;보컬의 공간</p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group/carousel"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Embla Carousel */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex ml-[-16px]">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 pl-4"
                >
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                    {/* 패럴랙스 레이어: 프레임보다 좌우로 넓게 잡고 스크롤에 따라 이동 */}
                    <div className="parallax-layer absolute inset-y-0 -inset-x-[20%] will-change-transform">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6 text-heading" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6 text-heading" />
          </button>
        </div>

        {/* Progress Bar Indicators */}
        <div className="flex justify-center items-center gap-1 mt-6">
          {galleryImages.map((_, index) => {
            const isSelected = index === selectedIndex;
            const wasPrev = index === prevIndex;
            const isNeighbor =
              Math.abs(index - selectedIndex) === 1 ||
              (selectedIndex === 0 && index === galleryImages.length - 1) ||
              (selectedIndex === galleryImages.length - 1 && index === 0);

            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`rounded-full transition-all duration-500 ease-out ${
                  isSelected
                    ? "w-6 h-2 bg-primary scale-100"
                    : wasPrev
                    ? "w-2 h-2 bg-primary/50 scale-90"
                    : isNeighbor
                    ? "w-1.5 h-1.5 bg-gray-400 scale-100"
                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400 scale-100"
                }`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Benefits Section */}
        <div ref={benefitRef} className="mt-16 animate-on-scroll">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-semibold text-heading mb-2">
              Why Music?
            </h3>
            <p className="text-muted text-sm">
              체계적인 레슨과 함께 기타·보컬 실력을 키워보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className="group relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl text-center transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Decorative Background */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-primary to-primary/70 text-white text-lg font-bold mb-3">
                    {benefit.id}
                  </span>
                  <h4 className="text-base font-bold text-heading mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-muted text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
