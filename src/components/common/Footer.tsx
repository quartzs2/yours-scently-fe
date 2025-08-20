import InstagramLogo from "@assets/icons/footer/icon-sns-instagram.svg";
import YoutubeLogo from "@assets/icons/footer/icon-sns-youtube.svg";
import KakaoLogo from "@assets/icons/footer/icon-sns-kakao.svg";
import BlogLogo from "@assets/icons/footer/icon-sns-blog.svg";
import IconButton from "@components/ui/IconButton";
import Logo from "@assets/logo/logo-white.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-[322px] items-center justify-center bg-[#4F555E]">
      <div className="flex w-full max-w-[var(--width-container)] flex-col justify-between gap-6 md:max-w-[var(--width-container-md)] md:flex-row">
        {/* 왼쪽: 로고 및 아이콘 */}
        <div className="space-y-6">
          <Link href="/">
            <Logo />
          </Link>

          {/* SNS 아이콘 */}
          <div className="mt-[56px] flex gap-4">
            <IconButton
              iconClassName="text-bg-default"
              aria-label="kakao"
              As={KakaoLogo}
            />
            <IconButton
              iconClassName="text-bg-default"
              aria-label="blog"
              As={BlogLogo}
            />
            <IconButton
              iconClassName="text-bg-default"
              aria-label="youtube"
              As={YoutubeLogo}
            />
            <IconButton
              iconClassName="text-bg-default"
              aria-label="instagram"
              As={InstagramLogo}
            />
          </div>
        </div>

        {/* 오른쪽: 텍스트 정보 */}
        <div className="text-button-1 space-y-4 text-bg-default">
          {/* 링크 */}
          <div className="flex flex-wrap gap-6">
            {/* TODO: 나중에 실제 링크 추가 */}
            <Link className="hover:underline" href="/">
              개인정보처리방침
            </Link>
            {/* TODO: 나중에 실제 링크 추가 */}
            <Link className="hover:underline" href="/">
              이용약관
            </Link>
            {/* TODO: 나중에 실제 링크 추가 */}
            <Link className="hover:underline" href="/">
              고객센터
            </Link>
          </div>

          {/* 회사 정보 */}
          <div className="text-button-1 mt-[73.5px] space-y-1">
            <p>
              대표자: 임재민 | 사업자 등록번호: 123-45-67891 | 통신판매업
              신고번호: 2020-경기판교-37256
            </p>
            <p>
              주소: 경기도 성남시 시흥동 27 201호 | 이메일:
              kdigital@naturesm.co.kr | 전화: 070-4099-6219
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
