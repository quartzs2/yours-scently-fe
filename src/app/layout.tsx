import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  description: "취향에 맞는 향수를 추천해주는 향수 쇼핑몰",
  title: "Yours, Scently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
