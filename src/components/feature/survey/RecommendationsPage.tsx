"use client";

import type { RecommendationData } from "@custom-types/Survey";

import { useSurveyRecommendation } from "@hooks/useSurveyRecommendation";
import Button from "@components/ui/Button";
import Tag from "@components/ui/tabs/Tag";
import { URLS } from "@constants/urls";
import { useState } from "react";
import Image from "next/image";

const noteLabelMap: Record<string, string> = {
  vanilla: "바닐라",
  citrus: "시트러스",
  musk: "머스크",
  amber: "앰버",
  rose: "로즈",
};

export default function RecommendationsPage() {
  const [payload] = useState<RecommendationData>({
    intensity: "적당한 향이 좋아요",
    mood: "로맨틱하고 부드러운 느낌",
    keyword: "사랑스러운",
    usage: "특별한 날",
  });

  const {
    result: recommendation,
    loading: isLoading,
    error: isError,
  } = useSurveyRecommendation(payload);

  if (isLoading)
    return <p className="py-20 text-center text-text-secondary">로딩 중...</p>;
  if (isError)
    return (
      <p className="py-20 text-center text-red-500">데이터 불러오기 오류</p>
    );
  if (!recommendation)
    return (
      <p className="py-20 text-center text-text-secondary">
        추천 결과가 없습니다.
      </p>
    );

  const { survey_result, perfume_name, reason } = recommendation;

  return (
    <div className="bg-background-default flex w-full justify-center px-4 pt-[80px]">
      <div className="flex w-full max-w-lg flex-col items-center gap-8">
        <Image
          src={`/survey/${perfume_name.replace(/\s/g, "")}.png`}
          className="w-48 sm:w-56"
          alt={perfume_name}
          height={192}
          width={192}
          priority
        />

        <div className="flex flex-col items-center gap-2">
          <div className="text-caption flex flex-wrap justify-center gap-2 text-text-secondary">
            {survey_result.suitable_notes.map((note) => (
              <Tag text={noteLabelMap[note] || note} key={note} size="sm" />
            ))}
          </div>
          <div className="text-subtitle-1 mt-2 text-center font-medium text-text-primary">
            {perfume_name}
          </div>
        </div>

        <div className="text-body-1 relative mb-6 w-full max-w-[810px] px-4 text-center leading-relaxed break-keep whitespace-normal text-text-primary sm:px-6">
          <div className="mt-4">
            <p>
              당신이 선택한 ‘{survey_result.analyzed_mood}’ 분위기를 바탕으로,
            </p>
            <p className="mt-1">{reason}</p>
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <Button
            className="text-body-1 rounded-full border border-primary-main bg-bg-default px-6 py-2 text-primary-main"
            href={URLS.HOME}
          >
            홈으로 돌아가기
          </Button>
          <Button className="text-body-1 rounded-full bg-primary-main px-6 py-3 text-white">
            상품 상세보기
          </Button>
        </div>
      </div>
    </div>
  );
}
