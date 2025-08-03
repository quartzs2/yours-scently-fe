"use client";

import { Tag } from "@components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";

type ReviewListCardProps = {
  imageUrl?: string;
  tags?: string[];
  timeAgo: string;
  rating: number;
  review: string;
  writer: string;
  date: string;
};

/** ReviewListCard 컴포넌트
 * 
 * @param imageUrl - "/images/product.png"
 * @param rating - 리뷰 평점을 나타낼 때 숫자형
 * @param tags - 태그 배열
 * @param review - 사용자가 작성하는 리뷰 텍스트
 * @param writer - 작성자 이름
 * @param date - 날짜
 * @param timeAgo - 작성 시점 경과된 시간
 * 
 * @example
 * <ReviewlistCard
    imageUrl=""
    rating={5}
    tags={["향기로움", "은은함"]}
    review="Lorem ipsum dolor sit amet consectetur. Et malesuada amet porttitor odio vel euismod vitae mi suspendisse."
    writer="양단비"
    date="0000-00-00"
    timeAgo="3시간 전"
    />
 */

const ReviewListCard = ({
  tags = [],
  imageUrl,
  timeAgo,
  rating,
  review,
  writer,
  date,
}: ReviewListCardProps) => {
  return (
    <div className="bg-subtle flex w-full items-start space-x-4 rounded-xl p-4">
      {/* 좌측 썸네일 */}
      <div className="bg-subtle h-[170px] w-[170px] flex-shrink-0 overflow-hidden rounded-xl">
        {imageUrl ? (
          <Image
            className="h-full w-full object-cover"
            src={imageUrl}
            alt="리뷰 이미지"
            height={70}
            width={70}
          />
        ) : (
          <div className="h-full w-full bg-bg-subtle" />
        )}
      </div>

      {/* 우측 텍스트 내용 */}
      <div className="text-body-1 flex flex-grow flex-col">
        {/* 별점 & 태그 */}
        <div className="text-primary flex items-center">
          {/* 별점 */}
          <div className="flex space-x-1 text-system-warning">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                fill={i < rating ? "currentColor" : "none"}
                className="h-[24px] w-[24px]"
                strokeWidth={1.5}
                size={14}
                key={i}
              />
            ))}
          </div>

          {/* 태그들 + 작성자*/}
          <div className="flex flex-wrap gap-4 px-3 py-2">
            {tags.map((tag, i) => (
              <Tag key={`${tag}-${i}`} text={tag} size="sm" />
            ))}
          </div>
          <span className="text-body-1 ml-auto flex justify-between text-text-secondary">
            {writer}
          </span>
        </div>

        {/* 리뷰 본문 */}
        <p className="text-primary text-body-1 line-clamp-3 leading-tight">
          {review}
        </p>

        {/* 날짜 */}
        <div className="text-body-2 ml-auto flex justify-between pt-1 text-text-secondary">
          <span>
            {date} {timeAgo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewListCard;
