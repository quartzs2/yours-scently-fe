"use client";

import { Heart } from "lucide-react";

export type CardProps = {
  imageUrl?: string;
  tags?: string[];
  price: number;
  name: string;
};

const Card = ({ tags = [], imageUrl, price, name }: CardProps) => {
  return (
    <div className="w-[250px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-default">
        {imageUrl ? (
          <img
            className="h-full w-full object-cover"
            src={imageUrl}
            alt={name}
          />
        ) : (
          <span className="text-sm">이미지 없음</span>
        )}
        <Heart className="absolute top-2 right-2 cursor-pointer border-primary-main" />
      </div>

      {/* 카드 하단 부분 */}
      <div className="rounded-lg border border-border-default">
        {/* 태그 */}
        <div className="flex flex-wrap gap-1 px-3 py-2">
          {tags.map((tag, i) => (
            <span
              className="text-caption rounded-full border border-primary-main px-2 py-1"
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* 본문 */}
        <div className="px-3 pb-4">
          <h3 className="text-body-1 truncate">{name}</h3>
          <p className="text-body-1">{price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
