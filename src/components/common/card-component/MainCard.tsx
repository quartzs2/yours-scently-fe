// MainCard.tsx
"use client";

import type { MainCardProps } from "@custom-types/MainCard.type";

import Checkbox from "@components/ui/input/Checkbox";
import { useEffect, useState } from "react";
import { Tag } from "@components/ui/tabs";
import Image from "next/image";
import { cn } from "@utils/cn";

const FALLBACK_IMAGE = "/fallback-image.svg";

type Props = {
  item?: Omit<MainCardProps, "handleHeartChange">;
  onCheckChange?: (checked: boolean) => void;
  onCardClick?: () => void; // 선택: 카드 전체 클릭 이동용
  checked?: boolean;
};

const MainCard = ({
  checked = false,
  onCheckChange,
  onCardClick,
  item,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(item?.imageUrl);

  useEffect(() => {
    setImgSrc(item?.imageUrl);
  }, [item?.imageUrl]);

  if (!item) return null;

  return (
    <div
      className="flex w-full cursor-pointer flex-col"
      role={onCardClick ? "button" : undefined}
      tabIndex={onCardClick ? 0 : -1}
      onClick={onCardClick}
    >
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-2xl border border-border-default">
        <Checkbox
          className="absolute top-[8px] right-[8px] z-10 m-1 h-[24px] w-[24px]"
          onChange={(e) => onCheckChange?.(e.target.checked)}
          id={`heart-${item.id}`}
          checked={checked}
          type="heart"
          name="heart"
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
      <div className="flex flex-grow flex-col justify-between rounded-2xl border border-border-default bg-bg-default">
        <div className="flex flex-wrap gap-1 px-3 py-2">
          {item.tags.map((tag, i) => (
            <Tag key={`${tag}-${i}`} text={tag} size="sm" />
          ))}
        </div>
        <div className="min-h-[72px] px-3 pb-4">
          <h3 className="text-body-1 truncate">{item.name}</h3>
          <p className="text-body-1">{item.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
