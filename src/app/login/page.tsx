"use client";

import Input from "@components/ui/input/Input";
import Logo from "@assets/logo/logo-gray.svg";
import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="bg-background-default flex h-screen w-full flex-col items-center gap-8">
      <div className="mt-[224px] flex w-[328px] flex-col items-center gap-10">
        <Logo aria-label="logo" />
        <div className="text-button-1 flex gap-3 px-10 text-text-secondary">
          <div>아직 회원이 아니신가요?</div>
          <button
            onClick={() => router.push("/login/register", { scroll: false })}
            className="cursor-pointer text-text-primary"
          >
            회원가입 하기
          </button>
        </div>
      </div>
      <form className="flex w-[328px] flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Input
            placeholder="아이디 (example@gmail.com)"
            className="w-full"
            aria-label="아이디"
            type="email"
          />
          <Input
            className="w-full"
            placeholder="비밀번호"
            aria-label="비밀번호"
            type="password"
          />
        </div>
        <Button type="submit" size={"2xl"}>
          일반회원 로그인
        </Button>
      </form>
    </div>
  );
}
