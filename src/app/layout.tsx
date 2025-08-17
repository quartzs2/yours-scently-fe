import type { Metadata } from "next";

import OverlayProvider from "@components/common/OverlayProvider";
import "@app/globals.css";
import { TOKEN_COOKIE_NAME } from "@constants/auth";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import localFont from "next/font/local";
import { cookies } from "next/headers";

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

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has(TOKEN_COOKIE_NAME.ACCESS_TOKEN);

  return (
    <html className={suit.className} lang="ko">
      <body>
        <OverlayProvider>
          <Header isLoggedIn={isLoggedIn} />
          {children}
          {modal}
          <Footer />
        </OverlayProvider>
      </body>
    </html>
  );
}
