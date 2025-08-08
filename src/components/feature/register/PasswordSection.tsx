import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { UseFormReturn } from "react-hook-form";
import Input from "@components/ui/input/Input";
import React from "react";

const PasswordSection = ({ form }: { form: UseFormReturn<RegisterSchema> }) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">비밀번호</div>
      <div className="flex flex-col gap-7">
        <Input
          className="h-[48px] w-full"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          {...register("password")}
          isValid={errors.password ? false : undefined}
          errorMessage={errors.password?.message}
        />
        <Input
          placeholder="비밀번호를 다시 입력해주세요."
          className="h-[48px] w-full"
          type="password"
          {...register("passwordConfirm")}
          isValid={errors.passwordConfirm ? false : undefined}
          errorMessage={errors.passwordConfirm?.message}
        />
      </div>
    </div>
  );
};

export default PasswordSection;
