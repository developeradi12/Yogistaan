import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/frontpages/Header";
import Footer from "@/components/frontpages/Footer";
import AnnouncementBar from "@/components/frontpages/AnnouncementBar";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yogistaan",
  description: "Yoga Teacher Training, Retreats & Spiritual Adventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/*
         * SmoothScroll wraps everything so Lenis intercepts ALL wheel events
         * on the page. It must be inside <body> but outside CartProvider
         * so it initialises before any scroll-dependent components mount.
         */}
        <SmoothScroll>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}