"use client";

import type { CardSwiperProps } from "@custom-types/CardSwiper.types";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide, Swiper } from "swiper/react";
import { cn } from "@utils/cn";
import React from "react";

type SwiperWithChildrenProps<T> = {
  /**
   * 카드 하나를 렌더링할 React 요소 (item prop으로 현재 아이템 받음)
   */
  children: React.ReactElement<{ item: T }>;
  /**
   * 한 화면에 보여줄 슬라이드 개수 (number 또는 'auto')
   */
  slidesPerView?: number | "auto";
  /**
   * 슬라이드에 렌더링할 아이템 배열, 각 아이템은 반드시 id 포함
   */
  items: T[];
} & Omit<CardSwiperProps, "slidesPerView" | "items">;

/**
 * 범용 카드 스와이퍼 컴포넌트
 *
 * @template T - 아이템 타입 (id 필수)
 * @param withNavigation - 네비게이션 화살표 노출 여부 (기본 false)
 * @param withPagination - 페이지네이션 노출 여부 (기본 false)
 * @param slidesPerView - 한 화면 슬라이드 수 (기본 3)
 * @param spaceBetween - 슬라이드 간격 (기본 8)
 * @param autoplay - 자동 재생 여부 (기본 true)
 * @param className - 추가 CSS 클래스
 * @param children - 각 슬라이드에 렌더링할 카드 컴포넌트 (item prop으로 아이템 받음)
 * @param items - 슬라이드 데이터 배열
 *
 * @example
 * ```tsx
 * <CardSwiper
 *   withPagination={true}
 *   autoplay={true}
 *   items={myData}
 * >
 *   <MyCard />
 * </CardSwiper>
 * ```
 */
const CardSwiper = <T extends { id: string | number }>({
  withNavigation = false,
  withPagination = false,
  slidesPerView = 3,
  spaceBetween = 8,
  autoplay = true,
  className,
  children,
  items,
}: SwiperWithChildrenProps<T>) => {
  return (
    <div className={cn("card-swiper-container relative w-full", className)}>
      <Swiper
        breakpoints={{
          1024: { slidesPerView: 4.5, spaceBetween: 8 },
          1232: { slidesPerView: 4, spaceBetween: 8 },
          640: { slidesPerView: 3, spaceBetween: 8 },
          320: { slidesPerView: 2, spaceBetween: 8 },
        }}
        navigation={
          withNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        autoplay={
          autoplay ? { disableOnInteraction: false, delay: 3000 } : false
        }
        pagination={withPagination ? { clickable: true } : false}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
      >
        {items.map((item) => (
          <SwiperSlide className="flex justify-center" key={item.id}>
            {React.cloneElement(children, { item })}
          </SwiperSlide>
        ))}
      </Swiper>
      {withNavigation && (
        <>
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </>
      )}
    </div>
  );
};

CardSwiper.displayName = "CardSwiper";

export default CardSwiper;
