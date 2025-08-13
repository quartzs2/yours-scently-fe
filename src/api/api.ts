import { API_BASE_URL, URLS } from "@constants/urls";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ky from "ky";

const isServer = typeof window === "undefined";
const TOKEN_COOKIE_NAME = "jwt_token";

// 인증이 필요 없는 요청을 위한 인스턴스
export const publicApi = ky.create({
  prefixUrl: API_BASE_URL,
});

// 인증이 필요한 요청을 위한 인스턴스
export const api = publicApi.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: undefined | string;

        if (isServer) {
          const cookieStore = await cookies();
          token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;
        } else {
          token = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${TOKEN_COOKIE_NAME}=`))
            ?.substring(TOKEN_COOKIE_NAME.length + 1);
        }

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          // TODO: 토큰 갱신 API 생기면 추가
          // eslint-disable-next-line no-console
          console.error("인증 에러, 로그인 페이지로 이동합니다.");

          if (isServer) {
            redirect(URLS.LOGIN);
          } else {
            window.location.href = URLS.LOGIN;
          }
        }
      },
    ],
  },
  credentials: "include",
});

export default api;
