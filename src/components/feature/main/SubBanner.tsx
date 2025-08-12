"use client";

import Button from "@components/ui/Button";
import { IMAGES } from "@constants/urls";
import Image from "next/image";

export default function SubBanner() {
  return (
    <section className="relative flex h-[400px] items-center justify-center select-none">
      <Image
        alt="Sub banner background"
        src={IMAGES.SUB_BANNER_BG}
        className="object-cover"
        priority
        fill
      />

      <div className="absolute flex w-full max-w-[var(--width-container)] flex-col items-start justify-start gap-12 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <div className="flex flex-col gap-6">
          <h2 className="text-subtitle-2">
            지금 가장 사랑받는 향, 여기에 다 있어요
          </h2>
          <div className="text-body-1 line-clamp-3 text-text-secondary">
            <p>꾸준히 사랑받는 베스트 향수부터</p>
            <p>이번 달 새롭게 출시된 신상 향기까지.</p>
            <p>당신의 취향을 저격할 선택은?</p>
          </div>
        </div>
        <Button shape="pill" size="xl">
          바로가기
        </Button>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex w-full max-w-[var(--width-container)] justify-end sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
          <div className="flex flex-col gap-4">
            <div className="relative h-[246px] w-[246px] overflow-hidden rounded-md">
              <Image
                src={IMAGES.SUB_BANNER_PROMO}
                alt="SUMMER 향기전 최대 25% OFF"
                className="object-cover"
                fill
              />
              <div className="text-caption absolute top-4/5 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white">
                <p>상큼한 시트러스부터 시원한 머스크까지</p>
                <p>여름에만 만날 수 있는 특별한 향</p>
              </div>
            </div>

            <div className="relative h-[98px] w-[246px] overflow-hidden rounded-md">
              <Image
                src={IMAGES.SUB_BANNER_SAMPLE}
                className="object-cover"
                alt="샘플 신청 배너"
                fill
              />
              <div className="text-caption absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white">
                <p className="pb-2">당신의 취향에 맞는 향, 먼저 경험해보세요</p>
                <Button aria-label="샘플 신청 바로가기" shape="pill" size="sm">
                  바로가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
