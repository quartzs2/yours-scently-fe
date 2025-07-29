import type { Metadata } from "next";

import Header from "@components/common/Header";
import "@app/globals.css";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={suit.className} lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
