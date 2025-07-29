import { Search, LogIn, Menu } from "lucide-react";
import IconButton from "@components/ui/IconButton";
import Logo from "@assets/logo/logo-gray.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex h-[var(--height-header)] items-center justify-center">
      <div className="flex w-full max-w-[var(--width-container)] items-center justify-between sm:max-w-[var(--width-container-sm)] md:max-w-[var(--width-container-md)]">
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
            aria-label="검색"
            As={Search}
          />
          <IconButton
            iconClassName="text-primary-main"
            aria-label="로그인"
            As={LogIn}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
