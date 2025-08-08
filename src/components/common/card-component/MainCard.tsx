"use client";

import type { CardProps } from "@custom-types/MainCard.type";

import Checkbox from "@components/ui/input/Checkbox";
import { Tag } from "@components/ui/tabs";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@utils/cn";

const FALLBACK_IMAGE = "/fallback-image.svg";

const Card = ({
  handleHeartChange,
  item,
}: {
  handleHeartChange?: CardProps["handleHeartChange"];
  item?: Omit<CardProps, "handleHeartChange">;
}) => {
  const [imgSrc, setImgSrc] = useState(item?.imageUrl);

  if (!item) {
    return null;
  }

  return (
    <div className="w-[308px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-default">
        <Checkbox
          className="absolute top-[16px] right-[16px] m-2 h-[32px] w-[32px]"
          onChange={(e) => handleHeartChange && handleHeartChange(e)}
          checked={item?.isLiked || false}
          type="heart"
          name="heart"
          id="heart"
        />
        <Image
          className={cn(
            item?.imageUrl ? "h-full w-full object-contain" : "object-cover",
          )}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          src={imgSrc ?? FALLBACK_IMAGE}
          alt={item.name}
          height={120}
          width={120}
        />
      </div>

      {/* 카드 하단 부분 */}
      <div className="rounded-lg border border-border-default">
        {/* 태그 */}
        <div className="flex flex-wrap gap-1 px-3 py-2">
          {item.tags.map((tag, i) => (
            <Tag key={`${tag}-${i}`} text={tag} size="sm" />
          ))}
        </div>
        {/* 본문 */}
        <div className="px-3 pb-4">
          <h3 className="text-body-1 truncate">{item.name}</h3>
          <p className="text-body-1">{item.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
