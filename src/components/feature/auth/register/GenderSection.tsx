import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { UseFormReturn, Controller } from "react-hook-form";
import { GenderToggle } from "@components/ui/tabs";
import React from "react";

const GENDER = {
  FEMALE: "FEMALE",
  MALE: "MALE",
};

const GenderSection = ({ form }: { form: UseFormReturn<RegisterSchema> }) => {
  const { control } = form;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
        <span>성별</span>
        <span className="text-system-error">*</span>
      </div>
      <Controller
        render={({ field: { onChange, value } }) => (
          <div className="flex gap-2">
            <GenderToggle
              onClick={() => onChange(GENDER.MALE)}
              selected={value === GENDER.MALE}
              className="h-[40px] w-[80px]"
              label="남"
            />
            <GenderToggle
              onClick={() => onChange(GENDER.FEMALE)}
              selected={value === GENDER.FEMALE}
              className="h-[40px] w-[80px]"
              label="여"
            />
          </div>
        )}
        control={control}
        name="gender"
      />
    </div>
  );
};

export default GenderSection;
