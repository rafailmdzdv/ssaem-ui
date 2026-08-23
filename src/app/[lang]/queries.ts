import { cache } from "react";

import { authorizationHeader } from "@/lib/auth";
import { User, userSchema } from "@/lib/types";

export const getUser: () => Promise<User | null> = cache(async function () {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  const response = await fetch(`${process.env.BACKEND_API_URL}/user/`, {
    headers: { Authorization: authHeader },
  });
  return await userSchema.parseAsync(await response.json());
});
