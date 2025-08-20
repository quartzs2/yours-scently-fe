export const URLS = {
  REGISTER_MODAL: "/login/register",
  MY_PAGE_MODAL: "/my-page-modal",
  PRIFERENCE: "/preference-page",
  PRIVACY: "/privacy-page",
  AI_SEARCH: "/ai-search",
  PROMOTION: "/promotion",
  REVIEW: "/review-page",
  PRODUCTS: "/products",
  LIKED: "/liked-page",
  MY_PAGE: "/my-page",
  SURVEY: "/survey",
  DETAIL: "/detail",
  LOGIN: "/login",
  CART: "/cart",
  HOME: "/",
};

export const API_BASE_URL = "https://www.yours-scently.store/api/v1";

export const API_URLS = {
  PRODUCT_DETAIL: (product_id: string | number) => `products/${product_id}`,
  SIGN_UP_EMAIL_SEND_CODE: "auth/signup/email/send-code/",
  SURVEY_RECOMMENDATION_REASON: "recommendation/reason/",
  SIGN_UP_NICKNAME_CHECK: "auth/signup/nickname-check/",
  SIGN_UP_EMAIL_VERIFY: "auth/signup/email/verify/",
  SURVEY_RECOMMENDATION: "recommendation/survey/",
  AI_RECOMMENDATION: "recommendation/ai/",
  FIND_EMAIL: "auth/account/find-email/",
  EMAIL_LOGIN: "auth/login/email/",
  SIGN_UP: "auth/signup/",
  PRODUCTS: "products/",
  SEARCH: "search/",
  DETAIL: "detail/",
};

export const INTERNAL_API_URLS = {
  PRODUCT_DETAIL: (product_id: string | number) => `/api/product/${product_id}`,
  SURVEY_RECOMMENDATION_REASON: "/api/recommendation/reason",
  SURVEY_RECOMMENDATION: "/api/recommendation/survey",
  AI_RECOMMENDATIONS: "/api/ai-recommendations",
  SEARCH: "/api/products/search",
  PRODUCTS: "/api/products",
};

export const IMAGES = {
  SUB_BANNER_SAMPLE: "/images/sub-banner-sample-img.png",
  SUB_BANNER_PROMO: "/images/sub-banner-promo-img.png",
  WARM_VANILLA_WOODS: "/survey/warmVanillaWoods.png",
  PROMO_BANNER_BG: "/images/promo-banner-bg-img.png",
  SUB_BANNER_BG: "/images/sub-banner-bg-img.png",
  DETAIL_IMAGE: "/mock/detail/detail-image.png",
  DETAIL_MAIN: "/mock/detail/detail-main.png",
  MAIN_BANNER: "/images/main-banner-img.png",
};

export const IMAGE_DOMAIN = "kr.object.ncloudstorage.com";
