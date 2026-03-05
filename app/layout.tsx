import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import Header from "../components/Header";
import Providers from "../components/Providers";
import BackgroundFX from "../components/BackgroundFX";

/* 🍏 Apple-style clean font */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Falak Systems",
    template: "%s | Falak Systems",
  },
  description:
    "Slimme IT- & AI-systemen voor groeiende organisaties.",
  metadataBase: new URL("https://falak-systems.com"),
  openGraph: {
    title: "Falak Systems",
    description:
      "Slimme IT- & AI-systemen voor groeiende organisaties.",
    url: "https://falak-systems.com",
    siteName: "Falak Systems",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Falak Systems",
    description:
      "Slimme IT- & AI-systemen voor groeiende organisaties.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-[#0B0F19] text-white antialiased`}
      >
        <Providers>
          <BackgroundFX />
          <Header />

          {/* Prevent content from hiding under fixed header */}
          <main className="pt-28 sm:pt-32">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}