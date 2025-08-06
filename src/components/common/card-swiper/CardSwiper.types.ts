import { CardProps } from "@components/common/Card";

export type CardSwiperProps = {
  withNavigation?: boolean;
  withPagination?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  items: CardProps[]; // 카드 데이터 배열
  className?: string;
};
