import { z } from "zod";

export const registerSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(1, { message: "전화번호를 입력해주세요." })
      .refine((val) => val.length === 11, {
        message: "전화번호는 11자리로 입력해주세요.",
      }),
    birthDate: z
      .string()
      .min(1, { message: "생년월일을 입력해주세요." })
      .refine((val) => val.length === 8, {
        message: "생년월일은 8자리로 입력해주세요.",
      }),
    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .max(10, { message: "닉네임은 10자 이하로 입력해주세요." }),
    isNicknameChecked: z.boolean().refine((val) => val === true, {
      message: "닉네임 중복 확인을 해주세요.",
    }),
    isEmailVerified: z.boolean().refine((val) => val === true, {
      message: "이메일 인증을 완료해주세요.",
    }),
    email: z
      .email({ message: "올바른 이메일 형식이 아닙니다." })
      .min(1, { message: "이메일을 입력해주세요." }),
    passwordConfirm: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
    verificationCode: z
      .string()
      .min(1, { message: "인증 코드를 입력해주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    gender: z.enum(["MALE", "FEMALE"]),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
