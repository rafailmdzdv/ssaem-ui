"use client";

import { createContext } from "react";

import { EmptyUser, type User } from "@/lib/types";

export const UserContext = createContext(EmptyUser);

export function UserProvider({
  children,
  user,
}: Readonly<{ children: React.ReactNode; user: User }>) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
