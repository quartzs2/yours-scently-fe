import Input from "@components/ui/input/Input";
import React from "react";

const NameSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">이름</div>
      <Input
        className="h-[48px] w-full"
        placeholder="이름을 입력해주세요."
        type="text"
        id="name"
      />
    </div>
  );
};

export default NameSection;
