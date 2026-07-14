import type { Metadata } from "next";
import {
  LandingHero,
  Section,
  Bullets,
  Steps,
  CTABox,
  CrossLinks,
} from "@/_components/landing";
import { youtubeVideos } from "@/constants";

export const metadata: Metadata = {
  title: "핑거스타일 기타 레슨 | 분당 어쿠스틱 연주 전문",
  description:
    "한 대의 기타로 멜로디와 반주를 동시에. 음반 작편곡·연주 경력의 원장이 직접 가르치는 분당 핑거스타일 기타 레슨. 연주 영상으로 실력을 먼저 확인하세요.",
  alternates: { canonical: "https://hunguitar.com/lessons/fingerstyle" },
};

export default function FingerstylePage() {
  return (
    <>
      <LandingHero
        badge="Fingerstyle"
        title={
          <>
            기타 한 대가
            <br />
            오케스트라가 되는 순간
          </>
        }
        desc="멜로디, 베이스, 리듬을 열 손가락으로 동시에. 코드 반주에서 한 단계 올라서고 싶다면, 음반 작편곡과 연주로 다져진 원장 직강 핑거스타일 레슨을 만나보세요."
        image="/assets/img/studio/detail.jpg"
        imageAlt="분당기타&보컬 기타 컬렉션"
      />

      <Section label="Performance" title="말보다 연주로 보여드릴게요" surface>
        <p className="text-center text-muted text-sm mb-8 -mt-2">
          김훈섭 원장의 연주 — 다수의 음반 작편곡 / 연주 / 프로듀싱
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {youtubeVideos.map((video, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl ring-1 ring-black/[0.04] overflow-hidden"
            >
              <div className="relative aspect-video">
                <iframe
                  src={`${video.src}?modestbranding=1&rel=0&color=white`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="px-5 py-3.5 font-serif font-semibold text-heading text-sm">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Curriculum" title="핑거스타일, 이렇게 배웁니다">
        <Steps
          items={[
            {
              title: "오른손 아르페지오의 기초",
              desc: "핑거스타일의 뼈대인 손가락 독립과 아르페지오 패턴을 정확한 폼으로 다집니다.",
            },
            {
              title: "멜로디 + 베이스 동시 연주",
              desc: "엄지는 베이스, 나머지 손가락은 멜로디. 한 대로 두 파트를 소화하는 감각을 만듭니다.",
            },
            {
              title: "톤과 뉘앙스",
              desc: "같은 음도 다르게 들리게 — 어택, 비브라토, 하모닉스 등 표현 기술을 배웁니다.",
            },
            {
              title: "나만의 편곡",
              desc: "좋아하는 곡을 직접 핑거스타일로 편곡해 봅니다. 원장의 작편곡 노하우가 그대로 전수됩니다.",
            },
          ]}
        />
      </Section>

      <Section label="For You" title="이런 분께 추천해요" surface>
        <Bullets
          items={[
            "코드 반주는 익숙한데 다음 단계가 궁금한 중급 지망생",
            "유튜브 커버 연주자들처럼 혼자서 완성된 연주를 하고 싶은 분",
            "타브 악보만 따라 치다 표현력의 벽을 느낀 독학러",
            "버스킹·교회 반주 등 솔로 연주 무대를 준비하는 분",
          ]}
        />
      </Section>

      <CTABox
        title="당신의 연주를 한 단계 위로"
        desc="체험수업에서 현재 실력을 진단하고 맞춤 커리큘럼을 제안해 드립니다."
      />
      <CrossLinks current="/lessons/fingerstyle" />
    </>
  );
}
