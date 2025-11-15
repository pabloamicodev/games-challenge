import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GamerShop - Your Ultimate Game Store | Apply Digital",
    template: "%s | GamerShop",
  },
  description: "Discover and purchase the best video games at GamerShop. Browse our extensive catalog of top-selling games across all genres. Fast delivery, great prices.",
  keywords: ["video games", "game store", "buy games", "gaming", "pc games", "console games", "game catalog"],
  authors: [{ name: "Apply Digital" }],
  creator: "Apply Digital",
  publisher: "GamerShop",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GamerShop",
    title: "GamerShop - Your Ultimate Game Store",
    description: "Discover and purchase the best video games. Browse our extensive catalog of top-selling games.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GamerShop - Your Ultimate Game Store",
    description: "Discover and purchase the best video games.",
    creator: "@gamershop",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00A8E8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <a href="#main-content" className="sr-only ">
          Skip to main content
        </a>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
