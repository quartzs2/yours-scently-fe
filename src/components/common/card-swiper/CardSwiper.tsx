// src/components/common/card-swiper/CardSwiper.tsx
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
  children: React.ReactElement<{ item: T }>;
  item: T[];
} & Omit<CardSwiperProps, "items">;

/**
 * 주어진 자식 컴포넌트를 사용하여 아이템 목록을 렌더링하는 제네릭 Swiper 컴포넌트입니다.
 * 'swiper/react' 라이브러리를 사용하는 클라이언트 측 컴포넌트입니다.
 *
 * @example
 * // MyCard 컴포넌트와 데이터 배열을 준비합니다.
 * import MyCard from "./MyCard";
 * const myData = [
 * { id: "1", title: "첫 번째 카드", content: "React" },
 * { id: "2", title: "두 번째 카드", content: "TypeScript" },
 * { id: "3", title: "세 번째 카드", content: "Next.js" },
 * { id: "4", title: "네 번째 카드", content: "Tailwind CSS" },
 * ];
 *
 * // CardSwiper 컴포넌트를 사용하여 슬라이드를 렌더링합니다.
 * // withNavigation prop을 사용하여 화살표를 표시합니다.
 * // children prop에 <MyCard /> 컴포넌트를, item prop에 myData 배열을 전달합니다.
 * <CardSwiper withNavigation item={myData}>
 * <MyCard />
 * </CardSwiper>
 *
 * @example
 * // 페이지네이션과 자동 재생 기능을 활성화하여 사용합니다.
 * // withPagination, autoplay prop을 true로 설정합니다.
 * <CardSwiper withPagination autoplay={true} item={myData}>
 * <MyCard />
 * </CardSwiper>
 */
const CardSwiper = <T extends { id: string | number }>({
  withNavigation = false,
  withPagination = false,
  spaceBetween = 10,
  autoplay = true,
  className = "",
  children,
  item,
}: SwiperWithChildrenProps<T>) => {
  return (
    <div className={cn("card-swiper-container relative w-full", className)}>
      <Swiper
        navigation={
          withNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        autoplay={
          autoplay
            ? {
                disableOnInteraction: false,
                delay: 3000,
              }
            : false
        }
        breakpoints={{
          1024: { slidesPerView: 4 },
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
        }}
        pagination={withPagination ? { clickable: true } : false}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={"auto"}
      >
        {item.map((item) => (
          <SwiperSlide key={item.id}>
            {React.cloneElement(children, { item: item })}
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
