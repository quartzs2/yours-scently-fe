"use client";

import ProductDetailInfo from "@components/feature/detail/ProductDetailInfo";
import ProductActionBar from "@components/feature/detail/ProductActionBar";
import QuantitySelector from "@components/ui/input/QuantitySelector";
import { VolumeToggle, StarRating, Tag } from "@components/ui/tabs";
import DetailSwiper from "@components/feature/detail/DetailSwiper";
import CardSwiper from "@components/common/card-swiper/CardSwiper";
import ReviewListCard from "@components/common/ReviewlistCard";
import CartModal from "@components/feature/detail/CartModal";
import { useEffect, useState, useRef, use } from "react";
import TabScroll from "@components/ui/tabs/TabScroll";
import Checkbox from "@components/ui/input/Checkbox";
import data from "@app/detail/[id]/mock/mock.json";
import Button from "@components/ui/Button";
import { IMAGES } from "@constants/urls";
import useScroll from "@hooks/useScroll";
import Image from "next/image";

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const POSITION = {
  ACTION_BAR: "actionBar",
  CART: "cart",
} as const;

const MAX_HEIGHT = "600px" as const;

type PositionType = (typeof POSITION)[keyof typeof POSITION];

const DetailPage = ({ params }: DetailPageProps) => {
  const { id } = use(params);

  const [mockData, setMockData] = useState(data);

  const [tab, setTab] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const [productQuantity, setProductQuantity] = useState(1);

  const [isLiked, setIsLiked] = useState(false);

  const [maxHeight, setMaxHeight] = useState<string>(MAX_HEIGHT);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  useScroll([detailRef, reviewRef], setTab);

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(
        isExpanded ? `${contentRef.current.scrollHeight}px` : MAX_HEIGHT,
      );
    }
  }, [isExpanded]);

  const handleQuantityUpdate = (newQuantity: number) => {
    setProductQuantity(newQuantity);
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
    position: PositionType;
    isOpen: boolean;
  }>({
    position: POSITION.CART,
    isOpen: false,
  });
  const handleOpenCartModal = (positionType: PositionType) => {
    setModalState({ position: positionType, isOpen: true });
  };

  const handleCloseCartModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="relative h-[720px] w-container">
          <Image
            className="object-cover"
            src={IMAGES.DETAIL_MAIN}
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
                <li>
                  탑 노트:
                  {mockData[0].perfume_detail.top_notes.join(", ")}
                </li>
                <li>
                  미들 노트:
                  {mockData[0].perfume_detail.middle_notes.join(", ")}
                </li>
                <li>
                  베이스 노트:
                  {mockData[0].perfume_detail.base_notes.join(", ")}
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
                className="p-4 focus:ring-0 focus:outline-none"
                onChange={handleLikeToggle}
                checked={isLiked}
                type="heart"
                name="heart"
                id="heart"
              />
              <div className="relative flex gap-2">
                <Button
                  onClick={() => handleOpenCartModal(POSITION.CART)}
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
            slidesPerView={4}
            autoplay={false}
            items={mockData}
          >
            <DetailSwiper />
          </CardSwiper>
        </div>
      </div>
      <div className="mx-auto mt-20 flex w-full justify-center">
        <TabScroll setTab={handleTabClick} tab={tab} />
      </div>
      <div className="mx-auto max-w-[1280px]" ref={detailRef}>
        <ProductDetailInfo
          toggleExpanded={() => setIsExpanded((prev) => !prev)}
          imageSrc={IMAGES.DETAIL_IMAGE}
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
            /* TODO 구매하기 클릭 시 처리 */
          }}
          onAddToCart={() => handleOpenCartModal(POSITION.ACTION_BAR)}
          onQuantityChange={handleQuantityUpdate}
          price={data[0].price * productQuantity}
          productQuantity={productQuantity}
          onLikeToggle={handleLikeToggle}
          isLiked={isLiked}
        />
        {modalState.isOpen && modalState.position === POSITION.ACTION_BAR && (
          <CartModal
            onClose={handleCloseCartModal}
            position={modalState.position}
            isOpen={modalState.isOpen}
          />
        )}
      </div>
      {modalState.isOpen && modalState.position === POSITION.CART && (
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
