"use server";

import {
  emailLoginSchema,
  EmailLoginSchema,
  findEmailSchema,
  FindEmailSchema,
} from "@app/login/schema";
import {
  authenticateEmailUser,
  saveNicknameToCookies,
  saveTokensToCookies,
} from "@actions/actions";
import findEmailApi from "@api/account-find/findEmail";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { URLS } from "@constants/urls";
import { HTTPError } from "ky";
import { z } from "zod";

export type EmailLoginFormState = {
  errors?: Record<keyof EmailLoginSchema, undefined | string[]>;
  success: boolean;
  message: string;
};

export type FindEmailFormState = {
  errors?: Record<keyof FindEmailSchema, undefined | string[]>;
  success: boolean;
  message: string;
};

export async function emailLoginAction(
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

  const authResult = await authenticateEmailUser({
    password: validatedFields.data.password,
    email: validatedFields.data.email,
  });

  if (!authResult.success) {
    return { message: authResult.message, success: false };
  }

  await saveTokensToCookies({
    refreshToken: authResult.tokens.refresh_token,
    accessToken: authResult.tokens.access_token,
  });
  await saveNicknameToCookies({
    nickname: authResult.tokens.user.nickname,
  });

  revalidatePath(URLS.HOME, "layout");
  redirect(URLS.HOME);
}

export async function findEmail(
  prevState: FindEmailFormState,
  formData: FormData,
) {
  const data = Object.fromEntries(formData);
  const validatedFields = findEmailSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error)
        .fieldErrors as FindEmailFormState["errors"],
      message: "입력 내용을 다시 확인해주세요.",
      success: false,
    };
  }

  try {
    const apiResult = await findEmailApi({
      phoneNumber: validatedFields.data.phoneNumber,
      name: validatedFields.data.name,
    });

    return {
      message: apiResult.email,
      success: true,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      const errorMessage =
        errorResponse.detail || "이름 또는 휴대폰 번호가 올바르지 않습니다.";

      return { message: errorMessage, success: false };
    }
    return { message: "알 수 없는 에러가 발생했습니다.", success: false };
  }
}
