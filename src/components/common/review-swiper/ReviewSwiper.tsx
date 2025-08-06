"use client";

import type { ReviewSwiperProps } from "@custom-types/ReviewSwiper.types";

import ReviewCard from "@components/common/review-card/ReviewCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { cn } from "@utils/cn";

const ReviewSwiper = ({
  withNavigation = false,
  withPagination = false,
  spaceBetween = 10,
  autoplay = true,
  className,
  items,
}: ReviewSwiperProps) => {
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
          1024: { slidesPerView: 4.5 },
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
        }}
        pagination={withPagination ? { clickable: true } : false}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        navigation={withNavigation}
      >
        {items.map((item, index) => (
          <SwiperSlide key={`review-slide-${index}`}>
            <ReviewCard {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSwiper;
