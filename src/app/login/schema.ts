import { z } from "zod";

export const emailLoginSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  email: z.email("올바른 이메일 형식이 아닙니다."),
});

export type EmailLoginSchema = z.infer<typeof emailLoginSchema>;

export const findEmailSchema = z.object({
  phoneNumber: z.string().min(1, "휴대전화 번호를 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요."),
});

export type FindEmailSchema = z.infer<typeof findEmailSchema>;
