import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Tamaasha Lounge & Bar | Tucker, GA",
  description:
    "Experience opulent ambiance, craft cocktails, hookah, and live events at Tamaasha Lounge & Bar in Tucker, Georgia. Reserve your table today.",
  keywords: "lounge, bar, hookah, cocktails, events, Tucker GA, nightlife",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
