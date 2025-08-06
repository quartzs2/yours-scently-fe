"use server";

import { registerSchema } from "@app/login/@modal/(.)register/schema";
import { z } from "zod";

export type FormState = {
  errors?: Record<keyof z.infer<typeof registerSchema>, undefined | string[]>;
  success: boolean;
  message: string;
};

export async function register(formData: FormData): Promise<FormState> {
  const rawFormData = Object.fromEntries(formData);

  const validatedFields = registerSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error)
        .fieldErrors as FormState["errors"],
      message: "입력 내용을 다시 확인해주세요.",
      success: false,
    };
  }

  try {
    // TODO: 회원가입 API 호출

    return { message: "회원가입이 정상적으로 완료되었습니다.", success: true };
  } catch {
    return {
      message: "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
      success: false,
    };
  }
}
