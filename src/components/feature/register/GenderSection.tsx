import { GenderToggle } from "@components/ui/tabs";
import React from "react";

const GenderSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 text-text-primary">성별</div>
      <div className="flex gap-2">
        <GenderToggle
          className="h-[40px] w-[80px]"
          selected={true}
          label="남"
        />
        <GenderToggle
          className="h-[40px] w-[80px]"
          selected={false}
          label="여"
        />
      </div>
    </div>
  );
};

export default GenderSection;
