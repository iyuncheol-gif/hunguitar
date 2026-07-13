"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { priceHighlights, priceGroups, priceNote } from "@/constants";

function formatPrice(price: number | null) {
  return price === null ? "변동" : `${price.toLocaleString("ko-KR")}원`;
}

export default function Pricing() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const cardsRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-20 bg-surface animate-on-scroll"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Pricing
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">수강료 안내</p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {priceHighlights.map((h) => (
            <span
              key={h.text}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm ring-1 ring-black/[0.03] text-sm text-heading font-medium"
            >
              <span className="text-base leading-none">{h.icon}</span>
              {h.text}
            </span>
          ))}
        </div>

        {/* Price Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-on-scroll"
        >
          {priceGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <div className="mb-4">
                <h3 className="text-xl font-serif font-semibold text-heading">
                  {group.title}
                </h3>
                <p className="text-muted text-sm mt-1">{group.subtitle}</p>
              </div>

              <ul className="divide-y divide-gray-100">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={`flex items-center justify-between gap-3 py-4 px-3 -mx-3 rounded-xl ${
                      item.popular ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {item.emoji && (
                        <span className="text-lg leading-none shrink-0">
                          {item.emoji}
                        </span>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {item.tag && (
                            <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-semibold rounded-md shrink-0">
                              {item.tag}
                            </span>
                          )}
                          <span className="text-heading font-medium">
                            {item.name}
                          </span>
                          {item.sub && (
                            <span className="text-muted text-xs">
                              ({item.sub})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 ${
                        item.price === null
                          ? "text-muted text-sm font-semibold"
                          : "text-heading font-bold"
                      }`}
                    >
                      {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 flex items-start justify-center gap-2 text-muted text-xs leading-relaxed max-w-2xl mx-auto text-center">
          <span aria-hidden className="text-primary">
            *
          </span>
          <p>{priceNote}</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            수강 상담 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}
