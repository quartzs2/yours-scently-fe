"use client";

// 타입 import는 value import보다 위에 위치
import type { MainCardProps } from "@custom-types/MainCard.type";

import Checkbox from "@components/ui/input/Checkbox";
import { useEffect, useState } from "react";
import { Tag } from "@components/ui/tabs";
import Image from "next/image";
import { cn } from "@utils/cn";

const FALLBACK_IMAGE = "/fallback-image.svg";

const MainCard = ({
  handleHeartChange,
  item,
}: {
  handleHeartChange?: MainCardProps["handleHeartChange"];
  item?: Omit<MainCardProps, "handleHeartChange">;
}) => {
  const [imgSrc, setImgSrc] = useState(item?.imageUrl);

  useEffect(() => {
    setImgSrc(item?.imageUrl);
  }, [item?.imageUrl]);

  if (!item) return null;

  return (
    <div className="w-full max-w-[308px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 aspect-[308/308] w-full overflow-hidden rounded-2xl border border-border-default">
        <Checkbox
          className="absolute top-[8px] right-[8px] z-10 m-1 h-[24px] w-[24px]"
          onChange={(e) => handleHeartChange && handleHeartChange(e)}
          checked={item.isLiked || false}
          type="heart"
          name="heart"
          id="heart"
        />
        <Image
          className={cn(
            item.imageUrl ? "object-contain" : "object-cover",
            "z-0",
          )}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          sizes="(max-width: 308px) 100vw, 308px"
          src={imgSrc ?? FALLBACK_IMAGE}
          alt={item.name}
          fill
        />
      </div>

      {/* 카드 하단 부분 */}
      <div className="rounded-2xl border border-border-default bg-bg-default">
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

export default MainCard;
