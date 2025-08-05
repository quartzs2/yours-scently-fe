import { CardProps } from "@components/common/Card";

export const cardMockData: CardProps[] = [
  {
    handleHeartChange: () => {},
    imageUrl: "/globe.svg",
    tags: ["플로럴", "데일리"],
    name: "라튤립 오 드 퍼퓸",
    isLiked: false,
    price: 12900,
  },
  {
    handleHeartChange: () => {},
    imageUrl: "/globe.svg",
    name: "우드 세이지 앤 씨 솔트",
    tags: ["시트러스", "프레시"],
    isLiked: true,
    price: 24900,
  },
  {
    tags: ["머스크", "유니섹스", "시그니처"],
    handleHeartChange: () => {},
    imageUrl: "/globe.svg",
    name: "르 라보 상탈 33",
    isLiked: false,
    price: 31900,
  },
  {
    handleHeartChange: () => {},
    imageUrl: "/globe.svg",
    tags: ["관능적", "강렬함"],
    name: "톰 포드 블랙 오키드",
    isLiked: true,
    price: 18900,
  },
  {
    handleHeartChange: () => {},
    imageUrl: "/globe.svg",
    tags: ["관능적", "강렬함"],
    name: "가나다라마바사",
    isLiked: true,
    price: 32900,
  },
];
