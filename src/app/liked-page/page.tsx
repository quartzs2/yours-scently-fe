"use client";

import MainCard from "@components/common/card-component/MainCard";
import Button from "@components/ui/Button";
import { useState } from "react";

import { mockLiked } from "./mocks/mockLiked";

export default function WishlistPage() {
  const likedProducts = mockLiked[0]?.results ?? [];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((pid) => pid !== id),
    );
  };

  const totalCount = likedProducts.length;

  return (
    <div className="width-container-md mx-auto px-4 pt-20 pb-24">
      <h1 className="text-subtitle-1 text-primary mb-[48px]">찜한 목록</h1>

      {/* 상단 컨트롤 */}
      <div className="mb-[32px] flex items-center border-b border-text-secondary pb-[8px]">
        <span className="text-subtitle-2 text-text-primary">
          전체상품({totalCount})
        </span>
        <div className="mx-[12px] h-[16px] w-px bg-text-disabled" />
        <button
          className="text-subtitle-2 text-text-disabled"
          type="button"
          disabled
        >
          선택삭제
        </button>

        <button
          className="text-button-1 ml-auto text-text-primary"
          type="button"
        >
          최신순
        </button>
        <button className="text-button-1 ml-2 text-text-primary" type="button">
          필터
        </button>
      </div>

      {/* 찜 목록 */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {likedProducts.map((product) => {
          const id = product.product_id.toString();
          const isSelected = selectedIds.includes(id);

          return (
            <MainCard
              item={{
                imageUrl: product.product_img_url,
                // isLiked는 UI 기본값일 뿐, 실제 체크 여부는 isSelected로 관리
                isLiked: product.is_liked,
                price: product.price,
                name: product.name,
                tags: product.tags,
                id,
              }}
              onCheckChange={(checked) => toggleSelect(id, checked)}
              checked={isSelected}
              key={id}
            />
          );
        })}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-[40px] flex justify-center gap-[16px]">
        <Button theme="light" size="lg">
          선택 주문 ({selectedIds.length})
        </Button>
        <Button theme="dark" size="lg">
          전체 목록 주문하기
        </Button>
      </div>
    </div>
  );
}
