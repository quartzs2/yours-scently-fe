import {
  CircleUserRound,
  ShoppingCart,
  Search,
  LogIn,
  Menu,
} from "lucide-react";
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
  return (
    <header className="flex h-[var(--height-header)] items-center justify-center border-b border-border-default select-none">
      <div className="flex w-full max-w-[var(--width-container)] items-center justify-between sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
        {/* 헤더 좌측 섹션 */}
        <IconButton
          iconClassName={ICON_STYLE}
          aria-label="메뉴 열기"
          As={Menu}
        />
        {/* 로고 */}
        <Link href={URLS.HOME}>
          <Logo />
        </Link>
        <div className="flex items-center gap-6">
          {/* 헤더 우측 섹션 */}
          <IconButton
            iconClassName={ICON_STYLE}
            aria-label="ai 추천 검색"
            href={URLS.AI_SEARCH}
            As={Search}
          />
          {isLoggedIn ? (
            <>
              {/* TODO: 장바구니 기능 추가 후 링크 이동 추가 */}
              <IconButton
                iconClassName={ICON_STYLE}
                aria-label="장바구니"
                As={ShoppingCart}
              />
              <IconButton
                id={TRIGGER_ID.MY_PAGE_ICON_TRIGGER}
                iconClassName={ICON_STYLE}
                href={URLS.MY_PAGE_MODAL}
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
