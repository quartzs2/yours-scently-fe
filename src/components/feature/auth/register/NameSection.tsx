import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { UseFormReturn } from "react-hook-form";
import Input from "@components/ui/input/Input";
import React from "react";

const NameSection = ({ form }: { form: UseFormReturn<RegisterSchema> }) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
        <span>이름</span>
        <span className="text-system-error">*</span>
      </div>
      <Input
        className="h-[48px] w-full"
        placeholder="이름을 입력해주세요."
        type="text"
        id="name"
        {...register("name")}
        isValid={errors.name ? false : undefined}
        errorMessage={errors.name?.message}
      />
    </div>
  );
};

export default NameSection;
