// src/components/common/card/Card.tsx
"use client";

import Checkbox from "@components/ui/input/Checkbox";
import { Tag } from "@components/ui/tabs";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@utils/cn";

import type { CardProps } from "./Card.type";

const FALLBACK_IMAGE = "/fallback-image.svg";

const Card = ({
  handleHeartChange,
  tags = [],
  imageUrl,
  isLiked,
  price,
  name,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div className="w-[308px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-default">
        <Checkbox
          className="absolute top-[16px] right-[16px] m-2 h-[32px] w-[32px]"
          onChange={(e) => handleHeartChange && handleHeartChange(e)}
          checked={isLiked}
          type="heart"
          name="heart"
          id="heart"
        />
        <Image
          className={cn(
            imageUrl ? "h-full w-full object-contain" : "object-cover",
          )}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          src={imgSrc ?? FALLBACK_IMAGE}
          height={120}
          width={120}
          alt={name}
        />
      </div>

      {/* 카드 하단 부분 */}
      <div className="rounded-lg border border-border-default">
        {/* 태그 */}
        <div className="flex flex-wrap gap-1 px-3 py-2">
          {tags.map((tag, i) => (
            <Tag key={`${tag}-${i}`} text={tag} size="sm" />
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
