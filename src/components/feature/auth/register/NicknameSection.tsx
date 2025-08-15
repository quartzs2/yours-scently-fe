import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { checkNickname } from "@app/login/@modal/(.)register/actions";
import React, { useTransition, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";

const NicknameSection = ({ form }: { form: UseFormReturn<RegisterSchema> }) => {
  const {
    formState: { errors },
    clearErrors,
    getValues,
    register,
    setError,
    setValue,
    watch,
  } = form;

  const [isPending, startTransition] = useTransition();

  const nicknameValue = watch("nickname");
  const isNicknameChecked = watch("isNicknameChecked");

  const handleCheckNickname = () => {
    const nickname = getValues("nickname");

    startTransition(async () => {
      const result = await checkNickname(nickname);

      if (result.success) {
        clearErrors("nickname");
        setValue("isNicknameChecked", true, { shouldValidate: true });
      } else {
        setError("nickname", { message: result.message, type: "manual" });
        setValue("isNicknameChecked", false, { shouldValidate: true });
      }
    });
  };

  useEffect(() => {
    setValue("isNicknameChecked", false);
  }, [nicknameValue, setValue]);

  let inputValid: undefined | boolean;
  if (errors.nickname || errors.isNicknameChecked) {
    inputValid = false;
  } else if (isNicknameChecked) {
    inputValid = true;
  }

  const errorMessage =
    errors.nickname?.message || errors.isNicknameChecked?.message;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
        <span>닉네임</span>
        <span className="text-system-error">*</span>
      </div>
      <div className="flex gap-3">
        <Input
          className="h-[48px] w-[356px]"
          placeholder="닉네임을 입력해주세요."
          id="nickname"
          type="text"
          {...register("nickname")}
          validMessage={
            isNicknameChecked ? "사용 가능한 닉네임입니다." : undefined
          }
          errorMessage={errorMessage}
          isValid={inputValid}
        />
        <Button
          onClick={handleCheckNickname}
          className="w-[112px]"
          disabled={isPending}
          theme={"light"}
          size={"2xl"}
        >
          {isPending ? "확인 중..." : "중복 확인"}
        </Button>
      </div>
    </div>
  );
};

export default NicknameSection;
