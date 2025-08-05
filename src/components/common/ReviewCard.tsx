"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

type ReviewCardProps = {
  productImage?: string;
  productPrice: string;
  productName: string;
  imageUrl?: string;
  timeAgo: string;
  rating: number;
  review: string;
  writer: string;
  date: string;
};
const FALLBACK_IMAGE = "/fallback-image.svg";

/** ReviewCard 컴포넌트
 *
 * @param imageUrl - 카드에 표시할 대표 이미지 링크
 * @param rating - 리뷰 평점을 나타낼 때 숫자형
 * @param review - 사용자가 작성하는 리뷰 텍스트
 * @param date - 날짜
 * @param timeAgo - 작성 시점 경과된 시간
 * @param writer - 리뷰 작성자 이름
 * @param productImage - 해당 리뷰가 작성된 제품의 대표 이미지 URL
 * @param productName - 해당 리뷰가 작성된 제품 이름
 * @param productPrice - 제품 가격
 *
 * @example
 * <ReviewCard
 *   imageUrl="/images/product.png"
 *   rating={4.5}
 *   review="향이 오래간다."
 *   date="2025-08-01"
 *   timeAgo="3시간"
 *   writer="단비양"
 *   productImage="/images/product.png"
 *   productName="향수"
 *   productPrice="10000원"
 * />
 */

const ReviewCard = ({
  productImage,
  productPrice,
  productName,
  imageUrl,
  timeAgo,
  rating,
  review,
  writer,
  date,
}: ReviewCardProps) => {
  const [mainImgSrc, setMainImgSrc] = useState(imageUrl || FALLBACK_IMAGE);
  const [productImgSrc, setProductImgSrc] = useState(
    productImage || FALLBACK_IMAGE,
  );

  useEffect(() => {
    setMainImgSrc(imageUrl || FALLBACK_IMAGE);
    setProductImgSrc(productImage || FALLBACK_IMAGE);
  }, [imageUrl, productImage]);

  return (
    <div className="h-[457px] w-[280px] space-y-2 overflow-hidden rounded-xl border border-border-default">
      {/* 리뷰 이미지 */}
      <div className="h-[214px] w-full">
        <Image
          onError={() => setMainImgSrc(FALLBACK_IMAGE)}
          className="h-full w-full object-cover"
          src={mainImgSrc}
          alt="리뷰 이미지"
          height={140}
          width={250}
        />
      </div>

      {/* 별점, 리뷰, 날짜/작성자, 상품 정보 */}
      <div className="h-[227px] w-full space-y-2 p-4">
        {/* 별점 */}
        <div className="flex space-x-1 text-system-warning">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              fill={i < rating ? "currentColor" : "none"}
              className="h-[24px] w-[24px]"
              strokeWidth={1.5}
              key={i}
            />
          ))}
        </div>

        {/* 리뷰 텍스트 */}
        <p className="text-text-body-2 line-clamp-2 h-10 leading-tight text-text-primary">
          {review}
        </p>

        {/* 날짜 + 작성자 */}
        <div className="text-text-body-2 flex justify-between text-text-disabled">
          <span>
            {date} {timeAgo}
          </span>
          <span>{writer}</span>
        </div>
        <hr className="border border-border-default" />

        {/* 상품 정보 */}
        <div className="flex items-center space-x-4 pt-1">
          <div className="bg-subtle h-[80px] w-[80px] shrink-0 overflow-hidden rounded-md">
            <Image
              onError={() => setProductImgSrc(FALLBACK_IMAGE)}
              className="h-full w-full object-cover"
              src={productImgSrc}
              alt="상품 이미지"
              height={40}
              width={40}
            />
          </div>
          <div>
            <div className="text-primary text-text-body-2 line-clamp-1">
              {productName}
            </div>
            <div className="text-text-button-1 font-semibold">
              {Number(productPrice).toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
