"use client";

import RecommendationsPage from "@components/feature/survey/RecommendationsPage";
import IntensityQuestion from "@components/feature/survey/IntensityQuestion";
import OccasionQuestion from "@components/feature/survey/OccasionQuestion";
import KeywordsQuestion from "@components/feature/survey/KeywordsQuestion";
import IntroPage from "@components/feature/survey/IntroPage";
import ScentMood from "@components/feature/survey/ScentMood";
import { useState } from "react";

// Step 상수 정의
const STEP = {
  RECOMMENDATIONS: "recommendations",
  SCENT_MOOD: "scentMood",
  INTENSITY: "intensity",
  OCCASION: "occasion",
  KEYWORDS: "keywords",
  INTRO: "intro",
} as const;

type StepValue = (typeof STEP)[keyof typeof STEP];

// 다음 스텝 매핑
const nextStepMap: Record<StepValue, StepValue> = {
  [STEP.RECOMMENDATIONS]: STEP.RECOMMENDATIONS,
  [STEP.KEYWORDS]: STEP.RECOMMENDATIONS,
  [STEP.SCENT_MOOD]: STEP.INTENSITY,
  [STEP.INTENSITY]: STEP.OCCASION,
  [STEP.OCCASION]: STEP.KEYWORDS,
  [STEP.INTRO]: STEP.SCENT_MOOD,
};

// 이전 스텝 매핑
const prevStepMap: Record<StepValue, StepValue> = {
  [STEP.RECOMMENDATIONS]: STEP.KEYWORDS,
  [STEP.INTENSITY]: STEP.SCENT_MOOD,
  [STEP.OCCASION]: STEP.INTENSITY,
  [STEP.KEYWORDS]: STEP.OCCASION,
  [STEP.SCENT_MOOD]: STEP.INTRO,
  [STEP.INTRO]: STEP.INTRO,
};

export default function SurveyPage() {
  const [step, setStep] = useState<StepValue>(STEP.INTRO);

  const goToNextStep = () => {
    setStep((prev) => nextStepMap[prev]);
  };

  const goToPrevStep = () => {
    setStep((prev) => prevStepMap[prev]);
  };

  // 렌더링 함수
  const renderStepComponent = () => {
    switch (step) {
      case STEP.RECOMMENDATIONS:
        return <RecommendationsPage />;
      case STEP.SCENT_MOOD:
        return <ScentMood onBack={goToPrevStep} onNext={goToNextStep} />;
      case STEP.INTENSITY:
        return (
          <IntensityQuestion onBack={goToPrevStep} onNext={goToNextStep} />
        );
      case STEP.OCCASION:
        return <OccasionQuestion onBack={goToPrevStep} onNext={goToNextStep} />;
      case STEP.KEYWORDS:
        return <KeywordsQuestion onBack={goToPrevStep} onNext={goToNextStep} />;
      case STEP.INTRO:
        return <IntroPage onNext={goToNextStep} />;
      default:
        return <IntroPage onNext={goToNextStep} />;
    }
  };

  return (
    <div className="bg-background-default flex h-screen w-full items-center justify-center px-4">
      {renderStepComponent()}
    </div>
  );
}
