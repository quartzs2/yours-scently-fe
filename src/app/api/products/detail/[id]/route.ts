import { API_BASE_URL, API_URLS } from "@constants/urls";
import { NextResponse, NextRequest } from "next/server";
import ky from "ky";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const res = await ky
      .get(`${API_BASE_URL}/${API_URLS.PRODUCTS}/${API_URLS.DETAIL}${id}`)
      .json();

    return NextResponse.json(res);
  } catch {
    return NextResponse.json(
      { error: "상품 정보를 가져오는데 실패했습니다." },
      { status: 500 },
    );
  }
}
