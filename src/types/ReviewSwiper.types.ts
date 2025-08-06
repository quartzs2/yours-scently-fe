import type { ReviewCardProps } from "@custom-types/ReviewCard.types";

export type ReviewSwiperProps = {
  items: ReviewCardProps[];
  withNavigation?: boolean;
  withPagination?: boolean;
  spaceBetween?: number;
  className?: string;
  autoplay?: boolean;
};
