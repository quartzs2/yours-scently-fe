import { API_URLS } from "@constants/urls";
import { api } from "@api/api";

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

const aiRecommendation = async ({ text }: AiRecommendationProps) => {
  const data = await api
    .post(API_URLS.AI_RECOMMENDATION, {
      json: {
        text,
      },
    })
    .json<AiRecommendationResponse>();

  return data;
};

export default aiRecommendation;
