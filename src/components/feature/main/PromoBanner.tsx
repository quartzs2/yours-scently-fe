"use client";

import type { MainCardProps } from "@custom-types/MainCard.type";

import MainCard from "@components/common/card-component/MainCard";
import Button from "@components/ui/Button";
import { URLS } from "@constants/urls";
import Image from "next/image";

const PROMO_BANNER_BG_IMG = "/images/promo-banner-bg-img.png";

const sampleCards: Omit<MainCardProps, "handleHeart">[] = [
  {
    imageUrl: "/mock/best-review/sample1.png",
    tags: ["시트러스", "프레시", "젠더리스"],
    name: "CK ONE",
    isLiked: false,
    price: 76000,
    id: "1",
  },
  {
    imageUrl: "/mock/best-review/sample2.png",
    name: "Acqua di Gio Pour Homme",
    tags: ["아쿠아틱", "시트러스", "쿨린"],
    isLiked: true,
    price: 116000,
    id: "2",
  },
  {
    imageUrl: "/mock/best-review/sample3.png",
    name: "Wood Sage & Sea Salt",
    tags: ["프레쉬", "머린", "우디"],
    isLiked: false,
    price: 162000,
    id: "3",
  },
];

export default function PromoBanner() {
  return (
    <section className="relative flex h-[480px] items-center justify-center px-6 select-none">
      <Image
        sizes="(max-width: 768px) 100vw, 50vw"
        alt="운동 후 산뜻한 향기를 표현한 프로모션 배경 이미지"
        style={{ objectFit: "cover" }}
        src={PROMO_BANNER_BG_IMG}
        priority
        fill
      />

      <div className="relative z-10 flex w-full max-w-[var(--width-container)] gap-12 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <div className="flex w-[272px] flex-col justify-center gap-6">
          <h2 className="text-subtitle-2">운동 후 산뜻하게</h2>
          <div className="text-body-2 text-text-secondary">
            <p>땀을 식히고, 기분까지 리프레시되는 향이 필요할 때.</p>
            <p>샤워 후 한 번의 분사만으로 상쾌함이 오래 지속되는</p>
            <p>운동 후에 딱 어울리는 향수를 소개합니다.</p>
          </div>
          {/* href 속성으로 링크 연결 */}
          <Button href={URLS.PROMOTION} shape="pill">
            더 알아보기
          </Button>
        </div>

        {/* 카드 리스트 (오른쪽) */}
        <div className="flex flex-[2] flex-row gap-4 overflow-hidden">
          {sampleCards.map((card) => (
            <div
              className="max-w-[calc((100%/3)-0.5rem)] flex-grow basis-0"
              key={card.id}
            >
              <MainCard item={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
