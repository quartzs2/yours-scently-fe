import surveyRecommendationReasonApi, {
  SurveyRecommendationReasonResult,
  RecommendationData,
} from "@api/survey/recommendationReason";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const recommendationData: RecommendationData = await request.json();
    const data: SurveyRecommendationReasonResult =
      await surveyRecommendationReasonApi({
        recommendationData,
      });

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다";

    // eslint-disable-next-line no-console
    console.error("추천 API 호출 실패:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
