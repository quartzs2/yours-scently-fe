import { VariantProps, cva } from "class-variance-authority";
import IconButton from "@components/ui/IconButton";
import { X as Close } from "lucide-react";
import { cn } from "@utils/cn";

const TAG_SIZE_LG = "lg";
const tagVariants = cva(
  "inline-flex items-center rounded-full bg-bg-default text-primary-main border border-primary-main transition-colors duration-200",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      deletable: {
        true: "pr-2 pl-4",
        false: "",
      },
    },
    defaultVariants: { size: TAG_SIZE_LG, deletable: false },
  },
);

export type TagProps = {
  onDelete?: () => void;
  text: string;
} & VariantProps<typeof tagVariants>;

/**
 * 텍스트 태그 컴포넌트
 *
 * 선택적으로 닫기(삭제) 버튼을 가질 수 있으며, 크기별 스타일이 다르게 적용됩니다.
 *
 * @param text - 태그에 표시할 텍스트
 * @param deletable - 닫기 버튼 표시 여부
 * @param onDelete - 닫기 버튼 클릭 시 호출되는 콜백 함수
 * @param size - 태그 크기 (sm, lg) sm은 분류, lg는 검색어(삭제가능)
 *
 * @example
 * <Tag text="Example" deletable onDelete={() => alert("삭제됨")} size="lg" />
 */
export const Tag = ({ deletable, onDelete, text, size }: TagProps) => {
  return (
    <div className={cn(tagVariants({ deletable, size }))}>
      <span className={cn({ "mr-1": deletable })}>{text}</span>
      {deletable && size === TAG_SIZE_LG && onDelete && (
        <IconButton
          iconClassName="w-4 h-4"
          onClick={onDelete}
          aria-label="close"
          As={Close}
        />
      )}
    </div>
  );
};

export default Tag;
