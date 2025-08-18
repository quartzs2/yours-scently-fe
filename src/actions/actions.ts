"use server";

import { TOKEN_COOKIE_NAME } from "@constants/auth";
import emailLoginApi from "@api/login/emailLogin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { URLS } from "@constants/urls";
import { HTTPError } from "ky";

const isProduction = process.env.NODE_ENV === "production";

type AuthResult =
  | {
      tokens: {
        user: {
          nickname: string;
          email: string;
          id: number;
        };
        refresh_token: string;
        access_token: string;
      };
      success: true;
    }
  | {
      message: string;
      success: false;
    };

type Tokens = {
  refreshToken: string;
  accessToken: string;
};

export async function authenticateEmailUser(credentials: {
  password: string;
  email: string;
}): Promise<AuthResult> {
  try {
    const apiResult = await emailLoginApi({
      password: credentials.password,
      email: credentials.email,
    });
    return { tokens: apiResult, success: true };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      const errorMessage =
        errorResponse.detail || "아이디 또는 비밀번호가 일치하지 않습니다.";

      return { message: errorMessage, success: false };
    }
    return { message: "알 수 없는 에러가 발생했습니다.", success: false };
  }
}

export async function saveTokensToCookies({
  refreshToken,
  accessToken,
}: Tokens) {
  const cookieStore = await cookies();
  const cookieOptions = {
    sameSite: "lax" as const,
    secure: isProduction,
    httpOnly: true,
    path: "/",
  };

  cookieStore.set(TOKEN_COOKIE_NAME.ACCESS_TOKEN, accessToken, cookieOptions);
  cookieStore.set(TOKEN_COOKIE_NAME.REFRESH_TOKEN, refreshToken, cookieOptions);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME.ACCESS_TOKEN);
  cookieStore.delete(TOKEN_COOKIE_NAME.REFRESH_TOKEN);
  cookieStore.delete(TOKEN_COOKIE_NAME.NICKNAME);

  revalidatePath(URLS.HOME, "layout");
  redirect(URLS.HOME);
}

export async function saveNicknameToCookies({
  nickname,
}: {
  nickname: string;
}) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME.NICKNAME, nickname, {
    secure: isProduction,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
  });
}

export async function getNicknameFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME.NICKNAME);
}
