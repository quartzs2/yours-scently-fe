// src/components/common/card-swiper/CardSwiper.tsx
"use client";

import type { CardSwiperProps } from "@custom-types/CardSwiper.types";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "@components/common/card-component/MainCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { cn } from "@utils/cn";

const CardSwiper = ({
  withNavigation = false,
  withPagination = false,
  spaceBetween = 10,
  autoplay = true,
  className = "",
  items,
}: CardSwiperProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Swiper
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
        navigation={withNavigation}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Card {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSwiper;
