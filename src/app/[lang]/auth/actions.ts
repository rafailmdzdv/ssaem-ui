"use server";

import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authRoutes } from "@/app/[lang]/auth/api";
import { authorizationHeader } from "@/lib/auth";

export async function signIn(formData: FormData) {
  const cookieStore = await cookies();
  const accessSeconds = 900;
  const refreshSeconds = 259200;
  const date = new Date();
  const accessExpiryDate = date.setTime(date.getTime() + accessSeconds * 1000);
  const refreshExpiryDate = date.setTime(
    date.getTime() + refreshSeconds * 1000,
  );
  if (cookieStore.get("refresh_token")) {
    await refreshToken(cookieStore, accessExpiryDate);
  } else {
    const response = await fetch(authRoutes.auth(), {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const json = await response.json();
    setAccessToken(cookieStore, json.access_token, accessExpiryDate);
    cookieStore.set("refresh_token", json.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: refreshExpiryDate,
    });
  }
  redirect("/");
}

async function refreshToken(
  cookieStore: ReadonlyRequestCookies,
  expiryDate: number,
) {
  const response = await fetch(authRoutes.refresh(), {
    method: "POST",
    body: JSON.stringify({
      refresh_token: cookieStore.get("refresh_token")?.value,
    }),
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const json = await response.json();
  setAccessToken(cookieStore, json.access_token, expiryDate);
}

function setAccessToken(
  cookieStore: ReadonlyRequestCookies,
  token: string,
  expiryDate: number,
) {
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiryDate,
  });
}

export async function logOut() {
  const cookieStore = await cookies();
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  await fetch(authRoutes.logout(), {
    method: "POST",
    headers: { Authorization: authHeader },
  });
  ["access_token", "refresh_token"].every((key) => cookieStore.delete(key));
  redirect("/");
}
