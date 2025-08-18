import { API_BASE_URL, URLS } from "@constants/urls";
import { TOKEN_COOKIE_NAME } from "@constants/auth";
import ky from "ky";

const isServer = typeof window === "undefined";

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
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();
          token = cookieStore.get(TOKEN_COOKIE_NAME.ACCESS_TOKEN)?.value;
        } else {
          token = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${TOKEN_COOKIE_NAME.ACCESS_TOKEN}=`))
            ?.substring(TOKEN_COOKIE_NAME.ACCESS_TOKEN.length + 1);
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
            const { redirect } = await import("next/navigation");
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
