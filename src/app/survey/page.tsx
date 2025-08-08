"use client";

import type { SurveyStep } from "@custom-types/Survey";

import RecommendationsPage from "@components/feature/survey/RecommendationsPage";
import IntensityQuestion from "@components/feature/survey/IntensityQuestion";
import OccasionQuestion from "@components/feature/survey/OccasionQuestion";
import KeywordsQuestion from "@components/feature/survey/KeywordsQuestion";
import IntroPage from "@components/feature/survey/IntroPage";
import ScentMood from "@components/feature/survey/ScentMood";
import { useState } from "react";

export default function SurveyPage() {
  const [step, setStep] = useState<SurveyStep>("intro");

  const goToNextStep = () => {
    const nextStepMap: Record<SurveyStep, SurveyStep> = {
      recommendations: "recommendations",
      keywords: "recommendations",
      scentMood: "intensity",
      intensity: "occasion",
      occasion: "keywords",
      intro: "scentMood",
    };
    setStep((prev) => nextStepMap[prev]);
  };

  const goToPrevStep = () => {
    const prevStepMap: Record<SurveyStep, SurveyStep> = {
      recommendations: "keywords",
      intensity: "scentMood",
      occasion: "intensity",
      keywords: "occasion",
      scentMood: "intro",
      intro: "intro",
    };
    setStep((prev) => prevStepMap[prev]);
  };

  return (
    <div className="bg-background-default flex h-screen w-full items-center justify-center px-4">
      {step === "intro" && <IntroPage onNext={goToNextStep} />}
      {step === "scentMood" && (
        <ScentMood onBack={goToPrevStep} onNext={goToNextStep} />
      )}
      {step === "intensity" && (
        <IntensityQuestion onBack={goToPrevStep} onNext={goToNextStep} />
      )}
      {step === "occasion" && (
        <OccasionQuestion onBack={goToPrevStep} onNext={goToNextStep} />
      )}
      {step === "keywords" && (
        <KeywordsQuestion onBack={goToPrevStep} onNext={goToNextStep} />
      )}
      {step === "recommendations" && <RecommendationsPage />}
    </div>
  );
}
