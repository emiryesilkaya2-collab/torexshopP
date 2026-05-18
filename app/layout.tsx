import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TorexShop",
  description: "TorexShop redeem sistemi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
