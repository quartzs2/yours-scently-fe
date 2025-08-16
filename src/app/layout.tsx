import type { Metadata } from "next";

import OverlayProvider from "@components/common/OverlayProvider";
import "@app/globals.css";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import localFont from "next/font/local";

export const metadata: Metadata = {
  description: "취향에 맞는 향수를 추천해주는 향수 쇼핑몰",
  title: "Yours, Scently",
};

const suit = localFont({
  src: [
    {
      path: "../assets/fonts/SUIT-Variable.woff2",
      weight: "100 900",
    },
  ],
});

export default function RootLayout({
  children,
  subModal,
  modal,
}: Readonly<{
  children: React.ReactNode;
  subModal: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html className={suit.className} lang="ko">
      <body>
        <OverlayProvider>
          {/* TODO: 로그인 상태 처리 로직 추가 후 수정 */}
          <Header isLoggedIn={true} />
          {children}
          {modal}
          {subModal}
          <Footer />
        </OverlayProvider>
      </body>
    </html>
  );
}
