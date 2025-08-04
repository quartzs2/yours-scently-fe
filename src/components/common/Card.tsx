"use client";

import Checkbox from "@components/ui/input/Checkbox";
import { Tag } from "@components/ui/tabs";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@utils/cn";

export type CardProps = {
  handleHeartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
  isLiked: boolean;
  tags?: string[];
  price: number;
  name: string;
};

const FALLBACK_IMAGE = "/fallback-image.svg";

/** Card 컴포넌트
 * @param tags - 문자열 배열. []로 설정한 이유는 부모 컴포넌트에서 tags를 전달하지 않아도 오류 없이 작동하도록하기 위함.
 * @param imageUrl - 카드에 표시할 이미지 경로
 * @param price - 숫자 타입의 가격
 * @param name - 상품 이름 또는 카드 제목 역할
 * @param isLiked - 사용자가 이 상품에 '좋아요'를 눌렀는지 여부
 * @param handleHeartChange - 좋아요(하트) 상태가 변경될 때 호출되는 콜백 함수
 *
 * @example
 * <Card
 *   tags={['타이틀 이름름','타이틀 이름2']}
 *   imageUrl="/images/product.png"
 *   price={19990}
 *   name="상품 이름"
 *   isLiked={true}
 *   handleHeartChange={(e) => {}}
 * />
 */

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
    <div className="w-[250px]">
      {/* 이미지 & 하트 */}
      <div className="relative mb-2 flex h-[250px] w-full items-center justify-center overflow-hidden rounded-lg border border-border-default">
        <Checkbox
          className="absolute top-[16px] right-[16px] m-2 h-[32px] w-[32px]"
          onChange={handleHeartChange}
          checked={isLiked}
          type="heart"
          name="heart"
          id="heart"
        />
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
