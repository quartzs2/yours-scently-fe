// src/components/common/card-swiper/CardSwiper.types.ts
import type { CardProps } from "@custom-types/Card.type";

export type CardSwiperProps = {
  withNavigation?: boolean;
  withPagination?: boolean;
  spaceBetween?: number;
  items: CardProps[];
  autoplay?: boolean;
  className?: string;
};
