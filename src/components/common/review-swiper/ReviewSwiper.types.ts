import type { ReviewCardProps } from "@components/common/review-card/ReviewCard.types";

export type ReviewSwiperProps = {
  items: ReviewCardProps[];
  withNavigation?: boolean;
  withPagination?: boolean;
  spaceBetween?: number;
  className?: string;
  autoplay?: boolean;
};
