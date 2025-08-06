// src/components/common/card/Card.type.ts
export type CardProps = {
  handleHeartChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
  isLiked: boolean;
  tags?: string[];
  price: number;
  name: string;
  id: string; // SwiperSlide key용 필수
};
