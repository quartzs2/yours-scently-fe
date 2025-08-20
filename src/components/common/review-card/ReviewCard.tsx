"use client";

import type { ReviewCardProps } from "@custom-types/ReviewCard.types";

import StarRating from "@components/ui/tabs/StarRating";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const FALLBACK_IMAGE = "/fallback-image.svg";

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

  const displayTime = useMemo(() => {
    const match = timeAgo.match(/(\d+)\s*(시간|일)/);
    if (!match) return timeAgo;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit === "시간" && value >= 23) return date;
    if (unit === "일") return date;

    return timeAgo;
  }, [timeAgo, date]);

  return (
    <div className="h-full w-full space-y-2 overflow-hidden rounded-xl border border-border-default">
      {/* 리뷰 이미지 */}
      <div className="relative h-[214px] w-full">
        <Image
          onError={() => setMainImgSrc(FALLBACK_IMAGE)}
          className="object-cover"
          src={mainImgSrc}
          alt="리뷰 이미지"
          fill
        />
      </div>

      {/* 별점, 리뷰, 날짜/작성자, 상품 정보 */}
      <div className="h-[208px] w-full space-y-2 p-4">
        {/* 별점 */}
        <div className="text-system-warning">
          <StarRating rating={rating} />
        </div>

        {/* 리뷰 내용 */}
        <p className="text-text-body-2 line-clamp-2 leading-tight text-text-primary">
          {review}
        </p>

        {/* 날짜 + 작성자 */}
        <div className="text-text-body-2 flex justify-between text-text-disabled">
          <span>{displayTime}</span>
          <span>{writer}</span>
        </div>

        <hr className="border border-border-default" />

        {/* 상품 정보 */}
        <div className="flex items-center space-x-4 pt-1">
          <div className="bg-subtle relative h-[40px] w-[40px] overflow-hidden rounded-md">
            <Image
              onError={() => setProductImgSrc(FALLBACK_IMAGE)}
              className="object-cover"
              src={productImgSrc}
              alt="상품 이미지"
              fill
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
