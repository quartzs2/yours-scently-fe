"use server";

import checkEmailVerificationCodeApi from "@api/signup/checkEmailVerificationCode";
import sendEmailVerificationCodeApi from "@api/signup/sendEmailVerificationCode";
import { registerSchema } from "@app/login/@modal/(.)register/schema";
import checkNicknameApi from "@api/signup/checkNickname";
import signupApi from "@api/signup/signup";
import { HTTPError } from "ky";
import { z } from "zod";

export type FormState = {
  errors?: Record<keyof z.infer<typeof registerSchema>, undefined | string[]>;
  success: boolean;
  message: string;
};

export async function register(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = {
    isNicknameChecked: formData.get("isNicknameChecked") === "true",
    verificationCode: formData.get("verificationCode") as string,
    isEmailVerified: formData.get("isEmailVerified") === "true",
    passwordConfirm: formData.get("passwordConfirm") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    birthDate: formData.get("birthDate") as string,
    nickname: formData.get("nickname") as string,
    password: formData.get("password") as string,
    gender: formData.get("gender") as string,
    email: formData.get("email") as string,
    name: formData.get("name") as string,
  };
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error)
        .fieldErrors as FormState["errors"],
      message: "입력 내용을 다시 확인해주세요.",
      success: false,
    };
  }

  try {
    await signupApi({
      password_confirm: validatedFields.data.passwordConfirm,
      phone_number: validatedFields.data.phoneNumber,
      birth_date: validatedFields.data.birthDate,
      password: validatedFields.data.password,
      nickname: validatedFields.data.nickname,
      gender: validatedFields.data.gender,
      email: validatedFields.data.email,
      name: validatedFields.data.name,
    });

    return { message: "회원가입이 정상적으로 완료되었습니다.", success: true };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();

      const errorValues = Object.values(errorResponse);
      const errorMessage =
        (Array.isArray(errorValues[0]) && errorValues[0][0]) ||
        "서버 에러가 발생했습니다.";

      return {
        message: errorMessage,
        success: false,
      };
    }
    return {
      message: "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
      success: false,
    };
  }
}

export async function checkEmailVerificationCode(
  email: string,
  code: string,
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await checkEmailVerificationCodeApi({ email, code });
    return { message: "이메일 인증 코드가 확인되었습니다.", success: true };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      const errorValues = Object.values(errorResponse);
      const errorMessage =
        (Array.isArray(errorValues[0]) && errorValues[0][0]) ||
        "서버 에러가 발생했습니다.";

      return {
        message: errorMessage,
        success: false,
      };
    }
    return {
      message: "이메일 인증에 실패했습니다. 코드를 다시 확인해주세요.",
      success: false,
    };
  }
}

export async function sendEmailVerificationCode(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await sendEmailVerificationCodeApi({ email });
    return { message: "이메일 인증 코드가 전송되었습니다.", success: true };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      const errorValues = Object.values(errorResponse);
      const errorMessage =
        (Array.isArray(errorValues[0]) && errorValues[0][0]) ||
        "서버 에러가 발생했습니다.";

      return {
        message: errorMessage,
        success: false,
      };
    }
    return {
      message:
        "이메일 인증 코드 전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      success: false,
    };
  }
}

export async function checkNickname(nickname: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await checkNicknameApi({ nickname });
    return {
      message: "사용 가능한 닉네임입니다.",
      success: true,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json();
      const errorMessage = errorResponse.message || "서버 에러가 발생했습니다.";

      return {
        message: errorMessage,
        success: false,
      };
    }
    return {
      message: "닉네임 중복 확인에 실패했습니다. 잠시 후 다시 시도해주세요.",
      success: false,
    };
  }
}
