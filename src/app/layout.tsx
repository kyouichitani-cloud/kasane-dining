import type { Metadata, Viewport } from "next";
import { DM_Sans, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kyouichitani-cloud.github.io/kasane-dining/"),
  title: {
    default: "KASANE | 季節を重ねるレストラン",
    template: "%s | KASANE",
  },
  description:
    "旬の食材を炭火の香りと発酵のうま味で仕立てる、大阪・北浜の季節料理レストラン。記念日にも普段の夕食にも楽しめるコースをご用意しています。",
  keywords: ["大阪 レストラン", "記念日 ディナー", "炭火料理", "季節のコース"],
  openGraph: {
    title: "KASANE | 季節を重ねるレストラン",
    description: "旬の食材を炭火の香りと発酵のうま味で仕立てる、大阪・北浜の季節料理レストラン。",
    type: "website",
    locale: "ja_JP",
    images: [{ url: "images/hero-kasane.webp", width: 1920, height: 1080 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f4f1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          本文へ移動
        </a>
        {children}
      </body>
    </html>
  );
}
