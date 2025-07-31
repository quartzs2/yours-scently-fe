import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@utils/cn";

const actionButtonVariants = cva(
  "px-4 py-2 rounded-md inline-block text-sm cursor-pointer transition-colors duration-200",
  {
    variants: {
      selected: {
        false: "text-text-disabled",
        true: "text-text-primary",
      },
    },
    defaultVariants: { selected: false },
  },
);

export type ActionButtonProps = VariantProps<typeof actionButtonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
  };

/**
 * 액션 버튼 컴포넌트
 *
 * 선택 상태에 따라 스타일이 달라지는 버튼입니다.
 * 예: 필터 탭, 정렬 버튼 등에 사용됩니다.
 *
 * 전체석택, 선택삭제
 *
 * @param selected - 버튼이 선택된 상태인지 여부 (true/false)
 * @param text - 버튼에 표시할 텍스트
 * @param props - 기본 button 속성 (onClick, disabled 등)
 *
 * @example
 * <ActionButton selected={true} text="전체선택" onClick={handleClick} />
 */
export const ActionButton = ({
  selected,
  text,
  ...props
}: ActionButtonProps) => {
  return (
    <button
      className={cn(actionButtonVariants({ selected }))}
      type="button"
      {...props}
    >
      {text}
    </button>
  );
};

export default ActionButton;
