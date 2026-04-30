import "./globals.css";

import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";

import { ThemeProvider } from "@/app/components/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { arFont, enFont } from "@/i18n/fonts";
import { getLocale } from "@/i18n/get-locale";
import { cn } from "@/lib/utils";

import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "MediQueue - Smart Appointment System",
  description: "Smart clinic appointment management system",
  category: "medical",
  keywords: ["medical", "appointment", "book appointment", "hospital"],
  manifest: "./manifest.json",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const fontClass = isRTL ? arFont.className : enFont.className;

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={cn("h-full font-sans antialiased", fontClass)}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon-192.png" sizes="32x32" />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <DirectionProvider dir={isRTL ? "rtl" : "ltr"}>
              <Navbar />
              <main className="grid flex-1">{children}</main>
            </DirectionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
