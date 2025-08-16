"use client";

import SurveyItem from "@components/feature/preference-page/SurveyItem";
import AIItem from "@components/feature/preference-page/AIItem";
import { formatDate } from "@utils/formatDate";
import Button from "@components/ui/Button";

import { mockSurvey } from "./mocks/mockSurvey";
import { mockAi } from "./mocks/mockAi";

const surveyData = mockSurvey.flatMap((s) => {
  return s.recommended_perfumes.map((i) => ({
    date: formatDate(s.recommended_at),
    note: s.condition.preferred_notes,
    mood: s.condition.preferred_mood,
    name: i.perfume_name,
    id: i.perfume_id,
    brand: i.brand,
  }));
});

const aiData = mockAi.flatMap((s) => {
  return s.perfumes.map((i) => ({
    date: formatDate(s.created_at),
    description: s.description,
    image: i.image_url,
    context: s.context,
    reason: s.reason,
    brand: i.brand,
    name: i.name,
    id: i.id,
  }));
});

export default function MyScentPage() {
  //  총 개수 계산
  const totalCount = surveyData.length + aiData.length;

  return (
    <div className="mx-auto max-w-[1280px] px-4 pt-[72px] pb-[120px]">
      {/* 타이틀 */}
      <h2 className="text-subtitle-1 mb-[48px] text-text-primary">
        나의 향기 취향
      </h2>

      {/* 상단 컨트롤 */}
      <div className="mb-[24px] flex items-center border-b border-[#E5E5E5] pb-[8px]">
        <span className="text-subtitle-2 text-text-primary">
          전체선택({totalCount})
        </span>
        <div className="mx-[12px] h-[16px] w-px bg-[#E5E5E5]" />
        <span className="text-subtitle-2 text-text-disabled">선택삭제</span>
        <button className="text-button-1 ml-auto text-text-primary">
          최신순
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {surveyData.map((s, idx) => (
          <SurveyItem
            key={s.id - idx}
            brand={s.brand}
            name={s.name}
            mood={s.mood}
            note={s.note}
            date={s.date}
          />
        ))}
        {aiData.map((i, idx) => (
          <AIItem
            description={i.description}
            key={i.id + "-" + idx}
            reason={i.reason}
            brand={i.brand}
            image={i.image}
            name={i.name}
            date={i.date}
          />
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-[40px] flex justify-center gap-[16px]">
        <Button theme="light" size="lg">
          이전 페이지
        </Button>
        <Button theme="dark" size="lg">
          향 추천 받기
        </Button>
      </div>
    </div>
  );
}
