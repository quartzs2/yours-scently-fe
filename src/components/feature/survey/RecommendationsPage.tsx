"use client";

import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";
import Tag from "@components/ui/tabs/Tag";
import Image from "next/image"; // 추가

const noteLabelMap: Record<string, string> = {
  vanilla: "바닐라",
  citrus: "시트러스",
  musk: "머스크",
  amber: "앰버",
  rose: "로즈",
};

const mockResult = {
  reason:
    "당신이 선호한 향기 노트 'vanilla', 'amber'가 포함되어 있고, 비선호 향기 'citrus'는 포함되어 있지 않습니다. '따뜻한' 분위기와 중간 강도의 향이 특징입니다.",
  survey_result: {
    suitable_notes: ["rose", "vanilla", "musk"],
    analyzed_mood: "로맨틱하고 감성적인 분위기",
  },
  excluded_disliked_notes: ["citrus"],
  matched_notes: ["vanilla", "amber"],
  perfume_name: "Warm Vanilla Woods",
  intensity: "eau de parfume",
  main_moods: ["따뜻한", "부드러운"],
  score: 0.93,
};

export default function RecommendationsPage() {
  const router = useRouter();

  // brand 제거
  const { survey_result, perfume_name, reason } = mockResult;

  return (
    <div className="bg-background-default mb-[120px] flex w-full items-center justify-center px-4 pt-[80px]">
      <div className="flex w-full max-w-lg flex-col items-center gap-8">
        {/* 향수 이미지 */}
        <Image
          src="/mock/survey/warmVanillaWoods.png"
          className="w-48"
          height={192}
          alt="추천 향수"
          width={192} // w-48 (48 * 4 = 192px) 기준
          priority
        />

        {/* 향수 정보 */}
        <div className="flex flex-col items-center gap-2">
          {/* 노트 태그 */}
          <div className="text-caption flex flex-wrap justify-center gap-2 text-text-secondary">
            {survey_result.suitable_notes.map((note) => (
              <Tag text={noteLabelMap[note] || note} key={note} size="sm" />
            ))}
          </div>

          {/* 향수 이름 */}
          <div className="text-subtitle-1 mt-2 font-medium text-text-primary">
            {perfume_name}
          </div>
        </div>

        <div className="text-body-1 relative mb-6 w-full max-w-[810px] px-6 text-center leading-relaxed break-keep whitespace-normal text-text-primary">
          {/* 왼쪽 따옴표 */}
          <Image
            src="/mock/survey/left-double-quote.svg"
            className="absolute top-1 left-4"
            alt="quote-left"
            height={16}
            width={16}
          />
          <div>
            <p>
              당신이 선택한 ‘{survey_result.analyzed_mood}’ 분위기를 바탕으로,
            </p>
            <p className="mt-1">{reason}</p>
          </div>
          {/* 오른쪽 따옴표 */}
          <Image
            src="/mock/survey/right-double-quote.svg"
            className="absolute top-1 right-4"
            alt="quote-right"
            height={16}
            width={16}
          />
        </div>

        {/* 버튼 */}
        <div className="flex w-full items-center justify-center gap-3">
          <Button
            className="text-body-1 rounded-full border border-primary-main bg-bg-default py-2 text-primary-main"
            onClick={() => router.push("/")}
          >
            홈으로 돌아가기
          </Button>
          <Button className="text-body-1 rounded-full bg-primary-main py-3 text-white">
            상품 상세보기
          </Button>
        </div>
      </div>
    </div>
  );
}
