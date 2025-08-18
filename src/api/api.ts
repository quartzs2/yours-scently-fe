import { API_BASE_URL, URLS } from "@constants/urls";
import { TOKEN_COOKIE_NAME } from "@constants/auth";
import ky from "ky";

/** 클라이언트에서 서버 API(Route Handler)를 호출하기 위한 인스턴스 */
export const internalApi = ky.create({});

/** 인증이 필요 없는 요청을 위한 인스턴스(서버 전용) */
export const publicApi = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
});

/** 인증이 필요한 요청을 위한 인스턴스(서버 전용) */
const api = publicApi.extend({
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          // TODO: 토큰 갱신 API 생기면 추가
          // eslint-disable-next-line no-console
          console.error("인증 에러, 로그인 페이지로 이동합니다.");

          const { redirect } = await import("next/navigation");
          redirect(URLS.LOGIN);
        }
      },
    ],
    beforeRequest: [
      async (request) => {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const token = cookieStore.get(TOKEN_COOKIE_NAME.ACCESS_TOKEN)?.value;

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
  credentials: "include",
});

export default api;
