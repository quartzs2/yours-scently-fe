"use client";

import { EmailLoginSchema, emailLoginSchema } from "@app/login/schema";
import { useActionState, useTransition, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailLogin } from "@app/login/actions";
import Input from "@components/ui/input/Input";
import Logo from "@assets/logo/logo-gray.svg";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import { URLS } from "@constants/urls";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction] = useActionState(emailLogin, {
    success: false,
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<EmailLoginSchema>({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: zodResolver(emailLoginSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    startTransition(() => formAction(formData));
  });

  useEffect(() => {
    if (state.success) return;

    if (state.errors) {
      Object.entries(state.errors).forEach(([key, value]) => {
        if (value) {
          setError(key as keyof EmailLoginSchema, {
            message: value[0],
            type: "server",
          });
        }
      });
    } else if (state.message) {
      // TODO: alert 대신 UI에 에러 메시지를 표시하도록 개선
      alert(state.message);
    }
  }, [state, setError]);

  return (
    <div className="bg-background-default flex h-screen w-full flex-col items-center gap-8">
      <div className="mt-[224px] flex w-[328px] flex-col items-center gap-10">
        <Logo aria-label="logo" />
        <div className="text-button-1 flex gap-3 px-10 text-text-secondary">
          <div>아직 회원이 아니신가요?</div>
          <Link
            className="cursor-pointer text-text-primary"
            href={URLS.REGISTER_MODAL}
            scroll={false}
          >
            회원가입 하기
          </Link>
        </div>
      </div>
      <form className="flex w-[328px] flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          {/* TODO: 에러 메시지 표현 케이스 체크 */}
          <Input
            placeholder="아이디 (example@gmail.com)"
            className="w-full"
            aria-label="아이디"
            type="email"
            {...register("email")}
            isValid={errors.email ? false : undefined}
            errorMessage={errors.email?.message}
          />
          <Input
            className="w-full"
            placeholder="비밀번호"
            aria-label="비밀번호"
            type="password"
            {...register("password")}
            isValid={errors.password ? false : undefined}
            errorMessage={errors.password?.message}
          />
        </div>
        <Button disabled={isPending} type="submit" size={"2xl"}>
          {isPending ? "로그인 중..." : "일반회원 로그인"}
        </Button>
      </form>
    </div>
  );
}
