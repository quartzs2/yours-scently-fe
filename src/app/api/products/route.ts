import { ProductResponse } from "@api/products/productsList";
import { API_BASE_URL, API_URLS } from "@constants/urls";
import { NextResponse } from "next/server";
import ky from "ky";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    const res = await ky
      .get<ProductResponse>(`${API_BASE_URL}/${API_URLS.PRODUCTS}`, {
        searchParams: { offset, limit },
      })
      .json();

    return NextResponse.json(res);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
}
