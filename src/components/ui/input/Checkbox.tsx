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

/**
 * @example
 * // 부모 컴포넌트에서 Checkbox 컴포넌트를 사용하는 예시입니다.
 * // 아래 코드를 복사하여 바로 사용해볼 수 있습니다.
 *
 * const [isChecked, setIsChecked] = useState(false);
 * const [isLiked, setIsLiked] = useState(false);
 *
 * * const handleCheckboxChange = (event) => {
 * setIsChecked(event.target.checked);
 * };
 * * const handleHeartChange = (event) => {
 * setIsLiked(event.target.checked);
 * };
 *
 * <Checkbox
 *   className="m-2 h-[24px] w-[24px]"
 *   onChange={handleCheckboxChange}
 *   checked={isChecked}
 *   type="checkbox1"
 *   label="약관에 동의합니다"
 *   name="name"
 *   id="id"
 * />
 * <Checkbox
 *   className="m-2 h-[24px] w-[24px]"
 *   onChange={handleCheckboxChange}
 *   checked={isChecked}
 *   type="checkbox2"
 *   label="약관에 동의합니다"
 *   name="name"
 *   id="id"
 * />
 * <Checkbox
 *   className="m-2 h-[24px] w-[24px]"
 *   onChange={handleCheckboxChange}
 *   checked={isChecked}
 *   label="찜하기" // 또는 없어도됨
 *   type="heart"
 *   name="name"
 *   id="id"
 * />
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
    <>
      <div className="flex items-center">
        <input
          className={cn(
            "cursor-pointer appearance-none",
            className,
            type === "checkbox1" &&
              "custom-checkbox rounded border-2 border-[var(--color-primary-main)] checked:bg-[var(--color-primary-main)]",
            type === "checkbox2" &&
              "custom-checkbox rounded-full border-2 border-[var(--color-primary-main)] checked:bg-[var(--color-primary-main)]",
            type === "heart" && "custom-heart-checkbox",
          )}
          onChange={onChange}
          checked={checked}
          type="checkbox"
          name={name}
          id={id}
        />
        <label className={cn(labelClassName)} htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
