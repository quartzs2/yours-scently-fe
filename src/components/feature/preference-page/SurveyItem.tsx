import PreferenceCard from "@components/feature/preference-page/PreferenceCard";
import Button from "@components/ui/Button";
import { Tag } from "@components/ui/tabs";
import React from "react";

interface SurveyItemProps {
  mood: string[];
  note: string[];
  brand: string;
  name: string;
  date: string;
}

const SurveyItem = ({ brand, name, mood, note, date }: SurveyItemProps) => {
  return (
    <div>
      <div className="flex w-full items-center justify-between rounded-[4px]">
        <PreferenceCard
          handleCheckboxChange={(checked) => console.log("체크 상태:", checked)}
          imageUrl="/images/product.png"
          isChecked={true}
          brand={brand}
          name={name}
          type="설문"
          id={1}
        />

        {/* 감정 키워드 */}
        <div className="flex h-[120px] min-w-[160px] flex-1 items-center justify-center gap-[8px] border-l border-[#E5E5E5]">
          <div>
            <span className="text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
              감정 키워드
            </span>
            <div className="text-caption mt-2 flex gap-[4px] text-text-primary">
              {mood.map((m) => (
                <Tag size="sm" text={m} key={m} />
              ))}
            </div>
          </div>
        </div>

        {/* 향기 성향 */}
        <div className="flex h-[120px] min-w-[160px] flex-1 items-center justify-center gap-[8px] border-l border-[#E5E5E5]">
          <div>
            <span className="text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
              향기 성향
            </span>
            <div className="text-caption mt-2 flex gap-[4px] text-text-primary">
              {note.map((n) => (
                <Tag size="sm" text={n} key={n} />
              ))}
            </div>
          </div>
        </div>

        {/* 진단일 */}
        <div className="flex h-[120px] min-w-[120px] items-center justify-center border-l border-[#E5E5E5] px-6">
          <div>
            <span className="self-start text-[14px] leading-[120%] font-semibold tracking-[-0.03em] text-text-secondary">
              진단일
            </span>
            <p className="text-body-1 mt-2 text-text-primary">{date}</p>
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
        당신이 선택한 감정 키워드를 바탕으로, 잔잔한 우디 노트에 머스크의
        포근함을 더한 이 향을 추천드려요.
      </div>
    </div>
  );
};

export default SurveyItem;
