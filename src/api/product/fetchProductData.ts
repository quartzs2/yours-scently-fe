import { INTERNAL_API_URLS, API_URLS } from "@constants/urls";
import api, { internalApi } from "@api/api";

export type ProductData = {
  status_code: number;
  message: string;
  data: Product;
};

export type FetchProductDataProps = {
  id: string | number;
};

type Product = {
  perfume_detail: PerfumeDetail;
  product_img_url: string;
  description: string;
  views_count: number;
  created_at: string;
  price: string;
  stock: number;
  name: string;
  id: number;
};

type PerfumeDetail = {
  middle_notes: number[];
  main_accords: string[];
  release_year: number;
  base_notes: number[];
  top_notes: number[];
  perfume_id: number;
  intensity: string;
};

/** 서버로 요청 보내는 api */
const fetchProductDataApi = async ({ id }: FetchProductDataProps) => {
  const data = await api.get(API_URLS.PRODUCT_DETAIL(id)).json<ProductData>();
  return data;
};

/** 클라이언트에서 호출하는 api */
export const postFetchProductData = async ({ id }: FetchProductDataProps) => {
  const data = await internalApi
    .get(INTERNAL_API_URLS.PRODUCT_DETAIL(id))
    .json<ProductData>();
  return data;
};

export default fetchProductDataApi;
