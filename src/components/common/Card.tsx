"use client";

import IconButton from "@components/ui/IconButton";
import { Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export type CardProps = {
  imageUrl?: string;
  tags?: string[];
  price: number;
  name: string;
};

const ICON_HEART_STYLE = "absolute top-2 right-2 border-primary-main";
const FALLBACK_IMAGE = "/fallback-image.svg";

const Card = ({ tags = [], imageUrl, price, name }: CardProps) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const isFallback = FALLBACK_IMAGE;

  return (
    <div className="w-[250px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-default">
        <Image
          style={{ objectFit: isFallback ? "contain" : "cover" }}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          src={imgSrc ?? "/fallback-image.svg"}
          height={isFallback ? 80 : undefined}
          width={isFallback ? 80 : undefined}
          fill={!isFallback}
          alt={name}
        />

        <IconButton
          iconClassName={ICON_HEART_STYLE}
          aria-label="좋아요 버튼"
          As={Heart}
        />
      </div>

      {/* 카드 하단 부분 */}
      <div className="rounded-lg border border-border-default">
        {/* 태그 */}
        {/* TODO: 추후 태그 컴포넌트로 변경*/}
        <div className="flex flex-wrap gap-1 px-3 py-2">
          {tags.map((tag, i) => (
            <span
              className="text-caption rounded-full border border-primary-main px-2 py-1"
              key={`${tag}-${i}`}
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
