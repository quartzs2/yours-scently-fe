import { Star } from "lucide-react";
import { cn } from "@utils/cn";

type StarRatingProps = {
  filledColor?: string;
  emptyColor?: string;
  maxRating?: number;
  className?: string;
  rating: number;
  size?: number;
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

const StarRating = ({
  filledColor = "text-system-warning",
  emptyColor = "text-system-warning",
  maxRating = 5,
  size = 24,
  className,
  rating,
}: StarRatingProps) => {
  const starIconProps = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    size: size,
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));

    return (
      <div
        className={cn("relative inline-block")}
        style={{ height: size, width: size }}
        key={index}
      >
        <Star
          {...starIconProps}
          className={cn(emptyColor, "absolute top-0 left-0")}
          fill="none"
        />
        <div
          style={{ width: `${fillPercentage}%`, height: size }}
          className="absolute top-0 left-0 overflow-hidden"
        >
          <Star
            {...starIconProps}
            className={cn(filledColor, "absolute top-0 left-0")}
            fill="currentColor"
          />
        </div>
      </div>
    );
  });

  return (
    <div
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      className={cn("flex items-center", className)}
      role="img"
    >
      {stars}
    </div>
  );
};

export default StarRating;
