"use client";

import { mockReviewCards } from "@app/my-page/mocks/mockReviewCard";
import ReviewCard from "@components/common/review-card/ReviewCard";
// import는 알파벳 순서로 정렬
import MainCard from "@components/common/card-component/MainCard";
import MypageCard from "@components/feature/my-page/MypageCard";
import { mockLiked } from "@app/liked-page/mocks/mockLiked";
import { ChevronRight } from "lucide-react";
import Icon from "@components/ui/Icon";
import { useState } from "react";

type OrderStatusItem = {
  key: "delivered" | "pending" | "shipped" | "ready" | "paid";
  label: string;
  count: number;
};

export default function MyPage() {
  const orderStatusData: OrderStatusItem[] = [
    { key: "pending", label: "주문접수", count: 2 },
    { label: "결제완료", key: "paid", count: 1 },
    { label: "배송준비중", key: "ready", count: 0 },
    { key: "shipped", label: "배송중", count: 3 },
    { key: "delivered", label: "배송완료", count: 5 },
  ];

  const likedProducts = mockLiked[0]?.results ?? [];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((pid) => pid !== id),
    );
  };

  const totalCount = likedProducts.length;

  return (
    <div className="flex min-h-screen flex-col sm:mx-[80px] lg:mx-[320px]">
      <span className="text-subtitle-1 mt-[80px] mb-[32px] w-full text-text-primary">
        마이페이지
      </span>

      <div className="justify-around-between flex w-full gap-2">
        <MypageCard nickname="양단비" type="user" />

        <MypageCard
          description="당신이 선택한 '포근하고 은은한 분위기'를 바탕으로, 부드러운 머스크와 파우더리한 노트가 어우러진 이 향을 추천드려요."
          imageUrl="/globe.svg"
          title="N°5 L’Eau"
          date="2025-07-22"
          type="perfume"
          brand="샤넬"
        />
        <MypageCard
          description="당신이 선택한 '포근하고 은은한 분위기'를 바탕으로, 부드러운 머스크와 파우더리한 노트가 어우러진 이 향을 추천드려요."
          imageUrl="/globe.svg"
          title="N°5 L’Eau"
          date="2025-07-22"
          type="perfume"
          brand="샤넬"
        />
      </div>

      <div className="mt-[80px] mb-[32px] flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-subtitle-1 text-text-primary">주문 배송 조회</h2>
          <span className="text-subtitle-2 text-text-secondary">
            (최근 1개월)
          </span>
        </div>
        <p className="text-subtitle-2 text-text-secondary">더보기 &gt;</p>
      </div>
      <div className="flex max-h-[204px] w-full items-center justify-between overflow-x-auto rounded-xl bg-bg-subtle px-6 py-5 whitespace-nowrap shadow-sm">
        {orderStatusData.map((status, index) => (
          <div className="flex items-center gap-2 text-center" key={status.key}>
            <div className="flex flex-col items-center">
              <span className="text-h2 text-text-secondary">
                {status.count}
              </span>
              <span className="text-subtitle-1 text-text-secondary">
                {status.label}
              </span>
            </div>
            {index < orderStatusData.length - 1 && (
              <Icon
                className="text-text-secondary"
                As={ChevronRight}
                size={56}
              />
            )}
          </div>
        ))}
      </div>

      <main className="gap-2 pb-20">
        {/* 찜한 목록 */}
        <div className="mt-[80px] mb-[32px] flex items-center justify-between">
          <h2 className="text-subtitle-1 font-semibold">찜한 목록</h2>
          <p className="text-subtitle-2 text-text-secondary">더보기 &gt;</p>
        </div>
        <div className="mb-12 flex gap-2 overflow-hidden">
          {likedProducts.map((product) => {
            const id = product.product_id.toString();
            const isSelected = selectedIds.includes(id);

            return (
              <div key={id}>
                <MainCard
                  item={{
                    imageUrl: product.product_img_url,
                    isLiked: product.is_liked,
                    price: product.price,
                    name: product.name,
                    tags: product.tags,
                    id,
                  }}
                  onCheckChange={(checked) => toggleSelect(id, checked)}
                  checked={isSelected}
                />
              </div>
            );
          })}
        </div>

        {/* 나의 리뷰 */}
        <div className="mt-[80px] mb-[32px] flex items-center justify-between">
          <h2 className="text-subtitle-1 font-semibold">내가 쓴 리뷰</h2>
          <p className="text-subtitle-2 text-text-secondary">더보기 &gt;</p>
        </div>
        <div className="flex gap-2 overflow-hidden">
          {mockReviewCards.map((card) => (
            <div className="shrink-0" key={card.id}>
              <ReviewCard
                productPrice={card.productPrice}
                productImage={card.productImage}
                productName={card.productName}
                imageUrl={card.imageUrl}
                timeAgo={card.timeAgo}
                rating={card.rating}
                review={card.review}
                writer={card.writer}
                date={card.date}
                id={card.id}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
