"use client";
import { createContext, useContext } from "react";
import { User } from "./lib/types";

const UserContext = createContext({});

export default function UserProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: {
    user: User | null;
    loggedIn: boolean;
  };
}) {
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
