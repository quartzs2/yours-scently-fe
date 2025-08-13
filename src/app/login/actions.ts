"use server";

import { emailLoginSchema, EmailLoginSchema } from "@app/login/schema";
import { TOKEN_COOKIE_NAME } from "@constants/auth";
import emailLoginApi from "@api/login/emailLogin";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { URLS } from "@constants/urls";
import { HTTPError } from "ky";
import { z } from "zod";

export type EmailLoginFormState = {
  errors?: Record<keyof EmailLoginSchema, undefined | string[]>;
  success: boolean;
  message: string;
};

export async function emailLogin(
  prevState: EmailLoginFormState,
  formData: FormData,
): Promise<EmailLoginFormState> {
  const data = Object.fromEntries(formData);
  const validatedFields = emailLoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error)
        .fieldErrors as EmailLoginFormState["errors"],
      message: "입력 내용을 다시 확인해주세요.",
      success: false,
    };
  }

  let apiResult;
  try {
    apiResult = await emailLoginApi({
      password: validatedFields.data.password,
      email: validatedFields.data.email,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      const errorMessage =
        errorResponse.detail || "아이디 또는 비밀번호가 일치하지 않습니다.";

      return { message: errorMessage, success: false };
    }
    return { message: "알 수 없는 에러가 발생했습니다.", success: false };
  }

  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME.ACCESS_TOKEN, apiResult.access_token);
  cookieStore.set(TOKEN_COOKIE_NAME.REFRESH_TOKEN, apiResult.refresh_token);

  redirect(URLS.HOME);
}
