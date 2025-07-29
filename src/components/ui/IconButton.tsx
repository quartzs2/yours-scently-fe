import Icon, { IconProps } from "@components/ui/Icon";
import { cn } from "@utils/cn";
import React from "react";

export type IconButtonProps = {
  ref?: React.Ref<HTMLButtonElement>;
  iconSize?: IconProps["size"];
  iconClassName?: string;
  As: IconProps["As"];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * 아이콘 버튼 컴포넌트
 * @param ariaLabel - 버튼의 aria-label
 * @param iconClassName - 아이콘 tailwind 클래스
 * @param iconSize - 아이콘 크기(default: 24)
 * @param className - tailwind 클래스
 * @param As - 아이콘 컴포넌트
 * @param props - 버튼 속성
 *
 * @example
 * <IconButton aria-label="버튼" iconClassName="w-4 h-4" iconSize={24} As={HamburgerIcon} />
 */
const IconButton = ({
  "aria-label": ariaLabel,
  iconClassName,
  className,
  iconSize,
  onClick,
  ref,
  As,
  ...props
}: IconButtonProps) => {
  if (process.env.NODE_ENV === "development" && !ariaLabel) {
    // eslint-disable-next-line no-console
    console.warn("aria-label is required");
  }

  return (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-center",
        className,
      )}
      aria-label={ariaLabel}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <Icon className={iconClassName} size={iconSize} As={As} />
    </button>
  );
};

export default IconButton;
