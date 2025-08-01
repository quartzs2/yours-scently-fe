import { cn } from "@utils/cn";

export type CheckboxProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: "checkbox1" | "checkbox2" | "heart";
  labelClassName?: string;
  className: string;
  checked: boolean;
  label?: string;
  name: string;
  id: string;
};

const checkboxTypeClasses: Record<string, string> = {
  checkbox2:
    "custom-checkbox rounded-full border-2 border-primary-main checked:bg-primary-main",
  checkbox1:
    "custom-checkbox rounded border-2 border-primary-main checked:bg-primary-main",
  heart: "custom-heart-checkbox",
} as const;

/**
 * @example
 * // 부모 컴포넌트에서 Checkbox 컴포넌트를 사용하는 예시입니다.
 * // 아래 코드를 복사하여 바로 사용해볼 수 있습니다.
 *
 * import { useState } from "react";
 *
 * const ExampleCheckboxGroup = () => {
 *   const [isChecked, setIsChecked] = useState(false);
 *   const [isChecked2, setIsChecked2] = useState(false);
 *   const [isLiked, setIsLiked] = useState(false);
 *
 *   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 *     setIsChecked(event.target.checked);
 *   };
 *
 *   const handleCheckbox2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
 *     setIsChecked2(event.target.checked);
 *   };
 *
 *   const handleHeartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 *     setIsLiked(event.target.checked);
 *   };
 *
 *   return (
 *     <>
 *       <Checkbox
 *         className="m-2 h-[24px] w-[24px]"
 *         onChange={handleCheckboxChange}
 *         checked={isChecked}
 *         type="checkbox1"
 *         label="약관에 동의합니다"
 *         name="checkbox1"
 *         id="checkbox1"
 *       />
 *       <Checkbox
 *         className="m-2 h-[24px] w-[24px]"
 *         onChange={handleCheckbox2Change}
 *         checked={isChecked2}
 *         type="checkbox2"
 *         label="약관에 동의합니다"
 *         name="checkbox2"
 *         id="checkbox2"
 *       />
 *       <Checkbox
 *         className="m-2 h-[24px] w-[24px]"
 *         onChange={handleHeartChange}
 *         checked={isLiked}
 *         label="찜하기"
 *         type="heart"
 *         name="heart"
 *         id="heart"
 *       />
 *     </>
 *   );
 * };
 */
const Checkbox = ({
  labelClassName,
  className,
  onChange,
  checked,
  label,
  name,
  type,
  id,
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <input
        className={cn(
          "h-[24px] w-[24px] cursor-pointer appearance-none",
          checkboxTypeClasses[type] || "",
          className,
        )}
        onChange={onChange}
        checked={checked}
        type="checkbox"
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

Checkbox.displayName = "Checkbox";

export default Checkbox;
