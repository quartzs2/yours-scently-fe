import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@utils/cn";

const genderToggleVariants = cva(
  "px-4 py-2 rounded-full inline-block text-sm font-medium cursor-pointer transition-colors duration-200 mr-2",
  {
    variants: {
      selected: {
        false: "bg-bg-default text-primary-main border border-primary-main",
        true: "bg-primary-main text-bg-default",
      },
    },
    defaultVariants: { selected: false },
  },
);

export type GenderToggleProps = VariantProps<typeof genderToggleVariants> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
  };

/**
 * 성별 선택용 토글 버튼 컴포넌트
 *
 * 선택 상태에 따라 스타일이 변경되며,
 * 남성/여성 또는 기타 성별 필터 버튼 등에 사용됩니다.
 *
 * @param selected - 현재 선택된 상태인지 여부 (true/false)
 * @param label - 버튼에 표시될 텍스트 (예: "남성", "여성")
 * @param props - 기타 button 속성 (onClick, disabled 등)
 * @param className - 버튼에 적용할 추가 클래스 이름
 *
 * @example
 * <GenderToggle selected={true} label="여성" onClick={handleClick} />
 */
export const GenderToggle = ({
  className,
  selected,
  label,
  ...props
}: GenderToggleProps) => {
  return (
    <button
      className={cn(genderToggleVariants({ selected }), className)}
      type="button"
      {...props}
    >
      {label}
    </button>
  );
};

export default GenderToggle;
