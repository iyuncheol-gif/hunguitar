export type BlogPost = {
  title: string;
  description: string;
  image: string;
  link: string;
  tag: string;
};

export const featuredContent: BlogPost = {
  title: "은퇴 후 취미로 기타배우기",
  description: "90세 회원님과 함께하는 기타 레슨. 나이는 숫자에 불과합니다.",
  image: "/assets/img/contents/01.jpg",
  link: "https://blog.naver.com/hun_guitar",
  tag: "Featured",
};

export const blogPosts: BlogPost[] = [
  {
    title: "직장인 취미기타 수업 OPEN!",
    description: "퇴근 후 스트레스 날리기",
    image: "/assets/img/contents/02.jpg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "신규",
  },
  {
    title: "벚꽃엔딩 기타 악보 무료공개",
    description: "입문자도 가능한 연주법 & 봄 감성곡",
    image: "/assets/img/home/bg.jpg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "인기",
  },
  {
    title: "산골소년의 사랑이야기 기타 연주법",
    description: "폭싹 속았수다 주연 배우 커버곡",
    image: "/assets/img/contents/03.jpeg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "추천",
  },
  {
    title: "Bruno Major 'Nothing' 연주법",
    description: "감성적인 연주를 하고 싶다면",
    image: "/assets/img/services/bg_03.jpg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "감성",
  },
  {
    title: "기타 초보자 추천 연습곡 Best 5",
    description: "쉽고 재밌는 곡으로 시작하세요",
    image: "/assets/img/services/bg_02.png",
    link: "https://blog.naver.com/hun_guitar",
    tag: "초보",
  },
  {
    title: "기타 넥이 휘었을 때 대처방법",
    description: "기타 관리 및 유지보수 팁",
    image: "/assets/img/contents/04.jpg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "관리",
  },
  {
    title: "기타를 대여 해드립니다",
    description: "회원 한정 기타 대여 서비스",
    image: "/assets/img/contents/05.jpeg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "서비스",
  },
  {
    title: "겨울방학특강! 정서적 부자 만들기",
    description: "기타레슨이 아이의 정서발달에 도움이 될까요?",
    image: "/assets/img/contents/06.jpg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "특강",
  },
  {
    title: "조옮김과 카포 사용법",
    description: "키가 맞지 않을 때 해결 방법",
    image: "/assets/img/gallery/01.jpeg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "팁",
  },
  {
    title: "통기타 종류와 바디 모양",
    description: "통기타 종류, 모양에 대해 알아보세요",
    image: "/assets/img/gallery/02.jpeg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "기타상식",
  },
  {
    title: "베이스기타 레슨!",
    description: "밴드에 들어가고 싶은 분들을 위한 레슨",
    image: "/assets/img/gallery/03.jpeg",
    link: "https://blog.naver.com/hun_guitar",
    tag: "베이스",
  },
];

export const INITIAL_DISPLAY_COUNT = 6;
