import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "AGROEXPORT",
    template: "%s | AGROEXPORT UA",
  },
  icons: {
    icon: "/favicon.ico"
  },
  description:
    "Connect directly with verified Ukrainian producers. Structured RFQ workflow, transparent communication, no intermediaries and no prepayments.",
  keywords: [
    "sunflower oil",
    "RFQ",
    "Ukraine export",
    "Ukrainian manufacturers",
    "agroexport",
  ],

};

export const viewport: Viewport = {
  themeColor: "#0a3d91",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--page-bg)] text-slate-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
