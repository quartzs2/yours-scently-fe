"use client";

import RecommendationsPage from "@components/feature/survey/RecommendationsPage";
import IntensityQuestion from "@components/feature/survey/IntensityQuestion";
import OccasionQuestion from "@components/feature/survey/OccasionQuestion";
import KeywordsQuestion from "@components/feature/survey/KeywordsQuestion";
import IntroPage from "@components/feature/survey/IntroPage";
import ScentMood from "@components/feature/survey/ScentMood";
import { useState } from "react";

const STEP = {
  RECOMMENDATIONS: "recommendations",
  SCENT_MOOD: "scentMood",
  INTENSITY: "intensity",
  OCCASION: "occasion",
  KEYWORDS: "keywords",
  INTRO: "intro",
} as const;

export type SurveyData = {
  intensity: string;
  keyword: string[];
  usage: string;
  mood: string;
};

type StepValue = (typeof STEP)[keyof typeof STEP];

const nextStepMap: Record<StepValue, StepValue> = {
  [STEP.RECOMMENDATIONS]: STEP.RECOMMENDATIONS,
  [STEP.KEYWORDS]: STEP.RECOMMENDATIONS,
  [STEP.SCENT_MOOD]: STEP.INTENSITY,
  [STEP.INTENSITY]: STEP.OCCASION,
  [STEP.OCCASION]: STEP.KEYWORDS,
  [STEP.INTRO]: STEP.SCENT_MOOD,
};

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
  const [surveyData, setSurveyData] = useState<SurveyData>({
    intensity: "",
    keyword: [],
    usage: "",
    mood: "",
  });

  const goToNextStep = () => setStep(nextStepMap[step]);
  const goToPrevStep = () => setStep(prevStepMap[step]);

  const renderStepComponent = () => {
    switch (step) {
      case STEP.RECOMMENDATIONS:
        return <RecommendationsPage surveyData={surveyData} />;
      case STEP.SCENT_MOOD:
        return (
          <ScentMood
            setSurveyData={setSurveyData}
            onBack={goToPrevStep}
            onNext={goToNextStep}
          />
        );
      case STEP.INTENSITY:
        return (
          <IntensityQuestion
            setSurveyData={setSurveyData}
            onBack={goToPrevStep}
            onNext={goToNextStep}
          />
        );
      case STEP.OCCASION:
        return (
          <OccasionQuestion
            setSurveyData={setSurveyData}
            onBack={goToPrevStep}
            onNext={goToNextStep}
          />
        );
      case STEP.KEYWORDS:
        return (
          <KeywordsQuestion
            setSurveyData={setSurveyData}
            onBack={goToPrevStep}
            onNext={goToNextStep}
          />
        );
      case STEP.INTRO:
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
