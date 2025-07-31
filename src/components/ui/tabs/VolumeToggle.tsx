import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@utils/cn";

const volumeToggleVariants = cva(
  "px-3 py-2 rounded-md inline-block text-sm font-bold transition-colors duration-200",
  {
    variants: {
      isOn: {
        true: "bg-bg-default text-primary-main border border-primary-main",
        false: "bg-primary-main text-bg-default",
      },
    },
    defaultVariants: { isOn: false },
  },
);

export type VolumeToggleProps = {
  /**
   * 버튼 안에 표시할 텍스트입니다.
   * 기본값은 "mL" 입니다.
   */
  text?: string;
} & VariantProps<typeof volumeToggleVariants> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const DEFAULT_VOLUME_TEXT = "mL";

/**
 * 용량 토글 버튼 컴포넌트
 *
 * 활성화 여부에 따라 스타일이 변경되며, 텍스트를 커스터마이징할 수 있습니다.
 *
 * @param text - 버튼에 표시할 텍스트 (기본: "mL") 용량 토글
 * @param isOn - 활성화 상태
 * @param props - 기타 button 요소 속성들
 *
 * @example
 * <VolumeToggle isOn={true} text="500mL" onClick={() => alert('Clicked')} />
 */
export const VolumeToggle = ({
  text = DEFAULT_VOLUME_TEXT,
  isOn,
  ...props
}: VolumeToggleProps) => {
  return (
    <button
      className={cn(volumeToggleVariants({ isOn }))}
      type="button"
      {...props}
    >
      {text}
    </button>
  );
};

export default VolumeToggle;
