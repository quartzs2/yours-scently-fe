import { RecommendationData as RecommendationDataForSurvey } from "@api/survey/recommendation";
import { INTERNAL_API_URLS, API_URLS } from "@constants/urls";
import api, { internalApi } from "@api/api";

export type SurveyRecommendationReasonResult = {
  perfume_id: number;
  reason: string;
};

export type RecommendationData = RecommendationDataForSurvey & {
  perfume_id: number;
};

type SurveyRecommendationReasonApiProps = {
  recommendationData: RecommendationData;
};

/** 서버로 요청 보내는 api */
const surveyRecommendationReasonApi = async ({
  recommendationData,
}: SurveyRecommendationReasonApiProps) => {
  const parsedData = {
    ...recommendationData,
    keyword: Array.isArray(recommendationData?.keyword)
      ? recommendationData.keyword[0]
      : undefined,
  };
  const data = await api
    .post(API_URLS.SURVEY_RECOMMENDATION_REASON, {
      json: parsedData,
    })
    .json<SurveyRecommendationReasonResult>();

  return data;
};

/** 클라이언트에서 route handler 호출 시 사용 */
export const postSurveyRecommendationReason = async ({
  recommendationData,
}: SurveyRecommendationReasonApiProps) => {
  const data = await internalApi
    .post(INTERNAL_API_URLS.SURVEY_RECOMMENDATION_REASON, {
      json: recommendationData,
    })
    .json<SurveyRecommendationReasonResult>();

  return data;
};

export default surveyRecommendationReasonApi;
