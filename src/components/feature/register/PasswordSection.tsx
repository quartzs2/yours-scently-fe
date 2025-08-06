import Input from "@components/ui/input/Input";
import React from "react";

const PasswordSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">비밀번호</div>
      <Input
        className="h-[48px] w-full"
        placeholder="비밀번호를 입력해주세요."
        type="password"
      />
      <Input
        placeholder="비밀번호를 다시 입력해주세요."
        className="h-[48px] w-full"
        type="password"
      />
    </div>
  );
};

export default PasswordSection;
