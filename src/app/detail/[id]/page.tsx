"use client";

import ProductDetailInfo from "@components/common/detail-component/ProductDetailInfo";
import ProductActionBar from "@components/common/detail-component/ProductActionBar";
import DetailSwiper from "@components/common/detail-component/DetailSwiper";
import CartModal from "@components/common/detail-component/CartModal";
import QuantitySelector from "@components/ui/input/QuantitySelector";
import { VolumeToggle, StarRating, Tag } from "@components/ui/tabs";
import CardSwiper from "@components/common/card-swiper/CardSwiper";
import ReviewListCard from "@components/common/ReviewlistCard";
import TabScroll from "@components/ui/tabs/TabScroll";
import Checkbox from "@components/ui/input/Checkbox";
import { useEffect, useState, useRef } from "react";
import Button from "@components/ui/Button";
import Image from "next/image";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const data = [
  {
    perfume_detail: {
      main_accords: "fresh citrus floral",
      middle_notes: ["jasmine", "peach"],
      base_notes: ["cedarwood", "amber"],
      top_notes: ["bergamot", "orange"],
      intensity: "moderate",
      release_year: 2024,
      gender: "unisex",
    },
    product_img_url: "https://cdn.example.com/product15.jpg",
    description: "상큼하고 가벼운 시트러스 향의 향수입니다.",
    created_at: "2025-07-21T13:25:33Z",
    tags: ["피오니", "로즈", "머스크", "달콤한"],
    category: "perfume",
    brand: "FreshAir",
    name: "시트러스 블라썸",
    price: 72000.0,
    stock: 35,
    id: 1,
  },
  {
    perfume_detail: {
      main_accords: "fresh citrus floral",
      middle_notes: ["jasmine", "peach"],
      base_notes: ["cedarwood", "amber"],
      top_notes: ["bergamot", "orange"],
      intensity: "moderate",
      release_year: 2024,
      gender: "unisex",
    },
    product_img_url: "https://cdn.example.com/product15.jpg",
    description: "상큼하고 가벼운 시트러스 향의 향수입니다.",
    created_at: "2025-07-21T13:25:33Z",
    tags: ["피오니", "로즈", "머스크", "달콤한"],
    category: "perfume",
    name: "시트러스 블라썸아아아",
    brand: "FreshAir",
    price: 72000.0,
    stock: 35,
    id: 2,
  },
  {
    perfume_detail: {
      main_accords: "fresh citrus floral",
      middle_notes: ["jasmine", "peach"],
      base_notes: ["cedarwood", "amber"],
      top_notes: ["bergamot", "orange"],
      intensity: "moderate",
      release_year: 2024,
      gender: "unisex",
    },
    product_img_url: "https://cdn.example.com/product15.jpg",
    description: "상큼하고 가벼운 시트러스 향의 향수입니다.",
    created_at: "2025-07-21T13:25:33Z",
    tags: ["피오니", "로즈", "머스크", "달콤한"],
    category: "perfume",
    brand: "FreshAir",
    name: "시트러스 블라썸",
    price: 72000.0,
    stock: 35,
    id: 3,
  },
  {
    perfume_detail: {
      main_accords: "fresh citrus floral",
      middle_notes: ["jasmine", "peach"],
      base_notes: ["cedarwood", "amber"],
      top_notes: ["bergamot", "orange"],
      intensity: "moderate",
      release_year: 2024,
      gender: "unisex",
    },
    product_img_url: "https://cdn.example.com/product15.jpg",
    description: "상큼하고 가벼운 시트러스 향의 향수입니다.",
    created_at: "2025-07-21T13:25:33Z",
    tags: ["피오니", "로즈", "머스크", "달콤한"],
    category: "perfume",
    brand: "FreshAir",
    name: "시트러스 블라썸",
    price: 72000.0,
    stock: 35,
    id: 4,
  },
  {
    perfume_detail: {
      main_accords: "fresh citrus floral",
      middle_notes: ["jasmine", "peach"],
      base_notes: ["cedarwood", "amber"],
      top_notes: ["bergamot", "orange"],
      intensity: "moderate",
      release_year: 2024,
      gender: "unisex",
    },
    product_img_url: "https://cdn.example.com/product15.jpg",
    description: "상큼하고 가벼운 시트러스 향의 향수입니다.",
    created_at: "2025-07-21T13:25:33Z",
    tags: ["피오니", "로즈", "머스크", "달콤한"],
    name: "아ㅏ아아아아아 코딩어렵다아아아아",
    category: "perfume",
    brand: "FreshAir",
    price: 72000.0,
    stock: 35,
    id: 5,
  },
];

