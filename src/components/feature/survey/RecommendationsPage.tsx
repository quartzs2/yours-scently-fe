"use client";
import { postSurveyRecommendation } from "@api/survey/recommendation";
import { useQuery } from "@tanstack/react-query";
import { SurveyData } from "@app/survey/page";
import Button from "@components/ui/Button";
import Tag from "@components/ui/tabs/Tag";
import { URLS } from "@constants/urls";
import Image from "next/image";

type RecommendationsPageProps = {
  surveyData: SurveyData;
};

const noteLabelMap: Record<string, string> = {
  vanilla: "바닐라",
  citrus: "시트러스",
  floral: "플로럴",
  musk: "머스크",
  amber: "앰버",
  rose: "로즈",
};

export default function RecommendationsPage({
  surveyData,
}: RecommendationsPageProps) {
  // console.log("RecommendationPage: ", surveyData); // 제거된 console.log

  const { isLoading, isError, data } = useQuery({
    queryFn: () => postSurveyRecommendation({ recommendationData: surveyData }),
    queryKey: ["survey-recommendation"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>데이터가 없습니다</div>;
  }

  // 사용하지 않는 변수들을 제거하여 경고를 없앱니다.
  const { main_accords, name } = data;

  return (
    <div className="bg-background-default flex w-full justify-center px-4 pt-[80px]">
      <div className="flex w-full max-w-lg flex-col items-center gap-8">
        <Image
          className="w-48 sm:w-56"
          height={192}
          width={192}
          alt={name}
          src={``} // TODO: 이미지 어떻게 가져오는지 확인
          priority
        />
        <div className="flex flex-col items-center gap-2">
          <div className="text-caption flex flex-wrap justify-center gap-2 text-text-secondary">
            {main_accords.map((note) => (
              <Tag text={noteLabelMap[note] || note} key={note} size="sm" />
            ))}
          </div>
          <div className="text-subtitle-1 mt-2 text-center font-medium text-text-primary">
            {name}
          </div>
        </div>
        <div className="text-body-1 relative mb-6 w-full max-w-[810px] px-4 text-center leading-relaxed break-keep whitespace-normal text-text-primary sm:px-6">
          <p>당신이 선택한 ‘{surveyData.mood}’ 분위기를 바탕으로,</p>
          <p className="mt-1">
            {/* TODO: API 연결 후 추가 */}
            이유 추가 필요
          </p>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <Button
            className="text-body-1 rounded-full border border-primary-main bg-bg-default px-6 py-2 text-primary-main"
            href={URLS.HOME}
            shape="pill"
            size="xl"
          >
            홈으로 돌아가기
          </Button>
          <Button
            className="text-body-1 rounded-full bg-primary-main px-6 py-3 text-white"
            shape="pill"
            size="xl"
          >
            상품 상세보기
          </Button>
        </div>
      </div>
    </div>
  );
}
