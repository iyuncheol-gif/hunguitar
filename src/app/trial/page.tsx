import type { Metadata } from "next";
import Link from "next/link";
import {
  LandingHero,
  Section,
  Bullets,
  Steps,
  CrossLinks,
} from "@/_components/landing";
import { contactMethods, locationInfo } from "@/constants";

// 메인 Contact 섹션과 동일한 아이콘
function NaverIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 512 512">
      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
    </svg>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222v2.218a.472.472 0 0 0 .944 0v-1.58l.478-.464 1.576 2.19a.472.472 0 0 0 .766-.552l-1.706-2.373zm-7.165-1.95a.472.472 0 0 0-.47.472v3.537H8.907a.472.472 0 0 0 0 .944h1.837a.472.472 0 0 0 .472-.472V9.582a.472.472 0 0 0-.474-.472zm2.553 0a.472.472 0 0 0-.472.472v4.009a.472.472 0 0 0 .944 0V9.582a.472.472 0 0 0-.472-.472zm-5.06 0a.472.472 0 0 0-.404.727l1.443 2.36-1.443 2.36a.472.472 0 0 0 .404.883.472.472 0 0 0 .404-.227l1.18-1.93 1.18 1.93a.472.472 0 0 0 .808-.49l-1.443-2.36 1.443-2.36a.472.472 0 0 0-.404-.883.472.472 0 0 0-.404.227l-1.18 1.93-1.18-1.93a.472.472 0 0 0-.404-.237z" />
    </svg>
  );
}

function methodIcon(type: string) {
  switch (type) {
    case "naver":
      return <NaverIcon className="w-5 h-5 text-white" />;
    case "kakao":
      return <KakaoIcon className="w-6 h-6 text-[#3C1E1E]" />;
    default:
      return <PhoneIcon className="w-5 h-5 text-primary" />;
  }
}

export const metadata: Metadata = {
  title: "체험레슨·상담 안내 — 당일 등록 시 전액 환불",
  description:
    "분당 정자동 기타·보컬 체험레슨 30,000원 — 당일 등록 시 전액 환불. 준비물 없이 빈손 방문 OK. 전화·네이버톡톡·카카오톡으로 편한 방법으로 예약하세요.",
  alternates: { canonical: "https://hunguitar.com/trial" },
};

export default function TrialPage() {
  return (
    <>
      <LandingHero
        badge="Trial Lesson"
        title={
          <>
            시작이 어렵다면,
            <br />
            체험부터 가볍게
          </>
        }
        desc="등록 전에 선생님과의 케미, 공간의 분위기, 수업 스타일을 직접 확인하세요. 체험수업은 30,000원이고, 당일 등록하시면 전액 환불해 드립니다."
        image="/assets/img/studio/lobby.jpg"
        imageAlt="분당기타&보컬 스튜디오 로비"
      />

      <Section label="Process" title="예약부터 등록까지, 3단계" surface>
        <Steps
          items={[
            {
              title: "편한 방법으로 예약",
              desc: "전화·네이버톡톡·카카오톡 중 편한 채널로 원하는 날짜와 시간을 알려주세요. 저녁 타임도 가능합니다.",
            },
            {
              title: "체험수업 + 상담 (약 50분)",
              desc: "간단한 수준 진단 후 실제 수업을 미리 경험합니다. 악기는 준비되어 있으니 빈손으로 오세요.",
            },
            {
              title: "천천히 결정하세요",
              desc: "맞춤 커리큘럼과 과정을 안내드립니다. 당일 등록 시 체험비 30,000원은 전액 환불 — 아니어도 괜찮습니다.",
            },
          ]}
        />
      </Section>

      <Section label="Contact" title="지금 바로 예약하기">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {contactMethods.map((method) => (
            <a
              key={method.type}
              href={method.url}
              target={method.type !== "phone" ? "_blank" : undefined}
              rel={method.type !== "phone" ? "noreferrer" : undefined}
              className="group flex flex-col items-center gap-2 bg-white rounded-2xl px-4 py-6 ring-1 ring-black/[0.05] hover:ring-primary/40 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all text-center"
            >
              <span
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                  method.type === "naver"
                    ? "bg-[#03C75A]"
                    : method.type === "kakao"
                    ? "bg-[#FEE500]"
                    : "bg-primary/10"
                }`}
              >
                {methodIcon(method.type)}
              </span>
              <span className="text-heading text-sm font-bold group-hover:text-primary transition-colors">
                {method.title}
              </span>
              <span className="text-muted text-xs whitespace-pre-line leading-relaxed">
                {method.description}
              </span>
            </a>
          ))}
        </div>
        <p className="text-center text-muted text-xs">
          {locationInfo.address} · 정자역 6번 출구에서 480m · {locationInfo.hours}
        </p>
      </Section>

      <Section label="FAQ" title="자주 묻는 질문" surface>
        <Bullets
          items={[
            "악기가 없어도 되나요? — 네, 기타·장비 모두 상시비치되어 있어 빈손 방문 OK입니다.",
            "완전 처음인데 괜찮을까요? — 체험자 대부분이 왕초보예요. 수준 진단부터 시작하니 걱정 마세요.",
            "체험 후 등록을 안 해도 되나요? — 물론입니다. 부담 드리지 않아요.",
            "보컬 체험도 되나요? — 네, 기타·보컬 모두 체험 가능합니다. 예약 시 알려주세요.",
          ]}
        />
      </Section>

      {/* 최종 전환 CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-heading rounded-3xl px-8 py-12 text-center text-white">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Today
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
              고민은 실력을 늘려주지 않아요
            </h2>
            <p className="text-white/70 text-sm mb-8">
              지금 전화 한 통이면, 이번 주에 첫 코드를 잡을 수 있습니다.
            </p>
            <a
              href={`tel:${locationInfo.phone}`}
              className="inline-block px-10 py-4 bg-primary text-white text-base font-bold rounded-full hover:bg-primary-dark transition-colors shadow-lg"
            >
              📞 {locationInfo.phone} 바로 전화
            </a>
            <p className="text-white/50 text-xs mt-5">
              수강료가 궁금하다면{" "}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-white">
                수강료 안내
              </Link>
              를 확인하세요
            </p>
          </div>
        </div>
      </section>

      <CrossLinks current="/trial" />
    </>
  );
}
