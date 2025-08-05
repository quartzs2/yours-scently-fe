"use client";

import {
  CircleUserRound,
  ShoppingCart,
  Search,
  LogIn,
  Menu,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import IconButton from "@components/ui/IconButton";
import { TRIGGER_ID } from "@constants/triggers";
import Logo from "@assets/logo/logo-gray.svg";
import { URLS } from "@constants/urls";
import Link from "next/link";

type HeaderProps = {
  isLoggedIn: boolean;
};

const ICON_STYLE = "text-primary-main";

const Header = ({ isLoggedIn }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAiSearchModalOpen = pathname === URLS.AI_SEARCH;
  const isMyPageModalOpen = pathname === URLS.MY_PAGE_MODAL;

  return (
    <header className="flex h-[var(--height-header)] items-center justify-center border-b border-border-default select-none">
      <div className="flex w-full max-w-[var(--width-container)] items-center justify-between sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        <div className="flex flex-1 items-center gap-6">
          {/* 헤더 좌측 섹션 */}
          <IconButton
            iconClassName={ICON_STYLE}
            aria-label="메뉴 열기"
            As={Menu}
          />
        </div>
        {/* 로고 */}
        <Link href={URLS.HOME}>
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-end gap-6">
          {/* 헤더 우측 섹션 */}
          <IconButton
            href={isAiSearchModalOpen ? undefined : URLS.AI_SEARCH}
            onClick={isAiSearchModalOpen ? router.back : undefined}
            id={TRIGGER_ID.AI_SEARCH_ICON_TRIGGER}
            iconClassName={ICON_STYLE}
            aria-label="ai 추천 검색"
            As={Search}
          />
          {isLoggedIn ? (
            <>
              <IconButton
                iconClassName={ICON_STYLE}
                aria-label="장바구니"
                As={ShoppingCart}
                href={URLS.CART}
              />
              <IconButton
                href={isMyPageModalOpen ? undefined : URLS.MY_PAGE_MODAL}
                onClick={isMyPageModalOpen ? router.back : undefined}
                id={TRIGGER_ID.MY_PAGE_ICON_TRIGGER}
                iconClassName={ICON_STYLE}
                As={CircleUserRound}
                aria-label="마이페이지"
              />
            </>
          ) : (
            <>
              <IconButton
                iconClassName={ICON_STYLE}
                aria-label="로그인"
                As={LogIn}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
