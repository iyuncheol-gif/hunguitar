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
  title: "직장인 기타 레슨 | 정자동·판교 퇴근 후 저녁 기타",
  description:
    "정자동·판교 직장인을 위한 평일 저녁 기타 레슨. 야근·출장에도 유연한 횟수 차감제, 악기 상시비치로 빈손 등록 OK. 퇴근 후 스트레스를 음악으로 풀어보세요.",
  alternates: { canonical: "https://hunguitar.com/lessons/office-worker" },
};

export default function OfficeWorkerPage() {
  return (
    <>
      <LandingHero
        badge="After Work"
        title={
          <>
            퇴근 후 한 시간,
            <br />
            직장인 기타 레슨
          </>
        }
        desc="정자동·판교에서 퇴근길에 들르기 좋은 위치. 평일 저녁 시간대 수업과 유연한 스케줄로, 바쁜 직장인도 꾸준히 이어갈 수 있게 설계했습니다."
        image="/assets/img/studio/lounge.jpg"
        imageAlt="분당기타&보컬 라운지"
      />

      <Section label="Schedule" title="직장인에게 딱 맞는 시스템" surface>
        <Bullets
          items={[
            "평일 10:00–21:00 운영 — 퇴근 후 저녁 타임(18–21시) 수업 가능",
            "횟수 차감제 — 야근·출장으로 빠져도 하루 전 연락하면 이월",
            "주 1회 기본, 필요에 따라 주 2–3회로 조절",
            "악기 상시비치 — 회사에서 빈손으로 와도 바로 수업",
            "정자역 6번 출구에서 480m — 네오위즈·판교 테크노밸리에서 한 정거장",
          ]}
        />
      </Section>

      <Section label="Program" title="3개월이면 달라지는 저녁">
        <Steps
          items={[
            {
              title: "1개월 — 손 풀기",
              desc: "기초 코드와 스트로크. 일주일에 한 번, 회사 생각이 사라지는 50분을 경험합니다.",
            },
            {
              title: "2개월 — 첫 곡 완주",
              desc: "좋아하는 노래 한 곡을 처음부터 끝까지. 회식 자리 히든카드가 생깁니다.",
            },
            {
              title: "3개월 — 나만의 루틴",
              desc: "연습실에서 수업 전후 자율 연습. 퇴근 후 취미가 습관이 되는 시점입니다.",
            },
          ]}
        />
      </Section>

      <Section label="Why" title="음악이 주는 퇴근 후 회복" surface>
        <Bullets
          items={[
            "반복 업무로 지친 뇌에 새로운 자극 — 몰입이 주는 확실한 리프레시",
            "성취가 눈에 보이는 취미 — 지난달의 나보다 확실히 늘어 있는 연주",
            "1:1 수업이라 진도 압박 없이 내 페이스대로",
          ]}
        />
      </Section>

      <CTABox
        title="이번 주 퇴근길에 들러보세요"
        desc="체험수업 30,000원 — 당일 등록 시 전액 환불. 저녁 타임은 인기가 많아 상담 시 우선 배정해 드려요."
      />
      <CrossLinks current="/lessons/office-worker" />
    </>
  );
}
