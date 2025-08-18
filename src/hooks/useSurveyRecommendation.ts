"use client";

import type {
  SurveyRecommendationResult,
  RecommendationData,
} from "@custom-types/Survey";

import { useEffect, useState } from "react";

export const useSurveyRecommendation = (payload: RecommendationData) => {
  const [result, setResult] = useState<SurveyRecommendationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { recommendationAction } = await import(
          "@api/survey/recommendation"
        );
        const data = await recommendationAction(payload);
        setResult(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "추천 결과를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [payload]);

  return { loading, result, error };
};
