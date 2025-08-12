"use client";

import type { MainCardProps } from "@custom-types/MainCard.type";

import CardSwiper from "@components/common/card-swiper/CardSwiper";
import MainCard from "@components/common/card-component/MainCard";

export default function PersonalizedProducts() {
  const items: MainCardProps[] = [
    {
      imageUrl: "/mock/best-review/perfume1.png",
      tags: ["몽환적", "고급스러움", "100mL"],
      handleHeartChange: () => {},
      name: "Baccarat Rouge 540",
      isLiked: false,
      price: 462000,
      id: "1",
    },
    {
      imageUrl: "/mock/best-review/perfume2.png",
      name: "Coco Mademoiselle(오 드 퍼퓸)",
      tags: ["여성스러움", "세련됨", "50mL"],
      handleHeartChange: () => {},
      price: 166000,
      isLiked: true,
      id: "2",
    },
    {
      imageUrl: "/mock/best-review/perfume3.png",
      tags: ["상쾌함", "남성미", "100mL"],
      handleHeartChange: () => {},
      name: "Sauvage(소바쥬)",
      isLiked: false,
      price: 228000,
      id: "3",
    },
    {
      imageUrl: "/mock/best-review/perfume4.png",
      tags: ["우디", "부드러움", "100mL"],
      handleHeartChange: () => {},
      name: "Santal 33",
      isLiked: false,
      price: 442000,
      id: "4",
    },
    {
      imageUrl: "/mock/best-review/perfume5.png",
      tags: ["자유로움", "따뜻함", "100mL"],
      handleHeartChange: () => {},
      name: "Gypsy Water",
      isLiked: false,
      price: 303000,
      id: "5",
    },
  ];

  return (
    <section className="relative flex h-[540px] items-center justify-center border-b border-border-default select-none">
      <div className="absolute flex w-full max-w-[var(--width-container)] flex-col items-start justify-start gap-8 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <h2 className="text-subtitle-2">센틀리가 추천하는 향수</h2>

        <CardSwiper
          withNavigation={false}
          withPagination={false}
          spaceBetween={4}
          autoplay={true}
          items={items}
        >
          <MainCard />
        </CardSwiper>
      </div>
    </section>
  );
}
