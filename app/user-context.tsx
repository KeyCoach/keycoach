"use client";
import { createContext, useContext } from "react";

export type TUser = {
  email: string;
  firstName: string;
  lastName: string;
};

export const UserContext = createContext({});
export default function UserProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: {
    user: TUser | null;
    loggedIn: boolean;
  };
}) {
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
