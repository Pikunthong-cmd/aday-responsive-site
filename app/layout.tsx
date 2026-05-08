import type { Metadata } from "next";
import "./globals.css";

import { lineSeedSansTH } from "./font";
import Footer from "@/components/ui/Footer";
import WatchCursor from "@/components/ui/WatchCursor";
import Header from "@/components/layout/Header";
import CookieConsent from "@/components/cookie/CookieConsent";


export const metadata: Metadata = {
  title: {
    default: "a day magazine",
    template: "%s | a day magazine",
  },
  description: "a day magazine - creative magazine for curious people",
  metadataBase: new URL("https://adaymagazine.com"), // ปรับตาม domain จริง
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "a day magazine",
    description: "a day magazine - creative magazine for curious people",
    url: "https://adaymagazine.com",
    siteName: "a day magazine",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "a day magazine",
    description: "a day magazine - creative magazine for curious people",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={lineSeedSansTH.className}>
        <Header />
        <main>{children}</main>
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
