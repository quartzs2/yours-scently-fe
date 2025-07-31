import { cn } from "@utils/cn";
import React from "react";

export type IconProps = {
  As: SvgIconComponent;
  size?: number;
} & React.SVGProps<SVGSVGElement>;
type SvgIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

/**
 * 아이콘 컴포넌트
 * @param className - tailwind 클래스
 * @param size - 아이콘 컴포넌트의 크기
 * @param As - 아이콘 컴포넌트
 * @param props - 아이콘 컴포넌트의 속성
 *
 * @example
 * <Icon As={HamburgerIcon} />
 */
const Icon = ({ className, size = 24, As, ...props }: IconProps) => {
  return (
    <As
      className={cn("select-none", className)}
      height={size}
      width={size}
      {...props}
    />
  );
};

export default Icon;
