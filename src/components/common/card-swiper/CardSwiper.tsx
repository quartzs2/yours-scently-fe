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
  slidesPerView?: number | "auto";
  items: T[];
} & Omit<CardSwiperProps, "slidesPerView" | "items">;

const CardSwiper = <T extends { id: string | number }>({
  withNavigation = false,
  withPagination = false,
  slidesPerView = 3,
  spaceBetween = 8,
  autoplay = true,
  className = "",
  children,
  items,
}: SwiperWithChildrenProps<T>) => {
  return (
    <div
      className={cn(
        "card-swiper-container relative w-full overflow-hidden",
        className,
      )}
    >
      <Swiper
        breakpoints={{
          1024: { slidesPerView: 4.5, spaceBetween: 8 },
          320: { slidesPerView: 2, spaceBetween: 8 },
          640: { slidesPerView: 3, spaceBetween: 8 },
        }}
        autoplay={
          autoplay ? { disableOnInteraction: false, delay: 3000 } : false
        }
        pagination={withPagination ? { clickable: true } : false}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={slidesPerView}
        navigation={withNavigation}
        spaceBetween={spaceBetween}
        // wrapperClass는 따로 주지 않음 -> 기본 left 정렬 유지
      >
        {items.map((item) => (
          <SwiperSlide className="flex justify-center" key={item.id}>
            {React.cloneElement(children, { item })}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

CardSwiper.displayName = "CardSwiper";

export default CardSwiper;
