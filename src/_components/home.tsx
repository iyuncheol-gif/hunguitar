import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <header
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center text-white pt-40 pb-20"
    >
      {/* Background Image */}
      <Image
        src="/assets/img/home/bg.jpg"
        alt="Guitar background"
        fill
        priority
        className="object-cover -z-10"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(92,77,66,0.1)] to-[rgba(92,77,66,0.8)] -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 whitespace-nowrap">
            훈:어쿠스틱기타하우스
          </h1>
          <p className="text-lg mb-8">
            기타레슨 전문 훈:어쿠스틱기타하우스에서 체계적인 교육과 함께 기타
            연주 실력을 키워보세요!
          </p>
          <Link
            href="#services"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded transition-colors"
          >
            바로가기
          </Link>
        </div>
      </div>
    </header>
  );
}
