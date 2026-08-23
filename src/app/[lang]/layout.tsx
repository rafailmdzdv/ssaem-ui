import { type Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { LinguiClientProvider } from "@/components/lingui-client-provider";
import { ThemeProvider } from "@/components/theme-provider";
import initLingui from "@/initLingui";
import { EmptyUser } from "@/lib/types";
import { cn } from "@/lib/utils";

import "./globals.css";
import { UserProvider } from "./providers";
import { getUser } from "./queries";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ssaem - AI-powered language learning platform",
  description: "Multi-language AI-powered language learning platform.",
};

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}>) {
  const lang = (await params).lang;
  const i18n = initLingui(lang);
  const user = await getUser();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        montserrat.variable,
      )}
    >
      <body className="w-full">
        <ThemeProvider>
          <UserProvider user={user ?? EmptyUser}>
            <LinguiClientProvider
              initialLocale={lang}
              initialMessages={i18n.messages!}
            >
              <div className="flex h-full flex-col">
                <Header lang={lang} />
                <hr />
                {children}
                <hr />
                <Footer lang={lang} />
              </div>
            </LinguiClientProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
