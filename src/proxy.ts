import Negotiator from "negotiator";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import linguiConfig from "../lingui.config";
import { DEFAULT_ROUTE, Routes } from "./routes";

const { locales } = linguiConfig;

const TOKEN_COOKIE_FIELD = "access_token";

export async function proxy(request: NextRequest) {
  let { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return await processAuth(request);

  if (pathname == "/") {
    pathname = DEFAULT_ROUTE;
  }
  const locale = await getRequestLocale(request.headers);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

async function processAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  if (pathname.includes(Routes.AUTH) && cookieStore.get(TOKEN_COOKIE_FIELD)) {
    return NextResponse.redirect(new URL(Routes.ROOT, request.url));
  }
  if (!pathname.includes(Routes.AUTH) && !cookieStore.get(TOKEN_COOKIE_FIELD)) {
    return NextResponse.redirect(new URL(Routes.AUTH, request.url));
  }
  return Object.values(Routes).some((path) => pathname.includes(path))
    ? NextResponse.next()
    : NextResponse.redirect(new URL(DEFAULT_ROUTE, request.url));
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
