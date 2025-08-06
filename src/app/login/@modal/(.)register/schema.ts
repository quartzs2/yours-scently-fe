import { z } from "zod";

export const registerSchema = z
  .object({
    password2: z.string().min(1, { message: "비밀번호 확인을 입력해주세요." }),
    phoneNumber: z.string().min(1, { message: "휴대전화를 입력해주세요." }),
    birthDate: z.string().min(1, { message: "생년월일을 입력해주세요." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
    nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    email: z.email({ message: "이메일 형식에 맞지 않습니다." }),
    gender: z.enum(["male", "female"]),
  })
  .refine((data) => data.password === data.password2, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["password2"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
