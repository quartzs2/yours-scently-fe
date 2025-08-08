"use client";

import {
  type RegisterSchema,
  registerSchema,
} from "@app/login/@modal/(.)register/schema";
import BirthDateSection from "@components/feature/register/BirthDateSection";
import NicknameSection from "@components/feature/register/NicknameSection";
import PasswordSection from "@components/feature/register/PasswordSection";
import GenderSection from "@components/feature/register/GenderSection";
import EmailSection from "@components/feature/register/EmailSection";
import NameSection from "@components/feature/register/NameSection";
import { register } from "@app/login/@modal/(.)register/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import Dialog from "@components/common/Dialog";
import Modal from "@components/common/Modal";
import { useRouter } from "next/navigation";
import Button from "@components/ui/Button";
import { useForm } from "react-hook-form";
import { cn } from "@utils/cn";

export default function RegisterModal() {
  const router = useRouter();

  const [state, formAction] = useActionState(register, {
    success: false,
    message: "",
  });

  const form = useForm<RegisterSchema>({
    defaultValues: {
      isEmailVerified: false,
      verificationCode: "",
      passwordConfirm: "",
      phoneNumber: "",
      gender: "MALE",
      birthDate: "",
      nickname: "",
      password: "",
      email: "",
      name: "",
    },
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (state.success) {
      // TODO: 성공 모달로 수정
      alert(state.message);
      router.back();
      return;
    }

    if (state.errors) {
      Object.entries(state.errors).forEach(([key, value]) => {
        if (value) {
          form.setError(key as keyof RegisterSchema, {
            message: value[0],
            type: "server",
          });
        }
      });
    }
  }, [state.success, router, state.message, form, state.errors]);

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
      isModalOpen={true}
    >
      <Dialog
        className={cn(
          "flex w-[528px] flex-col",
          "rounded-2xl bg-bg-default px-[24px] py-[40px]",
          "shadow-[10px_10px_20px_0px_rgba(0,0,0,0.25)]",
        )}
      >
        <div className="text-body-1 mt-8">회원가입</div>
        <form
          className="mt-6 flex h-[400px] flex-col gap-10 overflow-y-scroll"
          onSubmit={form.handleSubmit(formAction)}
        >
          <NameSection form={form} />
          <NicknameSection form={form} />
          <BirthDateSection form={form} />
          <GenderSection form={form} />
          <EmailSection form={form} />
          <PasswordSection form={form} />
          <Button className="w-full shrink-0" type="submit" size={"2xl"}>
            가입하기
          </Button>
        </form>
      </Dialog>
    </Modal>
  );
}
