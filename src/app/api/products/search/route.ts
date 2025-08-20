import { ProductResponse } from "@api/products/productsList";
import { API_BASE_URL, API_URLS } from "@constants/urls";
import { NextResponse } from "next/server";
import ky from "ky";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    const res = (await ky
      .get(`${API_BASE_URL}/${API_URLS.PRODUCTS}`, {
        searchParams: {
          keyword: q,
          limit: 8,
        },
      })
      .json()) as ProductResponse;

    const filteredByName = res.results.filter((item) =>
      item.name.toLowerCase().includes(q.toLowerCase()),
    );

    return NextResponse.json({ ...res, results: filteredByName });
  } catch (error) {
    console.error("❌ Failed to search products:", error);
    return NextResponse.json({ error: "오류" }, { status: 500 });
  }
}
