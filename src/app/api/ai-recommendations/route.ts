import aiRecommendationApi from "@api/recommendations/aiRecommendation";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  try {
    const response = await aiRecommendationApi({ text });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
