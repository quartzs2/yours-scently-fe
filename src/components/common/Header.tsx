import { Search, LogIn, Menu } from "lucide-react";
import IconButton from "@components/ui/IconButton";
import Logo from "@assets/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-[80px] items-center justify-center">
      <div className="flex w-[1280px] items-center justify-between">
        {/* 헤더 좌측 섹션 */}
        <IconButton
          iconClassName="text-primary-main"
          aria-label="메뉴 열기"
          As={Menu}
        />
        {/* 로고 */}
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-6">
          {/* 헤더 우측 섹션 */}
          <IconButton
            iconClassName="text-primary-main"
            aria-label="로그인"
            As={LogIn}
          />
          <IconButton
            iconClassName="text-primary-main"
            aria-label="검색"
            As={Search}
          />

          {/* <IconButton
            iconClassName="text-primary-main"
            As={ShoppingCart}
            aria-label="장바구니"
          />
          <IconButton
            iconClassName="text-primary-main"
            aria-label="마이페이지"
            As={CircleUser}
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
