"use client";

import IconButton from "@components/ui/IconButton";
import { Tag } from "@components/ui/tabs";
import { Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@utils/cn";

export type CardProps = {
  imageUrl?: string;
  tags?: string[];
  price: number;
  name: string;
};

const ICON_HEART_STYLE = "absolute top-2 right-2 border-primary-main";
const FALLBACK_IMAGE = "/fallback-image.svg";

/** Card 컴포넌트
 * @param tags - 문자열 배열. []로 설정한 이유는 부모 컴포넌트에서 tags를 전달하지 않아도 오류 없이 작동하도록하기 위함.
 * @param imageUrl - 카드에 표시할 이미지 경로
 * @param price - 숫자 타입의 가격
 * @param name - 상품 이름 또는 카드 제목 역할
 *
 * @example
 * <Card
 *   tags={['타이틀 이름름','타이틀 이름2']}
 *   imageUrl="/images/product.png"
 *   price={19990}
 *   name="상품 이름"
 * />
 */

const Card = ({ tags = [], imageUrl, price, name }: CardProps) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div className="w-[250px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-default">
        <Image
          className={cn(
            imageUrl ? "obeject-contain h-full w-full" : "object-cover",
          )}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          src={imgSrc ?? FALLBACK_IMAGE}
          height={120}
          width={120}
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
        <div className="flex flex-wrap gap-1 px-3 py-2">
          {tags.map((tag, i) => (
            <Tag key={`${tag}-${i}`} text={tag} deletable size="sm" />
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
