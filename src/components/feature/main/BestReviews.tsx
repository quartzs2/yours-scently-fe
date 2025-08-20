"use client";

import type { ReviewCardProps } from "@custom-types/ReviewCard.types";

import ReviewSwiper from "@components/common/review-swiper/ReviewSwiper";

const mockReviews: ReviewCardProps[] = [
  {
    productImage: "/mock/best-review/product1.png",
    review: "좋아요 배송빠르게 잘 받았어요 원래 쓰던거라 잘 구매했습니다",
    productName: "[나르시소 로드리게즈] 포 허 퓨어 머스크 EDP",
    image_url: "/mock/best-review/review1.png",
    productPrice: "67900",
    date: "2025-08-01",
    timeAgo: "3시간 전",
    writer: "사용자A",
    rating: 5,
    id: "1",
  },
  {
    review:
      "향 걱정했는데 생각보다 너무 좋아요! 뿌리자마자 귤향이 나다가 머스크+시트러스+ 민트 느낌의 향이 나요! 근데 저도 택배 상자가 심하~~~~게 찌그러져서 왔네요ㅠㅠ...",
    productImage: "/mock/best-review/product2.png",
    image_url: "/mock/best-review/review2.png",
    productName: "[애프터블로우] 솔리드/오드퍼퓸",
    productPrice: "35900",
    date: "2025-07-30",
    timeAgo: "1일 전",
    writer: "사용자B",
    rating: 4,
    id: "2",
  },
  {
    review:
      "직접 시향해보고 맘에들어서 구매했어여. 30대후반인데 향수 뿌리고 싶어서 샀어요. 굿",
    productImage: "/mock/best-review/product3.png",
    image_url: "/mock/best-review/review3.png",
    productName: "[끌로에] 노마드 EDP 30mL",
    productPrice: "121000",
    date: "2025-07-30",
    timeAgo: "1일 전",
    writer: "사용자B",
    rating: 4.5,
    id: "3",
  },
  {
    review:
      "손예진 향수로 유명해서 구매해봤어요! 적당하게 달달하면서 은은한 꽃향&비누향이네요~",
    productImage: "/mock/best-review/product4.png",
    image_url: "/mock/best-review/review4.png",
    productName: "[제니퍼로페즈] 글로우 바이제이로 EDT",
    productPrice: "54900",
    date: "2025-07-30",
    timeAgo: "1일 전",
    writer: "사용자B",
    rating: 4,
    id: "4",
  },
  {
    review:
      "랑방 모던 프린세스 한 번씩 뿌려서 오래 쓰고 있어요 향이 오래가네요",
    productImage: "/mock/best-review/product5.png",
    image_url: "/mock/best-review/review5.png",
    productName: "[랑방] 모던 프린세스 EDP",
    productPrice: "40200",
    date: "2025-07-30",
    timeAgo: "1일 전",
    writer: "사용자B",
    rating: 5,
    id: "5",
  },
];

export default function BestReviews() {
  return (
    <section className="relative flex h-auto flex-col items-center justify-center border-b border-border-default px-4 py-[80px] select-none">
      <div className="w-full max-w-[var(--width-container)] sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <h2 className="text-subtitle-2">베스트 리뷰</h2>
        <ReviewSwiper
          withPagination={false}
          items={mockReviews}
          slidesPerView={4.5}
          spaceBetween={10}
          className="mt-8"
          autoplay={true}
        />
      </div>
    </section>
  );
}
