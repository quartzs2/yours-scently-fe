import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";
import React from "react";

const EmailSection = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-body-2 text-text-primary">이메일</div>
      <div className="flex gap-3">
        <Input
          className="h-[48px] w-[356px]"
          placeholder="이메일을 입력해주세요."
          type="email"
        />
        <Button className="w-[112px]" theme={"light"} size={"2xl"}>
          인증코드전송
        </Button>
      </div>
      <div className="flex gap-3">
        <Input
          className="h-[48px] w-[356px]"
          placeholder="전송된 코드를 입력해주세요."
          type="text"
        />
        <Button className="w-[112px]" theme={"light"} size={"2xl"}>
          인증코드확인
        </Button>
      </div>
    </div>
  );
};

export default EmailSection;
