import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { checkNickname } from "@app/login/@modal/(.)register/actions";
import React, { useTransition, useEffect, useState } from "react";
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
    watch,
  } = form;

  const [isPending, startTransition] = useTransition();
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const handleCheckNickname = () => {
    const nickname = getValues("nickname");

    startTransition(async () => {
      const result = await checkNickname(nickname);

      if (result.success) {
        clearErrors("nickname");
        setIsNicknameChecked(true);
      } else {
        setError("nickname", { message: result.message, type: "manual" });
        setIsNicknameChecked(false);
      }
    });
  };

  const nicknameValue = watch("nickname");

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [nicknameValue]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">닉네임</div>
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
          isValid={errors.nickname ? false : undefined}
          errorMessage={errors.nickname?.message}
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
