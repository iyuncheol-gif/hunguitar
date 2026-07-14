import type { Metadata } from "next";
import {
  LandingHero,
  Section,
  Bullets,
  CTABox,
  CrossLinks,
} from "@/_components/landing";
import { priceGroups, priceNote, lessonDetails } from "@/constants";

export const metadata: Metadata = {
  title: "수강료·수업 방식 안내 — 분당 기타·보컬 레슨 가격",
  description:
    "분당 정자동 기타·보컬 레슨 수강료 안내. 체험수업 30,000원(당일 등록 시 전액 환불), 취미반·전문반·스페셜 클래스. 50분 1:1 수업, 횟수 차감제, 유연한 스케줄.",
  alternates: { canonical: "https://hunguitar.com/pricing" },
};

function formatPrice(price: number | null) {
  return price === null ? "상담 안내" : `${price.toLocaleString("ko-KR")}원`;
}

export default function PricingPage() {
  return (
    <>
      <LandingHero
        badge="Pricing"
        title={
          <>
            투명한 수강료,
            <br />
            군더더기 없는 안내
          </>
        }
        desc="숨은 비용 없이 그대로 공개합니다. 나에게 맞는 과정이 무엇인지 아래에서 확인하고, 궁금한 점은 편하게 상담으로 물어보세요."
        image="/assets/img/studio/booth-1.jpg"
        imageAlt="분당기타&보컬 방음 레슨실"
      />

      <Section label="Tuition" title="수강료 안내" surface>
        <div className="space-y-8">
          {priceGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-serif text-lg font-semibold text-heading mb-1">
                {group.title}
              </h3>
              <p className="text-muted text-xs mb-4">{group.subtitle}</p>
              <div className="bg-white rounded-2xl ring-1 ring-black/[0.04] divide-y divide-gray-100 overflow-hidden">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className={`flex items-center justify-between gap-3 px-5 py-4 ${
                      item.popular ? "bg-primary/[0.04]" : ""
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.tag && (
                          <span className="px-2 py-0.5 bg-primary/[0.08] text-primary/90 text-[11px] font-medium rounded-full">
                            {item.tag}
                          </span>
                        )}
                        <span className="text-heading text-sm font-medium">
                          {item.name}
                          {item.sub && (
                            <span className="text-muted text-xs ml-1">
                              ({item.sub})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-sm font-bold ${
                        item.price === null ? "text-muted font-semibold" : "text-heading"
                      }`}
                    >
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted text-xs text-center mt-6">* {priceNote}</p>
      </Section>

      <Section label="How It Works" title="수업은 이렇게 진행돼요">
        <Bullets items={lessonDetails} />
      </Section>

      <Section label="Included" title="수강료에 포함된 것들" surface>
        <Bullets
          items={[
            "15년·20년 경력 원장진의 1:1 책임 직강",
            "악기 상시비치 — 개인 악기 없이 수강 가능",
            "방음 연습실 이용 — 수업 전후 자율 연습",
            "수준 진단과 개인 맞춤 커리큘럼 설계",
          ]}
        />
      </Section>

      <CTABox
        title="내게 맞는 과정이 궁금하다면"
        desc="전화 한 통이면 수준 진단부터 과정 추천까지, 강요 없이 안내해 드립니다."
      />
      <CrossLinks current="/pricing" />
    </>
  );
}
