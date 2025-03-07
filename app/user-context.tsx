"use client";
import { createContext, useContext, useState } from "react";
import { User, UserContextType } from "./lib/types";

const UserContext = createContext({});

export default function UserProvider({
  children,
  user: userProp,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [user, setUser] = useState(userProp);
  const data = { user, setUser };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useHandTrack must be used within a HandTrackProvider");
  }
  return context as UserContextType;
}
