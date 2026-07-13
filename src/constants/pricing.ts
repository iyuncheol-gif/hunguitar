export const priceHighlights = [
  { icon: "🌿", text: "악기 상시비치 · 연습실 완비" },
  { icon: "🐤", text: "왕초보 환영! 맞춤형 밀착케어" },
  { icon: "🎯", text: "15년 · 20년 원장진 책임직강" },
];

export type PriceItem = {
  tag?: string;
  emoji?: string;
  name: string;
  sub?: string;
  price: number | null; // null => 변동(상담)
  popular?: boolean;
};

export const priceGroups: {
  title: string;
  subtitle: string;
  items: PriceItem[];
}[] = [
  {
    title: "수강 과목 안내",
    subtitle: "기타 · 보컬 정규 레슨",
    items: [
      { tag: "체험수업", emoji: "🎁", name: "당일 등록 시 환불", price: 30000 },
      { tag: "인기", name: "기타 / 보컬 취미반", price: 200000, popular: true },
      { tag: "집중", name: "기타 / 보컬 전문반", price: 300000 },
      { tag: "실속", name: "2:1 / 3:1 그룹레슨", price: null },
    ],
  },
  {
    title: "스페셜 클래스",
    subtitle: "목적별 심화 · 원데이",
    items: [
      { emoji: "🌼", name: "싱어송라이터 클래스", sub: "2과목", price: 380000 },
      { emoji: "🌸", name: "찬양인도자 클래스", sub: "2과목", price: 380000 },
      { tag: "원데이", emoji: "🌹", name: "가족 · 연인 · 친구와", price: null },
      { tag: "고급", name: "레코딩 수업", sub: "1회", price: 100000 },
    ],
  },
];

export const priceNote =
  "‘변동’ 항목(그룹·원데이 등)은 인원과 과정에 따라 달라지며, 자세한 금액은 상담 시 안내해 드립니다.";
