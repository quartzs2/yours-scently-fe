export type MainCardProps = {
  handleHeartChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
  isLiked?: boolean;
  tags: string[];
  price: number;
  name: string;
  id: string;
};
