import { StarHalf, Star } from "lucide-react";
import Icon from "@components/ui/Icon";

export type StarRatingProps = {
  rating: number;
};

/**
 * 별점 표시 컴포넌트
 *
 * 0.5 단위의 평점을 시각적으로 별 아이콘으로 보여줍니다.
 *
 * @param rating - 0~5 범위의 평점 숫자 (예: 3.5)
 *
 * @example
 * <StarRating rating={4.5} />
 */
export const StarRating = ({ rating }: StarRatingProps) => {
  const full = Math.floor(rating);
  const isHalf = rating % 1 === 0.5;

  return (
    <div
      className="inline-flex items-center space-x-0.5"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[...Array(full)].map((_, i) => (
        <Icon
          className="fill-yellow-400 text-yellow-400"
          aria-hidden="true"
          key={`full-${i}`}
          As={Star}
        />
      ))}
      {isHalf && (
        <Icon
          className="fill-yellow-400 text-yellow-400"
          aria-hidden="true"
          As={StarHalf}
          key="half"
        />
      )}
    </div>
  );
};

export default StarRating;
