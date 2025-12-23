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
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-heading uppercase mb-2">
            Services
          </h2>
          <hr className="w-16 border-t-4 border-primary mx-auto mb-4" />
          <p className="text-muted">최고의 서비스를 제공합니다</p>
        </div>

        {/* Service Cards - Modern Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative rounded-2xl h-80 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              <Image
                src={service.backgroundImage}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/90 backdrop-blur-sm flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <IconComponent
                    icon={service.icon}
                    className="w-7 h-7 text-white"
                  />
                </div>

                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
                  {service.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trial Lesson Section */}
        <div ref={trialRef} className="animate-on-scroll">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-heading mb-2">
              체험수업
            </h3>
            <p className="text-muted text-sm">부담없이 시작해 보세요</p>
          </div>

          {/* Trial Lesson Cards - Modern Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {trialLessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className="group relative bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative Background */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

                <div className="relative">
                  <span className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-primary to-primary/80 text-white mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <IconComponent icon={lesson.icon} className="w-8 h-8" />
                  </span>
                  <h4 className="text-lg font-bold text-heading mb-3">
                    {lesson.title}
                  </h4>
                  <p className="text-muted text-sm leading-relaxed">
                    {lesson.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials - Modern Style */}
        <div ref={testimonialRef} className="animate-on-scroll">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-heading mb-2">Reviews</h3>
            <p className="text-muted text-sm">수강생들의 생생한 후기</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="group bg-linear-to-br from-primary/5 to-primary/10 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Profile Image */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-primary/60 p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="font-semibold text-heading mb-3">
                  {testimonial.name}
                </h4>

                {/* Quote */}
                <div className="relative">
                  <span className="absolute -top-2 -left-1 text-4xl text-primary/20 font-serif">
                    &quot;
                  </span>
                  <p className="text-muted text-sm italic leading-relaxed pl-4">
                    {testimonial.text.replace(/"/g, "")}
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
