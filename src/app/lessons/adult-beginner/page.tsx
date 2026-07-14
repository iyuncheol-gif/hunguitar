import type { Metadata } from "next";
import {
  LandingHero,
  Section,
  Bullets,
  Steps,
  CTABox,
  CrossLinks,
} from "@/_components/landing";

export const metadata: Metadata = {
  title: "성인 초보 기타 레슨 | 분당 정자동 기타 배우기",
  description:
    "기타가 처음인 성인을 위한 분당 정자동 1:1 맞춤 레슨. 악보를 몰라도, 악기가 없어도 괜찮습니다. 8세부터 100세까지, 왕초보 환영. 체험수업 당일 등록 시 전액 환불.",
  alternates: { canonical: "https://hunguitar.com/lessons/adult-beginner" },
};

export default function AdultBeginnerPage() {
  return (
    <>
      <LandingHero
        badge="Adult Beginner"
        title={
          <>
            처음이라서 더 설레는,
            <br />
            성인 초보 기타 레슨
          </>
        }
        desc="악보를 못 읽어도, 손가락이 짧아도, 나이가 많아도 괜찮습니다. 기타를 처음 잡는 성인을 위해 설계된 1:1 맞춤 커리큘럼으로 첫 곡 완주까지 함께합니다."
        image="/assets/img/studio/main.jpg"
        imageAlt="분당기타&보컬 기타 쇼룸"
      />

      <Section label="For You" title="이런 분들이 시작하세요" surface>
        <Bullets
          items={[
            "기타를 배우고 싶다는 생각만 몇 년째, 시작을 못 하고 계신 분",
            "학원은 어린 학생들만 다닐 것 같아 망설여졌던 성인·시니어",
            "유튜브 독학으로 코드에서 막혀 답답함을 느끼신 분",
            "은퇴 후 새로운 취미를 찾고 계신 분 — 90세 회원님도 함께하고 있어요",
          ]}
        />
      </Section>

      <Section label="Curriculum" title="첫 곡 완주까지, 4단계">
        <Steps
          items={[
            {
              title: "기초 자세와 첫 코드",
              desc: "악기 잡는 법부터 손이 아프지 않은 운지 요령까지. 악보를 몰라도 따라올 수 있게 시작합니다.",
            },
            {
              title: "코드 전환과 스트로크",
              desc: "노래 반주의 핵심인 코드 전환을 쉬운 곡으로 익히고, 리듬에 맞는 스트로크를 배웁니다.",
            },
            {
              title: "좋아하는 곡으로 첫 완주",
              desc: "내가 좋아했던 노래를 직접 골라 처음부터 끝까지 연주해 봅니다. 이 순간이 가장 짜릿해요.",
            },
            {
              title: "나만의 레퍼토리 만들기",
              desc: "수준에 맞춰 레퍼토리를 넓히고, 원하면 핑거스타일·보컬 병행으로 확장합니다.",
            },
          ]}
        />
      </Section>

      <Section label="Why Us" title="분당기타&보컬이라서 가능한 것" surface>
        <Bullets
          items={[
            "악기 상시비치 — 빈손으로 와서 바로 수업 (회원 한정 기타 대여도 가능)",
            "15년·20년 경력 원장진의 1:1 책임 직강, 매 수업 수준별 맞춤 진행",
            "쾌적한 방음 연습실 완비 — 수업 전후 자유롭게 연습",
            "정자역 6번 출구에서 480m, 평일 10:00–21:00 운영",
          ]}
        />
      </Section>

      <CTABox
        title="오늘이 가장 빠른 시작입니다"
        desc="체험수업 30,000원 — 당일 등록 시 전액 환불됩니다. 부담 없이 케미부터 확인해 보세요."
      />
      <CrossLinks current="/lessons/adult-beginner" />
    </>
  );
}
