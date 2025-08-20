"use client";

import {
  CircleUserRound,
  ShoppingCart,
  Search,
  LogIn,
  Menu,
} from "lucide-react";
import MyPageModal from "@components/feature/my-page-modal/MyPageModal";
import { usePathname, useRouter } from "next/navigation";
import IconButton from "@components/ui/IconButton";
import { TRIGGER_ID } from "@constants/triggers";
import Logo from "@assets/logo/logo-gray.svg";
import { URLS } from "@constants/urls";
import { overlay } from "overlay-kit";
import Link from "next/link";

type HeaderProps = {
  isLoggedIn: boolean;
};

const ICON_STYLE = "text-primary-main";

const Header = ({ isLoggedIn }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAiSearchModalOpen = pathname === URLS.AI_SEARCH;

  return (
    <header className="flex h-[var(--height-header)] items-center justify-center border-b border-border-default select-none">
      <div className="flex w-full max-w-[var(--width-container)] items-center justify-between px-5 sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)] md:px-0">
        <div className="flex flex-1 items-center gap-6">
          {/* 헤더 좌측 섹션 */}
          <IconButton
            iconClassName={ICON_STYLE}
            href={URLS.PRODUCTS}
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
                onClick={() => {
                  overlay.open(({ unmount, isOpen, close }) => (
                    <MyPageModal
                      onClose={() => {
                        close();
                        unmount();
                      }}
                      isOpen={isOpen}
                    />
                  ));
                }}
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
                href={URLS.LOGIN}
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
