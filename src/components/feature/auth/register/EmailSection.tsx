import {
  checkEmailVerificationCode,
  sendEmailVerificationCode,
} from "@app/login/@modal/(.)register/actions";
import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import React, { useTransition, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";

const EmailSection = ({ form }: { form: UseFormReturn<RegisterSchema> }) => {
  const {
    formState: { errors },
    clearErrors,
    getValues,
    register,
    setError,
    setValue,
    watch,
  } = form;

  const isEmailVerified = watch("isEmailVerified");
  const email = watch("email");

  const [isSending, startSendingTransition] = useTransition();
  const [isChecking, startCheckingTransition] = useTransition();
  const [isVerifyCodeSent, setIsVerifyCodeSent] = useState(false);

  const handleSendEmailVerificationCode = () => {
    startSendingTransition(async () => {
      const result = await sendEmailVerificationCode(email);

      if (result.success) {
        clearErrors("email");
        setIsVerifyCodeSent(true);
      } else {
        setError("email", { message: result.message, type: "manual" });
      }
    });
  };

  const handleCheckEmailVerificationCode = () => {
    const code = getValues("verificationCode");

    startCheckingTransition(async () => {
      const result = await checkEmailVerificationCode(email, code);

      if (result.success) {
        setValue("isEmailVerified", true, { shouldValidate: true });
        clearErrors("verificationCode");
      } else {
        setError("verificationCode", {
          message: result.message,
          type: "manual",
        });
      }
    });
  };

  let isEmailValid: undefined | boolean;
  if (errors.email) {
    isEmailValid = false;
  } else if (isEmailVerified) {
    isEmailValid = true;
  }

  let isVerificationCodeValid: undefined | boolean;
  if (errors.verificationCode) {
    isVerificationCodeValid = false;
  } else if (isEmailVerified) {
    isVerificationCodeValid = true;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
        <span>이메일</span>
        <span className="text-system-error">*</span>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-3">
          <Input
            validMessage={
              isEmailVerified ? "인증이 완료되었습니다." : undefined
            }
            errorMessage={errors.email?.message}
            className="h-[48px] w-[356px]"
            placeholder="이메일을 입력해주세요."
            disabled={isEmailVerified}
            isValid={isEmailValid}
            type="email"
            {...register("email")}
          />
          <Button
            onClick={handleSendEmailVerificationCode}
            disabled={isSending || isEmailVerified}
            className="w-[112px]"
            theme={"light"}
            size={"2xl"}
          >
            {isSending ? "전송중" : "인증코드전송"}
          </Button>
        </div>
        <div className="flex gap-3">
          <Input
            validMessage={
              isEmailVerified ? "인증이 완료되었습니다." : undefined
            }
            errorMessage={errors.verificationCode?.message}
            disabled={!isVerifyCodeSent || isEmailVerified}
            isValid={isVerificationCodeValid}
            className="h-[48px] w-[356px]"
            placeholder="전송된 코드를 입력해주세요."
            type="text"
            {...register("verificationCode")}
          />
          <Button
            disabled={isChecking || !isVerifyCodeSent || isEmailVerified}
            onClick={handleCheckEmailVerificationCode}
            className="w-[112px]"
            theme={"light"}
            size={"2xl"}
          >
            {isChecking ? "확인중" : "인증코드확인"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailSection;
