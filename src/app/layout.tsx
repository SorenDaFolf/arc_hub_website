// DO NOT put "use client" in this file — it must be a Server Component.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "A.R.C Foundation", template: "%s • A.R.C Event" },
  description:
    "Official A.R.C Foundation Hub Website.",
  openGraph: {
    title: "A.R.C Foundation",
    description:
      "Join the A.R.C community challenge. Four public servers, two private, prizes and glory.",
    type: "website",
    url: "https://arcfoundation.net/",
    images: [{ url: "/arc-logo.png", width: 1200, height: 630, alt: "A.R.C Event" }],
  },
  twitter: { card: "summary_large_image", creator: "@vexinarcane" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased body-grid`}>
        {children}
      </body>
    </html>
  );
}
