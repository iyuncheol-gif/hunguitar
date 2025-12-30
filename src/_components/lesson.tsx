"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  teacherInfo,
  lessonCategories,
  lessonDetails,
  youtubeVideos,
} from "@/constants";

export default function Lesson() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const infoRef = useScrollAnimation<HTMLDivElement>();
  const categoryRef = useScrollAnimation<HTMLDivElement>();
  const videoRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="lesson" ref={sectionRef} className="py-20 animate-on-scroll">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-heading uppercase mb-2">
            Lesson
          </h2>
          <hr className="w-16 border-t-4 border-primary mx-auto mb-4" />
          <p className="text-muted">전문 강사에게 배우는 맞춤형 레슨</p>
        </div>

        {/* Teacher Hero Section */}
        <div
          ref={infoRef}
          className="relative mb-16 rounded-2xl overflow-hidden animate-on-scroll"
        >
          {/* Background Image - 원본 비율 유지 */}
          <div className="relative h-[500px] md:h-[650px]">
            <Image
              src="/assets/img/lesson/teacher.png"
              alt="김훈섭 선생님"
              fill
              className="object-cover md:object-contain object-center md:object-top transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />

            {/* Teacher Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="max-w-2xl">
                <p className="text-primary font-medium mb-2 tracking-wider">
                  INSTRUCTOR
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {teacherInfo.name}
                </h3>
                <p className="text-white/80 text-lg mb-4">
                  {teacherInfo.title}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {teacherInfo.education.map((edu, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm"
                    >
                      {edu}
                    </span>
                  ))}
                </div>

                {/* Singles & Albums */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-primary font-semibold mb-2 text-sm">
                      훈제계란프로젝트 싱글
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {teacherInfo.singles.map((single, index) => (
                        <span
                          key={index}
                          className="text-white/80 text-xs after:content-['/'] after:mx-1 after:text-white/40 last:after:content-none"
                        >
                          {single}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="text-primary font-semibold mb-2 text-sm">
                      음반 활동
                    </h4>
                    <p className="text-white/80 text-xs">
                      앨범: {teacherInfo.albums.join(", ")}
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      {teacherInfo.activities}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Categories - Modern Cards */}
        <div
          ref={categoryRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-on-scroll"
        >
          {lessonCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative Background */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

              <span className="text-4xl mb-4 block">{category.icon}</span>
              <h3 className="text-xl font-bold text-heading mb-4 relative">
                {category.title}
              </h3>
              <ul className="space-y-2 relative">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-muted text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lesson Details */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-12">
          <h3 className="text-lg font-bold text-heading mb-4 flex items-center gap-2">
            <span className="text-primary">📋</span>
            레슨안내
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            {lessonDetails.map((detail, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* YouTube Videos */}
        <div ref={videoRef} className="animate-on-scroll">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-heading mb-2">
              Performance
            </h3>
            <p className="text-muted text-sm">
              김훈섭 선생님의 기타 연주를 감상해보세요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {youtubeVideos.map((video, index) => (
              <div
                key={index}
                className="group relative aspect-video rounded-xl overflow-hidden shadow-lg"
              >
                <iframe
                  src={video.src}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 pointer-events-none">
                  <p className="text-white text-sm font-medium">
                    {video.title}
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
