import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils/cn";

const statusTagVariants = cva(
  "px-3 py-1 rounded-md inline-block text-xs font-medium shadow-sm transition-colors duration-200",
  {
    variants: {
      type: {
        processing:
          "bg-bg-default text-primary-main border border-primary-main",
        preparing: "bg-bg-subtle text-primary-dark border border-primary-dark",
        temporarilyOut: "bg-orange-100 text-orange-800",
        delivered: "bg-primary-dark text-bg-default",
        shipped: "bg-primary-main text-bg-subtle",
        inventory: "bg-green-100 text-green-800",
        soldOut: "bg-red-100 text-red-800",
      },
    },
  },
);

export type StatusTagProps = VariantProps<typeof statusTagVariants> & {
  text: string;
};

/**
 * 상태를 나타내는 태그 컴포넌트
 *
 * 상품, 주문 등 다양한 상태를 색상과 텍스트로 시각적으로 표현합니다.
 *
 * @param type - 상태 유형 (예: "재고", "일시품절", "품절" 등)
 * @param text - 태그 안에 표시될 텍스트
 *
 * @example
 * <StatusTag type="soldOut" text="품절" />
 */
export const StatusTag = ({ text, type }: StatusTagProps) => {
  return <div className={cn(statusTagVariants({ type }))}>{text}</div>;
};

export default StatusTag;
