export type Teacher = {
  name: string;
  title: string;
  image: string | null;
  education: string[];
  singlesLabel?: string;
  singles?: string[];
  albums?: string[];
  activities?: string;
  intro?: string;
};

export const teachers: Teacher[] = [
  {
    name: "김훈섭",
    title: "분당기타&보컬 원장",
    image: "/assets/img/lesson/teacher.png",
    education: ["숭실대 교회음악과", "서울장신대 예배찬양사역대학원"],
    singlesLabel: "훈제계란프로젝트 싱글",
    singles: [
      "아무것도 염려하지 말고",
      "여기에 모인 우리",
      "너 근심 걱정 말아라",
      "아름답다",
      "귤이 있어 감사",
    ],
    albums: ["사랑하면", "그대가 그대라서"],
    activities: "다수의 음반 작편곡 / 연주 / 프로듀싱",
  },
  {
    // TODO: 임아란 강사 상세 내용(이력/사진 등)은 추후 업데이트 예정
    name: "임아란",
    title: "분당기타&보컬 원장",
    image: null,
    education: ["서울장신대 예배찬양사역대학원"],
    singlesLabel: "훈제계란프로젝트 싱글",
    singles: [
      "아무것도 염려하지 말고",
      "여기에 모인 우리",
      "너 근심 걱정 말아라",
      "아름답다",
      "귤이 있어 감사",
    ],
    albums: ["사랑하면", "그대가 그대라서"],
    activities: "다수의 음반 작편곡 / 연주 / 프로듀싱",
  },
];

export const lessonCategories = [
  {
    title: "레슨대상",
    icon: "👥",
    items: [
      "초 / 중 / 고등학생 / 주부",
      "직장인 / 8세부터 100세까지",
      "취미반 / 입시반 / 오디션반",
    ],
  },
  {
    title: "레슨과목",
    icon: "🎸",
    items: [
      "통기타(어쿠스틱) / 클래식기타",
      "일렉기타 / 우쿨렐레",
      "보컬 / 실용음악 / 발성",
      "작곡 / 음악이론 / 송라이팅",
    ],
  },
  {
    title: "레슨방법",
    icon: "📚",
    items: ["개인레슨", "그룹레슨", "출장레슨"],
  },
];

export const lessonDetails = [
  "1:1 개인레슨을 기본으로 하며, 레슨시간은 회당 50분입니다.",
  "그룹레슨의 경우 2 / 3 / 4인 구성으로 Class를 만들 수 있습니다. 단, 개인이 직접 그룹을 만들어야 합니다.",
  "레슨은 등록된 기간 안에 횟수 차감제로 진행됩니다.",
  "레슨은 주 1회를 기본으로 하되 본인의 필요에 따라 주 2회 / 3회도 가능합니다. 등록한 레슨기간이 수업횟수만큼 차감됩니다.",
  "스케줄은 선생님과 상의하여 고정 시간을 정하여 진행합니다. 부득이하게 스케줄을 바꾸거나 연기할 경우 하루 전날 연락하여 조정하시면 됩니다. 무단결석, 당일 취소는 수업횟수가 차감됩니다.",
];

export const youtubeVideos = [
  {
    src: "https://www.youtube.com/embed/JfZmw1YOxZI",
    title: "기타연주 - 아름다운 마음들이",
  },
  {
    src: "https://www.youtube.com/embed/T2LJmamoa9I",
    title: "기타연주 - 서정소곡",
  },
];
