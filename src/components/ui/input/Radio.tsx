import { cn } from "@utils/cn";

export type RadioProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  disabled?: boolean;
  checked: boolean;
  label?: string;
  value: string;
  name: string;
  id: string;
};

/**
 * @example
 * // 부모 컴포넌트에서 Radio 컴포넌트를 사용하는 예시입니다.
 * // `useState`와 `handleRadioChange` 함수를 포함하여 즉시 사용 가능한 코드입니다.
 *
 * import { useState } from 'react';
 * import Radio from './Radio';
 *
 * const RadioGroup = () => {
 *   const [selectedOption, setSelectedOption] = useState("option1");
 *
 *   const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 *     setSelectedOption(event.target.value);
 *   };
 *
 *   return (
 *     <div className="m-2 flex gap-5">
 *       <Radio
 *         checked={selectedOption === "option1"}
 *         onChange={handleRadioChange}
 *         name="my-radio-group"
 *         labelClassName="ml-2"
 *         value="option1"
 *         id="option1"
 *         label="옵션 1"
 *       />
 *       <Radio
 *         checked={selectedOption === "option2"}
 *         onChange={handleRadioChange}
 *         name="my-radio-group"
 *         labelClassName="ml-2"
 *         value="option2"
 *         disabled={true}  // 비활성화
 *         id="option2"
 *         label="옵션 2"
 *       />
 *       <Radio
 *         checked={selectedOption === "option3"}
 *         onChange={handleRadioChange}
 *         name="my-radio-group"
 *         labelClassName="ml-2"
 *         value="option3"
 *         id="option3"
 *         label="옵션 3"
 *       />
 *     </div>
 *   );
 * };
 */
const Radio = ({
  labelClassName,
  disabled,
  onChange,
  checked,
  value,
  label,
  name,
  id,
}: RadioProps) => {
  return (
    <div className="flex items-center">
      <input
        className={cn(
          "custom-radio h-[24px] w-[24px] appearance-none rounded-full border-2 border-primary-main",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "disabled:border-text-disabled",
        )}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        value={value}
        type="radio"
        name={name}
        id={id}
      />
      {label && (
        <label className={cn(labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

Radio.displayName = "Radio";

export default Radio;
