import { ButtonHTMLAttributes } from "react";
import { cn } from "@utils/cn";

const sortFilterButtonVariants =
  "px-4 py-2 rounded-md inline-block text-sm cursor-pointer text-text-primary transition-colors duration-200";

export type SortFilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

/**
 * 정렬 또는 필터 메뉴에서 사용되는 버튼 컴포넌트
 *
 * 정렬 기준이나 필터 항목 선택 시 사용되며, 기본 스타일이 적용된 텍스트 버튼입니다.
 *
 * @param text - 버튼에 표시될 텍스트
 * @param props - 기타 button 속성 (onClick, disabled 등)
 *
 * @example
 * <SortFilterButton text="최신순" onClick={handleSort} />
 */
export const SortFilterButton = ({ text, ...props }: SortFilterButtonProps) => {
  return (
    <button className={cn(sortFilterButtonVariants)} type="button" {...props}>
      <div className="flex items-center justify-center">{text}</div>
    </button>
  );
};

export default SortFilterButton;
