"use client";

import { CardSwiperProps } from "@components/common/card-swiper/CardSwiper.types";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperSlide, Swiper } from "swiper/react";
import Card from "@components/common/Card";
import { cn } from "@utils/cn";

const CardSwiper = ({
  withNavigation = false,
  withPagination = false,
  slidesPerView = 4,
  spaceBetween = 10,
  className,
  items,
}: CardSwiperProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      <Swiper
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          disableOnInteraction: false,
          delay: 3000, // 3초마다 자동 슬라이드
        }}
        pagination={withPagination ? { clickable: true } : false}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        navigation={withNavigation}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`card-slide-${index}`}>
            <Card {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardSwiper;
