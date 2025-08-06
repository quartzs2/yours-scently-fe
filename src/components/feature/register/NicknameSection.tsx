import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";
import React from "react";

const NicknameSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">닉네임</div>
      <div className="flex gap-3">
        <Input
          className="h-[48px] w-[356px]"
          placeholder="닉네임을 입력해주세요."
          id="nickname"
          type="text"
        />
        <Button className="w-[112px]" theme={"light"} size={"2xl"}>
          중복 확인
        </Button>
      </div>
    </div>
  );
};

export default NicknameSection;
