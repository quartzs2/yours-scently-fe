export type MainCardProps = {
  handleHeartChange?: (checked: boolean) => void;
  imageUrl?: string;
  isLiked?: boolean;
  tags: string[];
  price: number;
  name: string;
  id: string;
};
