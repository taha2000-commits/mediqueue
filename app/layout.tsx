import "./globals.css";

import { BadgeCheck, OctagonAlert } from "lucide-react";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/app/components/theme-provider";
import { DirectionProvider } from "@/components/ui/direction";
import { TooltipProvider } from "@/components/ui/tooltip";
import { arFont, enFont } from "@/i18n/fonts";
import { getLocale } from "@/i18n/get-locale";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";

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
            <TooltipProvider>
              <DirectionProvider dir={isRTL ? "rtl" : "ltr"}>
                <QueryProvider>
                  <Navbar />
                  <main className="grid flex-1">{children}</main>
                </QueryProvider>
              </DirectionProvider>
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster
          icons={{
            success: <BadgeCheck size={20} color="#22c55e" />,
            error: <OctagonAlert size={20} color="#ef4444" />,
          }}
        />
      </body>
    </html>
  );
}
