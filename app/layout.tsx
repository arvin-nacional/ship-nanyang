import React from "react";
import type { Metadata } from "next";

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Effortless Shipping from China to Your Doorstep",
  description:
    "Order what you need from China, and let us handle the journey—fast, dependable delivery to your front door.",

  openGraph: {
    images: [
      {
        url: "/assets/images/social-share.png",
        width: 1200,
        height: 630,
        alt: "Effortless Shipping from China to Your Doorstep.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
