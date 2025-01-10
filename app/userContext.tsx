"use client";
import { createContext } from "react";

export type TUser = {
  email: string;
  name: string;
};

export const UserContext = createContext({});
export default function UserProvider({ children, user }: { children: React.ReactNode; user: any }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
