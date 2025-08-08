// src/components/common/card-swiper/CardSwiper.types.ts
import type { MainCardProps } from "@custom-types/MainCard.type";

export type CardSwiperProps = {
  withNavigation?: boolean;
  withPagination?: boolean;
  items: MainCardProps[];
  spaceBetween?: number;
  autoplay?: boolean;
  className?: string;
};
