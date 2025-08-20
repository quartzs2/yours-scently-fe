import fetchProductDataApi from "@api/product/fetchProductData";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ product_id: string }> },
) {
  const { product_id } = await params;

  try {
    const data = await fetchProductDataApi({
      id: product_id,
    });

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 에러가 발생했습니다";

    // eslint-disable-next-line no-console
    console.error(`Product ID ${product_id} API 호출 실패:`, errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
