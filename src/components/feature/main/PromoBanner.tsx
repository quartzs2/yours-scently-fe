// src/components/promo-banner/PromoBanner.tsx
"use client";

import type { MainCardProps } from "@custom-types/MainCard.type";

import PromoBannerBgImg from "@assets/images/promo-banner-bg-img.png";
import CardSwiper from "@components/common/card-swiper/CardSwiper";
import MainCard from "@components/common/card-component/MainCard";
import Button from "@components/ui/Button";
import Image from "next/image";

const sampleCards: Omit<MainCardProps, "handleHeartChange">[] = [
  {
    imageUrl: "/mock/best-review/sample1.png",
    tags: ["시트러스", "프레시", "젠더리스"],
    name: "Fresh Sport",
    isLiked: false,
    price: 35000,
    id: "1",
  },
  {
    imageUrl: "/mock/best-review/sample2.png",
    tags: ["청량감", "피부 진정", "50ml"],
    name: "Calm Breeze",
    isLiked: true,
    price: 42000,
    id: "2",
  },
  {
    imageUrl: "/mock/best-review/sample3.png",
    tags: ["가벼움", "상쾌함", "80ml"],
    name: "Light Mist",
    isLiked: false,
    price: 28000,
    id: "3",
  },
];

export default function PromoBanner() {
  return (
    <section className="relative flex h-[560px] items-center justify-center select-none">
      <Image
        alt="Promo banner background"
        className="object-cover"
        src={PromoBannerBgImg}
        priority
        fill
      />

      {/* 설명+버튼 */}

      <div className="absolute flex w-full max-w-[var(--width-container)] flex-col items-start justify-start gap-12 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <div className="flex flex-col gap-6">
          <h2 className="text-subtitle-2">운동 후 산뜻하게</h2>
          <div className="text-body-2 line-clamp-3 text-text-secondary">
            <p>땀을 식히고, 기분까지 리프레시되는 향이 필요할 때.</p>
            <p>샤워 후 한 번의 분사만으로 상쾌함이 오래 지속되는</p>
            <p>운동 후에 딱 어울리는 향수를 소개합니다.</p>
          </div>
        </div>
        <Button shape="pill" size="xl">
          더 알아보기
        </Button>
      </div>

      {/* 카드 부분 */}
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="flex w-full max-w-[var(--width-container)] justify-end sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
          <div className="flex flex-col gap-4">
            <div className="relative left-1/11 w-[1028px] overflow-hidden rounded-md">
              <CardSwiper
                withPagination={false}
                withNavigation={true}
                items={sampleCards}
                spaceBetween={20}
                slidesPerView={3}
                autoplay={false}
              >
                <MainCard />
              </CardSwiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
