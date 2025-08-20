import { INTERNAL_API_URLS, API_URLS } from "@constants/urls";
import api, { internalApi } from "@api/api";

export type SurveyRecommendationResult = {
  main_accords: string[];
  history_id: number;
  intensity: string;
  brand: string;
  score: number;
  name: string;
  id: number;
};

export type RecommendationData = {
  [key: string]: unknown;
  intensity?: string;
  keyword?: string[];
  usage?: string;
  mood?: string;
};

type SurveyRecommendationApiProps = {
  recommendationData: RecommendationData;
};

/** 서버로 요청 보내는 api */
const surveyRecommendationApi = async ({
  recommendationData,
}: SurveyRecommendationApiProps) => {
  const parsedData = {
    ...recommendationData,
    keyword: Array.isArray(recommendationData?.keyword)
      ? recommendationData.keyword[0]
      : undefined,
  };
  const data = await api
    .post(API_URLS.SURVEY_RECOMMENDATION, {
      json: parsedData,
    })
    .json<SurveyRecommendationResult>();

  return data;
};

/** 클라이언트에서 route handler 호출 시 사용 */
export const postSurveyRecommendation = async ({
  recommendationData,
}: SurveyRecommendationApiProps) => {
  const data = await internalApi
    .post(INTERNAL_API_URLS.SURVEY_RECOMMENDATION, {
      json: recommendationData,
    })
    .json<SurveyRecommendationResult>();

  return data;
};

export default surveyRecommendationApi;
