// api/products.ts
import { INTERNAL_API_URLS } from "@constants/urls";
import ky from "ky";

export type ProductProps = {
  description: string;
  image_url: string;
  has_more: boolean;
  tags: string[];
  brand: string;
  price: number;
  name: string;
  id: string;
};

export type ProductResponse = {
  results: ProductProps[];
  previous: string;
  count: number;
  next: string;
};

export const fetchProducts = async (
  page: number,
  limit = 8,
): Promise<ProductResponse> => {
  const offset = (page - 1) * limit;
  try {
    const res = await ky
      .get<ProductResponse>(INTERNAL_API_URLS.PRODUCTS, {
        searchParams: { offset, limit },
      })
      .json();
    return res;
  } catch (error) {
    console.error("fetchProducts 에러:", error);
    return { previous: "", results: [], next: "", count: 0 };
  }
};

export const searchProducts = async (
  query: string,
): Promise<ProductProps[]> => {
  try {
    const res = await ky
      .get<ProductResponse>(INTERNAL_API_URLS.SEARCH, {
        searchParams: { q: query },
      })
      .json();
    return res.results;
  } catch (error) {
    console.error("searchProducts 에러:", error);
    return [];
  }
};
