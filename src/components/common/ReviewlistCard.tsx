"use client";

import { Tag } from "@components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";

type ReviewListCardProps = {
  imageUrls?: string[];
  tags?: string[];
  timeAgo: string;
  rating: number;
  review: string;
  writer: string;
  date: string;
};

const FALLBACK_IMAGE = "/fallback-image.svg";

const ReviewListCard = ({
  tags = [],
  imageUrls,
  timeAgo,
  rating,
  review,
  writer,
  date,
}: ReviewListCardProps) => {
  const sources = (imageUrls ?? []).filter(Boolean); // 최대 2장까지만 처리
  const hasImages = sources.length > 0;

  return (
    <div className="bg-subtle flex w-full items-start gap-4 rounded-xl p-4">
      {/* 좌측 썸네일 (이미지 있을 때만) */}
      {hasImages && (
        <div
          className={`bg-subtle relative shrink-0 overflow-hidden rounded-xl ${sources.length === 1 ? "h-[170px] w-[170px]" : "h-[170px] w-[340px]"}`}
        >
          {sources.length === 1 ? (
            // 1장일 때
            <Image
              onError={(e) => ((e.currentTarget as any).src = FALLBACK_IMAGE)}
              className="object-cover"
              src={sources[0]}
              sizes="170px"
              alt="리뷰 이미지"
              fill
            />
          ) : (
            // 2장일 때
            <div className="grid h-full w-full grid-cols-2 gap-2">
              {sources.slice(0, 2).map((src, i) => (
                <div className="relative h-full w-full" key={i}>
                  <Image
                    onError={(e) =>
                      ((e.currentTarget as any).src = FALLBACK_IMAGE)
                    }
                    className="object-cover"
                    alt={`리뷰 이미지 ${i + 1}`}
                    sizes="170px"
                    src={src}
                    fill
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 우측 텍스트 영역 */}
      <div className="text-body-1 flex flex-grow flex-col">
        {/* 별점/태그/작성자 */}
        <div className="text-primary flex items-center">
          <div className="flex space-x-1 text-system-warning">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                fill={i < rating ? "currentColor" : "none"}
                className="h-[24px] w-[24px]"
                strokeWidth={1.5}
                key={i}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-3 py-2">
            {tags.map((tag, i) => (
              <Tag key={`${tag}-${i}`} text={tag} size="sm" />
            ))}
          </div>

          <span className="ml-auto text-text-secondary">{writer}</span>
        </div>

        {/* 본문 */}
        <p className="text-primary text-body-1 line-clamp-3 leading-tight">
          {review}
        </p>

        {/* 날짜/경과시간 */}
        <div className="text-body-2 ml-auto pt-1 text-text-secondary">
          {date} {timeAgo}
        </div>
      </div>
    </div>
  );
};

export default ReviewListCard;
