import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import linguiConfig from "../lingui.config";

const { locales } = linguiConfig;

const TOKEN_COOKIE_FIELD = "access_token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return await processAuth(request);

  // Redirect if there is no locale
  const locale = await getRequestLocale(request.headers);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

async function processAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  if (pathname.includes("/auth") && cookieStore.get(TOKEN_COOKIE_FIELD)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!pathname.includes("/auth") && !cookieStore.get(TOKEN_COOKIE_FIELD)) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

async function getRequestLocale(requestHeaders: Headers): Promise<string> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE");
  const langHeader = requestHeaders.get("accept-language") || undefined;
  const languages = new Negotiator({
    headers: { "Accept-Language": langHeader },
  }).languages(locales.slice());

  const activeLocale =
    localeCookie?.value || languages[0] || locales[0] || "en";

  return activeLocale;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
