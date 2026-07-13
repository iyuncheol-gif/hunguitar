"use client";

import Image from "next/image";
import { InstagramIcon } from "@/icons";
import { socialLinks } from "@/constants";

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 576 512">
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
    </svg>
  );
}

function NaverBlogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-heading text-white">
      {/* Main Footer — 브랜드만 담은 컴팩트 구성 */}
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        {/* Brand */}
        <Image
          src="/assets/img/common/logo_white.png"
          alt="분당기타&보컬"
          width={472}
          height={455}
          className="h-16 w-auto mx-auto mb-4"
        />
        <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-xl mx-auto">
          기타를 처음 시작하는 분부터 보컬·실용음악을 배우고 싶은 분까지, 밝고
          쾌적한 방음 스튜디오에서 개인 맞춤 레슨으로 여러분의 음악적 성장을
          돕겠습니다.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors duration-300"
              aria-label={social.name}
            >
              {social.icon === "naver" && <NaverBlogIcon className="w-4 h-4" />}
              {social.icon === "instagram" && (
                <InstagramIcon className="w-4 h-4" />
              )}
              {social.icon === "youtube" && <YouTubeIcon className="w-4 h-4" />}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar — 카피라이트만 */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-white/40 text-xs">
            © {currentYear} 분당기타&amp;보컬. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
