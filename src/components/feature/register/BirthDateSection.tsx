import Input from "@components/ui/input/Input";
import React from "react";

const BirthDateSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">생년월일</div>
      <Input
        placeholder="8자리 입력해주세요 (ex. 20001004)"
        className="h-[48px] w-full"
        type="text"
      />
    </div>
  );
};

export default BirthDateSection;
