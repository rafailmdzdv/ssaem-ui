"use client";

import {
  Context,
  type Dispatch,
  type SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { EmptyUser, type User } from "@/lib/types";

export const UserContext: Context<{
  user: User;
  setUserFn: SetStateAction<Dispatch<User>> | null;
}> = createContext({ user: EmptyUser, setUserFn: null });

export function UserProvider({
  children,
  user: apiUser,
}: Readonly<{ children: React.ReactNode; user: User }>) {
  const [user, setUser] = useState<User>(apiUser);
  useEffect(() => {
    setUser(apiUser);
  }, [apiUser]);
  return (
    <UserContext.Provider value={{ user, setUserFn: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
