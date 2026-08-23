"use server";
import { cookies } from "next/headers";

export async function authorizationHeader(): Promise<string | null> {
  const accessTokenCookie = (await cookies()).get("access_token");
  return (
    (accessTokenCookie?.value && "Bearer " + accessTokenCookie.value) || null
  );
}
