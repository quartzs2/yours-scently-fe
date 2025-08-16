import PreferenceCard from "@components/feature/preference-page/PreferenceCard";
import Button from "@components/ui/Button";
import React from "react";

interface AIItemProps {
  description: string;
  reason: string;
  brand: string;
  image: string;
  name: string;
  date: string;
}

const AIItem = ({
  description,
  reason,
  brand,
  image,
  name,
  date,
}: AIItemProps) => {
  return (
    <div>
      <div className="flex w-full items-center justify-between rounded-[4px]">
        <PreferenceCard
          handleCheckboxChange={(checked) => console.log("체크 상태:", checked)}
          isChecked={true}
          imageUrl={image}
          brand={brand}
          name={name}
          type="AI"
          id={2}
        />

        {/* 추천 향수 */}
        <div className="flex h-[120px] min-w-[160px] flex-1 items-center justify-center gap-[8px] border-l border-[#E5E5E5]">
          <div>
            <span className="text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
              추천 향수
            </span>
            <p className="text-button-1 text-text-primary">
              딥포레스트 우디 EDT
            </p>
          </div>
        </div>

        {/* 추천 이유 */}
        <div className="flex h-[120px] min-w-[160px] flex-1 items-center justify-center gap-[8px] border-l border-[#E5E5E5]">
          <div>
            <span className="text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
              추천 이유
            </span>
            <p className="text-button-1 text-text-primary">{reason}</p>
          </div>
        </div>

        {/* 진단일 */}
        <div className="flex h-[120px] min-w-[120px] items-center justify-center border-l border-[#E5E5E5] px-6">
          <div>
            <span className="self-start text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
              진단일
            </span>
            <p className="text-body-1 text-text-primary">{date}</p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex h-[120px] min-w-[120px] flex-col items-center justify-center gap-[8px] border-l border-[#E5E5E5] px-4">
          <div className="flex flex-col gap-[8px]">
            <Button
              onClick={() => console.log("구매하기")}
              theme="dark"
              size="lg"
            >
              구매하기
            </Button>
            <Button
              onClick={() => console.log("삭제하기")}
              theme="light"
              size="lg"
            >
              삭제하기
            </Button>
          </div>
        </div>
      </div>

      {/* 추천 설명 */}
      <div className="bg-bg-subtle px-[16px] py-[12px] text-center align-middle font-[SUIT] text-[20px] leading-[130%] font-semibold tracking-[-0.03em] text-primary-main">
        {description}
      </div>
    </div>
  );
};

export default AIItem;
