import { RegisterSchema } from "@app/login/@modal/(.)register/schema";
import { UseFormReturn, Controller } from "react-hook-form";
import PhoneInput from "@components/ui/input/PhoneInput";

const PhoneSection = ({ form }: { form: UseFormReturn<RegisterSchema> }) => {
  const {
    formState: { errors },
    control,
  } = form;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-body-2 flex items-center gap-[2px] text-text-primary">
        <span>휴대전화</span>
        <span className="text-system-error">*</span>
      </div>
      <div className="flex gap-3">
        <Controller
          render={({ field }) => (
            <PhoneInput
              values={
                field.value
                  ? ([
                      field.value.slice(0, 3),
                      field.value.slice(3, 7),
                      field.value.slice(7, 11),
                    ] as [string, string, string])
                  : ["", "", ""]
              }
              onChange={(newValues) => {
                const joinedValue = newValues.join("");
                field.onChange(joinedValue);
              }}
              isValid={errors.phoneNumber ? false : undefined}
              errorMessage={errors.phoneNumber?.message}
            />
          )}
          name="phoneNumber"
          control={control}
        />
      </div>
    </div>
  );
};
export default PhoneSection;
