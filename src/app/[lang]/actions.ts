"use server";
import { userRoutes } from "@/lib/api/user";
import { authorizationHeader } from "@/lib/auth";
import { type UpdateUserFields, updateUserTargetSchema } from "@/lib/types";

export async function updateUser(formData: UpdateUserFields) {
  const authHeader = await authorizationHeader();
  if (!authHeader) {
    return null;
  }
  await fetch(userRoutes.update(), {
    method: "PATCH",
    body: JSON.stringify(await updateUserTargetSchema.parseAsync(formData)),
    headers: { Authorization: authHeader, "Content-Type": "application/json" },
  });
}
