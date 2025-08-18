"use client";

import Checkbox from "@components/ui/input/Checkbox";
import { useEffect, useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/fallback-image.svg";

type PreferenceItemCardProps = {
  handleCheckboxChange: (id: number) => void;
  isChecked: boolean;
  imageUrl?: string;
  brand: string;
  name: string;
  type: string;
  id: number;
};

const PreferenceCard = ({
  handleCheckboxChange,
  isChecked,
  imageUrl,
  brand,
  name,
  type,
  id,
}: PreferenceItemCardProps) => {
  const [imgSrc, setImgSrc] = useState(
    imageUrl && imageUrl.trim() !== "" ? imageUrl : FALLBACK_IMAGE,
  );

  return (
    <div className="mr-2 flex w-[362px] max-w-md items-center justify-between gap-2 rounded-md">
      {/* 이미지 + 체크박스*/}
      <div className="relative h-[112px] w-[112px] shrink-0 rounded border border-border-default">
        <Checkbox
          className="absolute top-[4px] left-[4px] h-[24px] w-[24px]"
          onChange={() => handleCheckboxChange(id)}
          name={`checkbox-${id}`}
          id={`checkbox-${id}`}
          checked={isChecked}
          type="checkbox1"
        />
        <Image
          className="h-full w-full rounded object-cover"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          src={imgSrc}
          height={112}
          width={112}
          alt={name}
        />
      </div>
      <div className="flex h-[56px] w-[226px] items-center justify-between">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex h-[56px] w-[170px] min-w-[100px] flex-col justify-center gap-2">
          {/* 브랜드 */}
          <span className="align-middle text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
            {brand}
          </span>
          {/* 상품명 */}
          <span className="text-body-1 line-clamp-1 text-text-primary">
            {name}
          </span>
        </div>
        {/* 오른쪽 원형 설문*/}
        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-text-secondary p-[8px] opacity-100">
          <span className="text-body-2 text-bg-default">{type}</span>
        </div>
      </div>
    </div>
  );
};
export default PreferenceCard;
