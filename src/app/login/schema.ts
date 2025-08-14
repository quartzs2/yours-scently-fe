import { z } from "zod";

export const emailLoginSchema = z.object({
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  email: z.email("올바른 이메일 형식이 아닙니다."),
});

export type EmailLoginSchema = z.infer<typeof emailLoginSchema>;
