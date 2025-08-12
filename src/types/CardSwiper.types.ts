import type { MainCardProps } from "@custom-types/MainCard.type";

export type CardSwiperProps = {
  slidesPerView?: number | "auto";
  withNavigation?: boolean;
  withPagination?: boolean;
  items: MainCardProps[];
  spaceBetween?: number;
  autoplay?: boolean;
  className?: string;
};
