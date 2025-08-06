import type { ReviewCardProps } from "@components/common/ReviewCard";

export type ReviewSwiperProps = {
  items: ReviewCardProps[];
  withNavigation?: boolean;
  withPagination?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  className?: string;
  autoplay?: boolean;
};
