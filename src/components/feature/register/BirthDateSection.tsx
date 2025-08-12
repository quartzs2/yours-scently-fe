import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { UseFormReturn } from "react-hook-form";
import Input from "@components/ui/input/Input";
import React from "react";

const BirthDateSection = ({
  form,
}: {
  form: UseFormReturn<RegisterSchema>;
}) => {
  const {
    formState: { errors },
    register,
  } = form;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
        <span>생년월일</span>
        <span className="text-system-error">*</span>
      </div>
      <Input
        placeholder="8자리 입력해주세요 (ex. 20001004)"
        className="h-[48px] w-full"
        type="text"
        {...register("birthDate")}
        isValid={errors.birthDate ? false : undefined}
        errorMessage={errors.birthDate?.message}
      />
    </div>
  );
};

export default BirthDateSection;
