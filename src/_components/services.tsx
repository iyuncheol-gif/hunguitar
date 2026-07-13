"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  ClipboardCheckIcon,
  BookOpenIcon,
  UserFocusIcon,
  HeartIcon,
  ChartIcon,
  StudentIcon,
} from "@/icons";
import { services, trialLessons, testimonials } from "@/constants";

const IconComponent = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  switch (icon) {
    case "clipboard-check":
      return <ClipboardCheckIcon className={className} />;
    case "book-open":
      return <BookOpenIcon className={className} />;
    case "user-focus":
      return <UserFocusIcon className={className} />;
    case "heart":
      return <HeartIcon className={className} />;
    case "chart":
      return <ChartIcon className={className} />;
    case "student":
      return <StudentIcon className={className} />;
    default:
      return null;
  }
};

export default function Services() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const trialRef = useScrollAnimation<HTMLDivElement>();
  const testimonialRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="services" ref={sectionRef} className="py-20 animate-on-scroll">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Services
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">최고의 서비스를 제공합니다</p>
        </div>

        {/* Services — balanced cards (image top · text below) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group flex flex-col bg-white rounded-2xl ring-1 ring-black/[0.05] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.backgroundImage}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* 번호 배지 */}
                <span className="absolute top-3 left-3 font-serif text-sm font-semibold text-white/90 bg-black/25 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              {/* Copy */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 shrink-0">
                    <IconComponent
                      icon={service.icon}
                      className="w-5 h-5 text-primary"
                    />
                  </span>
                  <h4 className="text-lg font-serif font-semibold text-heading leading-snug">
                    {service.title}
                  </h4>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {service.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trial Lesson — single panel, stacked rows */}
        <div ref={trialRef} className="animate-on-scroll mb-24">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-semibold text-heading mb-2">
              체험수업
            </h3>
            <p className="text-muted text-sm">부담없이 시작해 보세요</p>
          </div>

          <div className="max-w-4xl mx-auto rounded-3xl bg-linear-to-br from-primary/[0.05] to-primary/[0.11] p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
              {trialLessons.map((lesson) => (
                <div
                  key={lesson.title}
                  className="text-center px-6 py-6 md:py-2"
                >
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm text-primary mb-4">
                    <IconComponent icon={lesson.icon} className="w-7 h-7" />
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-heading mb-2">
                    {lesson.title}
                  </h4>
                  <p className="text-muted text-sm leading-relaxed">
                    {lesson.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews — alternating pull quotes */}
        <div ref={testimonialRef} className="animate-on-scroll">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-serif font-semibold text-heading mb-2">
              Reviews
            </h3>
            <p className="text-muted text-sm">수강생들의 생생한 후기</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {testimonials.map((testimonial, index) => {
              const reversed = index % 2 === 1;
              return (
                <div
                  key={testimonial.name}
                  className={`flex items-center gap-5 md:gap-7 ${
                    reversed ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Profile */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-primary/60 p-0.5">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quote bubble */}
                  <div
                    className={`flex-1 bg-surface rounded-2xl px-6 py-5 ${
                      reversed ? "text-right" : ""
                    }`}
                  >
                    <p className="text-heading/85 text-sm md:text-base leading-relaxed">
                      <span className="font-serif text-2xl text-primary/40 leading-none select-none align-[-0.2em] mr-1.5">
                        &ldquo;
                      </span>
                      <span className="italic">
                        {testimonial.text.replace(/"/g, "")}
                      </span>
                      <span className="font-serif text-2xl text-primary/40 leading-none select-none align-[-0.2em] ml-1.5">
                        &rdquo;
                      </span>
                    </p>
                    <p className="text-muted text-xs font-medium mt-2">
                      — {testimonial.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
