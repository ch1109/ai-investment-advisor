import type {Metadata} from "next";

import "./globals.css";
import "./ue-webview-compat.css";

import {routing} from "@/i18n/routing";
import BrowserCompatibility from "@/components/BrowserCompatibility";

export const metadata: Metadata = {
  title: "AI 投顾 - 您的智能投资决策伙伴",
  description: "通过 AI 技术，提供个性化、数据驱动、简单易懂的投资决策辅助，让复杂的投资变得轻松。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={routing.defaultLocale}>
      <body className="antialiased bg-gray-50 min-h-screen">
        <BrowserCompatibility />
        {children}
      </body>
    </html>
  );
}
