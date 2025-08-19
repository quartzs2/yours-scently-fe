import { INTERNAL_API_URLS, API_URLS } from "@constants/urls";
import api, { internalApi } from "@api/api";

export type AiRecommendationResponse = {
  recommendations: Recommendation[];
  recommendation_id: number;
  description: string;
  reason: string;
};

type Perfume = {
  image_url: string;
  brand: string;
  price: number;
  name: string;
  id: number;
};

type Recommendation = {
  created_at: string;
  perfume: Perfume;
  context: string;
};

type AiRecommendationProps = {
  text: string;
};

const aiRecommendationApi = async ({ text }: AiRecommendationProps) => {
  const data = await api
    .post(API_URLS.AI_RECOMMENDATION, {
      json: {
        text,
      },
    })
    .json<AiRecommendationResponse>();

  return data;
};

/** 클라이언트에서 route handler 호출 시 사용 */
export const postAiRecommendation = async ({ text }: AiRecommendationProps) => {
  const data = await internalApi
    .post(INTERNAL_API_URLS.AI_RECOMMENDATIONS, {
      json: {
        text,
      },
    })
    .json<AiRecommendationResponse>();

  return data;
};

export default aiRecommendationApi;
