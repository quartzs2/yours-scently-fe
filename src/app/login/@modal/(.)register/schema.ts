import { z } from "zod";

export const registerSchema = z
  .object({
    gender: z.enum(["MALE", "FEMALE"]),
    verificationCode: z.string(),
    isEmailVerified: z.boolean(),
    passwordConfirm: z.string(),
    phoneNumber: z.string(),
    birthDate: z.string(),
    nickname: z.string(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.name.trim().length === 0) {
      ctx.addIssue({
        message: "이름을 입력해주세요.",
        code: "custom",
        path: ["name"],
      });
    }
    if (data.nickname.trim().length === 0) {
      ctx.addIssue({
        message: "닉네임을 입력해주세요.",
        path: ["nickname"],
        code: "custom",
      });
    }
    if (data.nickname.trim().length > 10) {
      ctx.addIssue({
        message: "닉네임은 10자 이하로 입력해주세요.",
        path: ["nickname"],
        code: "custom",
      });
    }
    if (data.birthDate.trim().length === 0) {
      ctx.addIssue({
        message: "생년월일을 입력해주세요.",
        path: ["birthDate"],
        code: "custom",
      });
    }
    if (data.birthDate.trim().length !== 8) {
      ctx.addIssue({
        message: "생년월일은 8자리로 입력해주세요.",
        path: ["birthDate"],
        code: "custom",
      });
    }
    if (data.email.trim().length === 0) {
      ctx.addIssue({
        message: "이메일을 입력해주세요.",
        path: ["email"],
        code: "custom",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        message: "올바른 이메일 형식이 아닙니다",
        path: ["email"],
        code: "custom",
      });
    }
    if (data.password.length === 0) {
      ctx.addIssue({
        message: "비밀번호를 입력해주세요",
        path: ["password"],
        code: "custom",
      });
    }
    if (data.passwordConfirm.length === 0) {
      ctx.addIssue({
        message: "비밀번호 확인을 입력해주세요",
        path: ["passwordConfirm"],
        code: "custom",
      });
    } else if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        message: "비밀번호가 일치하지 않습니다",
        path: ["passwordConfirm"],
        code: "custom",
      });
    }
    if (data.verificationCode.trim().length === 0) {
      ctx.addIssue({
        path: ["verificationCode"],
        message: "인증 코드를 입력해주세요.",
        code: "custom",
      });
    }
    if (data.isEmailVerified !== true) {
      ctx.addIssue({
        message: "이메일 인증을 완료해주세요.",
        path: ["verificationCode"],
        code: "custom",
      });
    }
    // TODO: 전화번호 인증 추가
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
