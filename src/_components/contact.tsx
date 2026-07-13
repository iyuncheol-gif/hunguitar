"use client";

import { useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { contactMethods, locationInfo, KAKAO_MAP_APP_KEY } from "@/constants";

// 카카오맵 타입 선언
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number }
        ) => {
          setCenter: (latlng: unknown) => void;
        };
        Marker: new (options: { position: unknown; map: unknown }) => unknown;
        CustomOverlay: new (options: {
          content: string;
          position: unknown;
          yAnchor: number;
        }) => {
          setMap: (map: unknown) => void;
        };
        services: {
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (
                result: Array<{ x: string; y: string }>,
                status: string
              ) => void
            ) => void;
          };
          Status: { OK: string };
        };
      };
    };
  }
}

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

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 384 512">
      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useScrollAnimation<HTMLElement>();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const buildMap = (center: unknown) => {
          const map = new window.kakao.maps.Map(mapRef.current!, {
            center,
            level: 4,
          });

          mapInstanceRef.current = map;

          // 마커 추가
          new window.kakao.maps.Marker({
            position: center,
            map,
          });

          // 커스텀 오버레이
          const overlayContent = `
            <div style="
              padding: 12px 16px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              font-size: 14px;
              font-weight: 600;
              color: #333;
              white-space: nowrap;
            ">
              <a href="${locationInfo.kakaoPlaceUrl}" target="_blank" style="text-decoration: none; color: inherit;">
                분당기타&보컬
              </a>
            </div>
          `;

          const overlay = new window.kakao.maps.CustomOverlay({
            content: overlayContent,
            position: center,
            yAnchor: 2.5,
          });

          overlay.setMap(map);
        };

        // 도로명 주소(층/호 제외)로 정확한 좌표를 조회, 실패 시 기본 좌표 사용
        const roadAddress = locationInfo.address.replace(/\s*\d+층.*$/, "");
        const fallback = new window.kakao.maps.LatLng(
          locationInfo.lat,
          locationInfo.lng
        );
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(roadAddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            buildMap(
              new window.kakao.maps.LatLng(
                Number(result[0].y),
                Number(result[0].x)
              )
            );
          } else {
            buildMap(fallback);
          }
        });
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const renderIcon = (type: string, className: string) => {
    switch (type) {
      case "naver":
        return <NaverIcon className={className} />;
      case "phone":
        return <PhoneIcon className={className} />;
      case "kakao":
        return <KakaoIcon className={className} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-surface animate-on-scroll"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-heading uppercase tracking-wide mb-3">
            Contact
          </h2>
          <hr className="w-12 border-t border-primary/60 mx-auto mb-4" />
          <p className="text-muted">편하게 문의해 주세요</p>
        </div>

        {/* Contact Methods — slim refined cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {contactMethods.map((method) => (
            <a
              key={method.type}
              href={method.url}
              target={method.type !== "phone" ? "_blank" : undefined}
              rel={method.type !== "phone" ? "noreferrer" : undefined}
              className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-4 ring-1 ring-black/[0.04] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Icon chip — 브랜드 색은 여기에만 */}
              <span
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                  method.type === "naver"
                    ? "bg-[#03C75A]"
                    : method.type === "kakao"
                    ? "bg-[#FEE500]"
                    : "bg-primary/10"
                }`}
              >
                {renderIcon(
                  method.icon,
                  `w-5 h-5 ${
                    method.type === "naver"
                      ? "text-white"
                      : method.type === "kakao"
                      ? "text-[#3C1E1E]"
                      : "text-primary"
                  }`
                )}
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-bold text-heading truncate">
                  {method.title}
                </span>
                <span className="block text-xs text-muted mt-0.5 truncate">
                  {method.description.replace(/\n/g, " ")}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Map */}
            {/* 데스크톱에선 옆 정보 패널 높이에 맞춰 지도가 꽉 차도록 stretch */}
            <div className="lg:col-span-2 h-[300px] lg:h-auto lg:min-h-[420px] lg:self-stretch">
              <div ref={mapRef} className="w-full h-full" />
            </div>

            {/* Location Info */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LocationIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-heading">오시는 길</h3>
              </div>

              <div className="divide-y divide-gray-100">
                {/* 주소 */}
                <div className="flex items-start gap-3 py-3.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/[0.08] shrink-0">
                    <LocationIcon className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs text-muted mb-0.5">주소</p>
                    <p className="text-heading text-sm font-medium leading-snug">
                      {locationInfo.address}
                    </p>
                  </div>
                </div>

                {/* 지하철 */}
                <div className="flex items-start gap-3 py-3.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/[0.08] shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 448 512">
                      <path d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 128c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted mb-0.5">지하철</p>
                    <p className="text-heading text-sm leading-snug">
                      {locationInfo.directions}
                    </p>
                  </div>
                </div>

                {/* 주차 */}
                <div className="flex items-start gap-3 py-3.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/[0.08] shrink-0 text-primary text-sm font-bold">
                    P
                  </span>
                  <div>
                    <p className="text-xs text-muted mb-0.5">주차</p>
                    <p className="text-heading text-sm leading-snug">
                      인근 공영주차장 이용 가능
                    </p>
                  </div>
                </div>

                {/* 운영시간 */}
                <div className="flex items-start gap-3 py-3.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/[0.08] shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 512 512">
                      <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs text-muted mb-0.5">운영시간</p>
                    <p className="text-heading text-sm leading-snug">
                      {locationInfo.hours}
                    </p>
                  </div>
                </div>

                {/* 문의 */}
                <div className="flex items-start gap-3 py-3.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/[0.08] shrink-0">
                    <PhoneIcon className="w-4 h-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs text-muted mb-0.5">문의</p>
                    <a
                      href={`tel:${locationInfo.phone}`}
                      className="text-heading text-sm font-semibold leading-snug hover:text-primary transition-colors"
                    >
                      {locationInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
