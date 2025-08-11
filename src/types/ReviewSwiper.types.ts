import type { ReviewCardProps } from "@custom-types/ReviewCard.types";

export type ReviewSwiperProps = {
  items: ReviewCardProps[];
  withNavigation?: boolean;
  withPagination?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
  autoplay?: boolean;
};
