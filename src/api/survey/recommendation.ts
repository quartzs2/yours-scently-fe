import type {
  SurveyRecommendationResult,
  RecommendationData,
} from "@custom-types/Survey";

// src/api/survey/recommendation.ts
import { api } from "@api/api";

// 서버 액션
export async function recommendationAction(
  recommendationData: RecommendationData,
): Promise<SurveyRecommendationResult> {
  try {
    const data = await api
      .post("survey/recommendation-reason", {
        json: recommendationData,
      })
      .json<SurveyRecommendationResult>();

    return data;
  } catch (error) {
    console.error("추천 API 호출 실패:", error);
    throw new Error("추천 결과를 불러오는 중 오류가 발생했습니다.");
  }
}
