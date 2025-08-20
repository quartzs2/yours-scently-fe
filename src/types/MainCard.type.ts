export type MainCardProps = {
  handleHeartChange?: (checked: boolean) => void;
  image_url?: string;
  isLiked?: boolean;
  tags: string[];
  price: number;
  name: string;
  id: string;
};
