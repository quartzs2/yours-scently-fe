"use client";

import ReviewListCard from "@components/common/ReviewlistCard";
import Button from "@components/ui/Button";
import { useState } from "react";

import { mockReview } from "./mocks/mockReview"; // 불러오기

type Review = {
  isChecked?: boolean;
  created_at: string;
  images?: string[];
  content: string;
  tags?: string[];
  rating: number;
  id: number;
};

export default function MyReviewsPage() {
  // 상품 단위 mockReview → review 리스트 풀어내기
  const initialReviews: Review[] = mockReview.flatMap((group) =>
    group.reviews.map((rev) => ({
      ...rev,
      images: rev.images,
    })),
  );

  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  // 선택된 개수
  const selectedLength = reviews.filter((r) => r.isChecked).length;

  // 개별 체크 토글
  const toggleCheck = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isChecked: !r.isChecked } : r)),
    );
  };

  // 전체 선택 / 해제
  // const toggleAll = () => {
  //   const allSelected = reviews.every((r) => r.isChecked);
  //   setReviews((prev) => prev.map((r) => ({ ...r, isChecked: !allSelected })));
  // };

  return (
    <div className="width-container-md M min- mx-auto max-w-[var(--width-container)] py-[40px] sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)] md:px-0">
      <h2 className="text-subtitle-1 mb-[36px] text-text-primary">
        내가 작성한 리뷰({reviews.length})
      </h2>

      {/* 리뷰 카드 리스트 */}
      <div className="space-y-[32px] pt-4">
        {reviews.map((review) => (
          <div
            className="flex items-start gap-2 border-t border-border-default first:border-t-0"
            key={review.id}
          >
            <input
              onChange={() => toggleCheck(review.id)}
              className="h-5 w-5 self-center"
              checked={!!review.isChecked}
              type="checkbox"
            />
            <ReviewListCard {...toListCardProps(review)} />
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 border-t border-border-default"></div>

      {/* 하단 버튼 */}
      <div className="mt-[80px] flex justify-center gap-[16px]">
        <Button
          onClick={() => setReviews((prev) => prev.filter((r) => !r.isChecked))}
          theme="light"
          size="lg"
        >
          선택 삭제하기({selectedLength})
        </Button>
        <Button onClick={() => setReviews([])} theme="dark" size="lg">
          전체 삭제하기
        </Button>
      </div>
    </div>
  );
}

// Review → ReviewListCardProps 변환
function toListCardProps(review: Review) {
  const dateObj = new Date(review.created_at);
  const date = dateObj.toISOString().split("T")[0]; // yyyy-mm-dd
  const timeAgo = "방금 전"; // TODO: 경과시간 계산 로직

  return {
    imageUrls: review.images ?? [],
    tags: review.tags ?? [],
    review: review.content,
    rating: review.rating,
    writer: "양단비",
    timeAgo,
    date,
  };
}
