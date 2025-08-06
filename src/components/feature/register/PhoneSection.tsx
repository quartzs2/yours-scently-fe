import PhoneInput from "@components/ui/input/PhoneInput";
import Input from "@components/ui/input/Input";
import Button from "@components/ui/Button";
import React from "react";

const PhoneSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">휴대전화</div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <PhoneInput values={["", "", ""]} onChange={() => {}} />
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
    </div>
  );
};

export default PhoneSection;
