import aiRecommendationApi from "@api/recommendations/aiRecommendation";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  try {
    const response = await aiRecommendationApi({ text });
    return NextResponse.json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다";

    // eslint-disable-next-line no-console
    console.error("AI 추천 요청 중 오류 발생:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