const DetailPage = ({ params }: DetailPageProps) => {
  //   const { id } = await params;

  const [mockData, setMockData] = useState(data);

  const [tab, setTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);

  const [isLiked, setIsLiked] = useState(false);

  const [maxHeight, setMaxHeight] = useState("600px");

  const contentRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(
        isExpanded ? `${contentRef.current.scrollHeight}px` : "600px",
      );
    }
  }, [isExpanded]);

  const handleQuantityUpdate = (newQuantity: number) => {
    setProductQuantity(newQuantity);
    console.log(`Product ID: ${mockData[0].id}, New Quantity: ${newQuantity}`);
  };

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
  };

  const handleTabClick = (index: number) => {
    setTab(index);

    const sectionRefs = [detailRef, reviewRef];
    const targetRef = sectionRefs[index];

    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [modalState, setModalState] = useState<{
    position: "actionBar" | "cart";
    isOpen: boolean;
  }>({
    position: "cart",
    isOpen: false,
  });

  const handleOpenCartModal = (positionType: "actionBar" | "cart") => {
    setModalState({ position: positionType, isOpen: true });
  }; // 모달 닫기 버튼을 눌렀을 때 실행되는 함수

  const handleCloseCartModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const detailTop = detailRef.current?.getBoundingClientRect().top || 0;
      const reviewTop = reviewRef.current?.getBoundingClientRect().top || 0;

      const middle = window.innerHeight / 2;

      if (Math.abs(detailTop - middle) < Math.abs(reviewTop - middle)) {
        setTab(0);
      } else {
        setTab(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="relative h-[720px] w-[1280px]">
          <Image
            className="object-cover"
            src="/detail/image.png"
            alt="상세 메인 이미지"
            sizes="1280px"
            priority
            fill
          />
        </div>
        <div className="relative flex w-[640px] justify-center">
          <div className="absolute bottom-0 flex w-[380px] flex-col items-center justify-center gap-6">
            <p className="text-body-1 text-text-secondary">
              {mockData[0].name}
            </p>
            <p className="text-subtitle-2 text-primary-main">
              {mockData[0].brand}
            </p>
            <div className="flex gap-3">
              {mockData[0].tags.map((tag, i) => (
                <Tag key={`${tag}-${i}`} text={tag} size="sm" />
              ))}
            </div>
            <div className="flex flex-col items-center gap-2">
              <StarRating rating={2} />
              <p className="">(1,378)</p>
            </div>
            <div className="text-body-1 flex w-full justify-around gap-2">
              <VolumeToggle isOn={false} text="30mL" />
              <VolumeToggle text="50mL" isOn={true} />
              <VolumeToggle text="100mL" isOn={true} />
              <VolumeToggle text="150mL" isOn={true} />
            </div>

            <div className="flex w-full flex-col gap-5 pb-5">
              <p className="text-text-button-1 text-text-secondary">
                향기 노트
              </p>
              <ul className="text-body-2 list-disc pl-6 text-text-secondary">
                <li>탑 노트: {data[0].perfume_detail.top_notes.join(", ")} </li>
                <li>
                  미들 노트: {data[0].perfume_detail.middle_notes.join(", ")}
                </li>
                <li>
                  베이스 노트: {data[0].perfume_detail.base_notes.join(", ")}
                </li>
              </ul>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex">
                <QuantitySelector
                  onQuantityChange={(newQuantity) =>
                    handleQuantityUpdate(newQuantity)
                  }
                  initialQuantity={productQuantity}
                  buttonClassName="w-12 h-8"
                  inputClassName="w-12 h-8"
                />
              </div>
              <p className="text-subtitle-2 text-text-primary">
                {(data[0].price * productQuantity).toLocaleString()}원
              </p>
            </div>
            <div className="flex w-full justify-end gap-4">
              <Checkbox
                onChange={() => {
                  handleLikeToggle();
                }}
                className="p-4 focus:ring-0 focus:outline-none"
                checked={isLiked}
                type="heart"
                name="heart"
                id="heart"
              />
              <div className="relative flex gap-2">
                <Button
                  onClick={() => handleOpenCartModal("cart")}
                  theme={"light"}
                  size={"lg"}
                >
                  장바구니 담기
                </Button>
                <Button size={"lg"}>구매하기</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex justify-center">
        <div className="flex max-w-[1232px] flex-wrap">
          <p className="text-subtitle-1 pb-8 text-text-primary">
            이런 향수는 어때요?
          </p>
          <CardSwiper
            withNavigation={true}
            spaceBetween={26.65}
            autoplay={false}
            items={data}
          >
            <DetailSwiper />
          </CardSwiper>
        </div>
      </div>
      <div className="mx-auto mt-20 flex w-full justify-center">
        <TabScroll setTab={handleTabClick} tab={tab}></TabScroll>
      </div>
      <div className="mx-auto max-w-[1280px]" ref={detailRef}>
        <ProductDetailInfo
          toggleExpanded={() => setIsExpanded((prev) => !prev)}
          imageSrc="/detail/detailImage.png"
          isExpanded={isExpanded}
          contentRef={contentRef}
          maxHeight={maxHeight}
        />
        <div className="mt-20" ref={reviewRef}>
          <p className="text-subtitle-1 pt-12 pb-8 text-text-primary">리뷰</p>

          <div className="flex h-[290px] w-full justify-center">
            <div className="flex w-[288px] flex-col items-center justify-center">
              <StarRating rating={4.7} size={48} />
              <p className="text-h3 text-text-primary">4.7</p>
              <p className="text-subtitle-2 text-text-secondary">총 1,329 건</p>
            </div>
            <div className="flex w-[944px] items-center justify-center">
              <div className="w-[355px]">
                <p className="text-subtitle-2 pb-2 text-text-primary">향</p>
                <div className="flex flex-col gap-[13px]">
                  <p className="text-body-1 text-text-primary">은은해요</p>
                  <p className="text-body-1 text-text-primary">보통이에요</p>
                  <p className="text-body-1 text-text-primary">강해요</p>
                </div>
              </div>
              <div className="w-[355px]">
                <p className="text-subtitle-2 pb-2">지속력</p>
                <div className="flex flex-col gap-[13px]">
                  <p className="text-body-1 text-text-primary">오래가요</p>
                  <p className="text-body-1 text-text-primary">
                    예상보다 짧아요
                  </p>
                  <p className="text-body-1 text-text-primary">보통이에요</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-subtitle-2 border-b border-text-secondary pt-6 pb-4 text-text-primary">
            전체선택(1,329) | 포토(565)
          </p>
          {data.map((item) => (
            <div
              className="border-b border-text-secondary pt-8 pb-8"
              key={item.id}
            >
              <ReviewListCard
                imageUrl={`/mock/best-review/perfume${item.id}.png`}
                review="향이 오래가서 좋아요!"
                date="2025-08-01"
                timeAgo="3시간 전"
                rating={4.5}
                writer="단비양"
              />
            </div>
          ))}
          <div className="flex justify-center py-12">
            <Button className="h-[56px] w-[800px]">리뷰 더 보기</Button>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-50">
        <ProductActionBar
          onBuyNow={() => {
            /* 구매하기 클릭 시 처리 */
          }}
          onAddToCart={() => handleOpenCartModal("actionBar")}
          onQuantityChange={handleQuantityUpdate}
          price={data[0].price * productQuantity}
          productQuantity={productQuantity}
          onLikeToggle={handleLikeToggle}
          isLiked={isLiked}
        />
        {modalState.isOpen && modalState.position === "actionBar" && (
          <CartModal
            onClose={handleCloseCartModal}
            position={modalState.position}
            isOpen={modalState.isOpen}
          />
        )}
      </div>
      {modalState.isOpen && modalState.position === "cart" && (
        <CartModal
          onClose={handleCloseCartModal}
          position={modalState.position}
          isOpen={modalState.isOpen}
        />
      )}
    </>
  );
};

export default DetailPage;
