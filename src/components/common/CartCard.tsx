"use client";

import Checkbox from "@components/ui/input/Checkbox";
import { useEffect, useState } from "react";
import Image from "next/image";

type CartItemCardProps = {
  handleCheckboxChange: (id: number) => void;
  isChecked: boolean;
  image_url?: string;
  tags?: string[];
  brand: string;
  name: string;
  id: number;
};

const FALLBACK_IMAGE = "/fallback-image.svg";

/** ReviewCard 컴포넌트
 *
 * @param image_url - 상품 이미지의 URL
 * @param tags - 상품과 관련된 태그 목록
 * @param review - 사용자가 작성한 리뷰 본문
 * @param brand - 상품의 브랜드명
 * @param name - 상품의 이름
 * @param isChecked - 체크박스의 선택 상태 (true: 선택됨)
 * @param handleCheckboxChange - 체크 상태 변경 시 호출되는 콜백 함수
 *
 *
 * @example
 * <CartCard
 *   image_url="/images/product.png"
 *   tags={"아름다움", "향기로움"}
 *   review="향이 오래간다."
 *   brand="브랜드"
 *   name="상품 이름"
 *   writer="양단비"
 *   isChecked={true}
 *   handleCheckboxChange={(checked) => console.log("체크 상태:", checked)}
 * />
 */

const CartCard = ({
  handleCheckboxChange,
  tags = [],
  isChecked,
  image_url,
  brand,
  name,
  id,
}: CartItemCardProps) => {
  const [imgSrc, setImgSrc] = useState(image_url || FALLBACK_IMAGE);

  useEffect(() => {
    setImgSrc(
      image_url && image_url.trim() !== "" ? image_url : FALLBACK_IMAGE,
    );
  }, [image_url]);
  return (
    <div className="flex w-full max-w-md items-start gap-3 rounded-md p-3">
      {/* 이미지 + 체크박스*/}
      <div className="relative h-[112px] w-[112px] flex-shrink-0 rounded border border-border-default">
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

      {/* 본문 */}
      <div className="flex flex-1 flex-col gap-1">
        {/* 태그 */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span
              className="text-caption rounded-full border bg-bg-default px-2 py-0.5 text-text-primary"
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* 브랜드 */}
        <p className="text-xs text-text-secondary">{brand}</p>
        {/* 상품명 */}
        <p className="text-text-body-1 font-semibold text-text-primary">
          {name}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
