import type { Metadata } from "next";
import { Bruno_Ace, Geist, Geist_Mono, Slackey } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/app/scroll-to-top";
import { ThemeProvider } from "@/components/ui/theme-provider";
import SessionWrap from "./components/SessionWrap/SessionWrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const slackey = Slackey({
  variable: "--font-slackey",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brunoAce = Bruno_Ace({
  variable: "--font-bruno-ace",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "GearShift Rentals",
  description: "A car rental service for all your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`absolute inset-0 z-0 ${geistSans.variable} ${geistMono.variable} ${brunoAce.variable} ${slackey.variable} antialiased font-mono`}
        style={{
          backgroundImage: `
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 19px,
      var(--grid-line) 19px,
      var(--grid-line) 20px,
      transparent 20px,
      transparent 39px,
      var(--grid-line) 39px,
      var(--grid-line) 40px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 19px,
      var(--grid-line) 19px,
      var(--grid-line) 20px,
      transparent 20px,
      transparent 39px,
      var(--grid-line) 39px,
      var(--grid-line) 40px
    ),
    radial-gradient(circle at 20px 20px, var(--grid-dot) 2px, transparent 2px),
    radial-gradient(circle at 40px 40px, var(--grid-dot) 2px, transparent 2px)
  `,
          backgroundSize: "40px 40px",
        }}
      >
        <SessionWrap>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" />
            <ScrollToTop />

            <Navbar />
            {children}
          </ThemeProvider>
        </SessionWrap>
      </body>
    </html>
  );
}
