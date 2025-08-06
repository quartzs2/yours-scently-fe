"use client";

import type { ReviewCardProps } from "@custom-types/ReviewCard.types";

import { useEffect, useState, useMemo } from "react";
import { StarHalf, Star } from "lucide-react";
import Image from "next/image";
const FALLBACK_IMAGE = "/fallback-image.svg";

/**
 * 리뷰 카드 컴포넌트
 *
 * 리뷰 이미지, 별점, 리뷰 텍스트, 작성 시점 경과 시간 또는 날짜, 작성자 이름,
 * 그리고 리뷰 대상 상품 이미지와 이름, 가격을 표시합니다.
 * 시간 경과가 9시간 이상이거나 1일 이상이면 'date'를 보여주고, 그렇지 않으면 'timeAgo'를 보여줍니다.
 *
 * @param [imageUrl] - 리뷰 카드에 표시할 대표 이미지 URL
 * @param rating - 리뷰 평점 (0~5)
 * @param review - 리뷰 내용
 * @param date - 리뷰 작성 날짜 (예: "2025-08-01")
 * @param timeAgo - 작성 시점부터 경과한 시간 (예: "3시간 전", "1일 전")
 * @param writer - 리뷰 작성자 이름
 * @param [productImage] - 리뷰한 상품의 대표 이미지 URL
 * @param productName - 리뷰한 상품 이름
 * @param productPrice - 리뷰한 상품 가격 (숫자 문자열)
 *
 * @example
 * ```tsx
 * <ReviewCard
 *   imageUrl="/images/review1.png"
 *   rating={4.5}
 *   review="향이 오래가서 좋아요!"
 *   date="2025-08-01"
 *   timeAgo="3시간 전"
 *   writer="단비양"
 *   productImage="/images/product1.png"
 *   productName="포 허 퓨어 머스크 EDP"
 *   productPrice="67900"
 * />
 * ```
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

  // 9시간 이상 또는 1일 이상이면 date 표시
  const displayTime = useMemo(() => {
    const match = timeAgo.match(/(\d+)\s*(시간|일)/);
    if (!match) return timeAgo;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit === "시간" && value >= 23) return date;
    if (unit === "일") return date;

    return timeAgo;
  }, [timeAgo, date]);

  // 0.5 단위 별점 렌더링 (full, half, empty)
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            className="h-[24px] w-[24px]"
            fill="currentColor"
            strokeWidth={1.5}
            key={i}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            className="h-[24px] w-[24px]"
            fill="currentColor"
            strokeWidth={1.5}
            key={i}
          />,
        );
      } else {
        stars.push(
          <Star
            className="h-[24px] w-[24px]"
            strokeWidth={1.5}
            fill="none"
            key={i}
          />,
        );
      }
    }

    return stars;
  };

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
        <div className="flex space-x-1 text-system-warning">
          {renderStars()}
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
          <div className="min-w-0">
            <div className="text-primary text-text-body-2 truncate">
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
