import Icon, { IconProps } from "@components/ui/Icon";
import Link, { LinkProps } from "next/link";
import { cn } from "@utils/cn";
import React from "react";

export type IconButtonProps = (
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
      href: LinkProps["href"];
    })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
) &
  BaseProps;

type BaseProps = {
  iconSize?: IconProps["size"];
  iconClassName?: string;
  "aria-label": string;
  As: IconProps["As"];
};

/**
 * 아이콘 버튼 컴포넌트
 * @param href - Next.js Link 컴포넌트의 href 속성. 이 prop이 존재하면 Link로 렌더링됩니다.
 * @param ariaLabel - 버튼/링크의 aria-label
 * @param iconClassName - 아이콘 tailwind 클래스
 * @param iconSize - 아이콘 크기(default: 24)
 * @param className - tailwind 클래스
 * @param As - 아이콘 컴포넌트
 * @param props - 버튼 속성
 *
 * @example
 * 버튼으로 사용
 * <IconButton aria-label="버튼" iconClassName="w-4 h-4" iconSize={24} As={HamburgerIcon} />
 *
 * 링크로 사용
 * <IconButton href="/" aria-label="링크" iconClassName="w-4 h-4" iconSize={24} As={HamburgerIcon} />
 */
const IconButton = ({
  "aria-label": ariaLabel,
  iconClassName,
  className,
  iconSize,
  href,
  As,
  ...props
}: IconButtonProps) => {
  if (href) {
    const linkProps = props as Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    >;

    return (
      <Link
        className={cn(
          "flex cursor-pointer items-center justify-center",
          className,
        )}
        aria-label={ariaLabel}
        href={href}
        {...linkProps}
      >
        <Icon className={iconClassName} size={iconSize} As={As} />
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-center",
        className,
      )}
      aria-label={ariaLabel}
      {...buttonProps}
    >
      <Icon className={iconClassName} size={iconSize} As={As} />
    </button>
  );
};

export default IconButton;
