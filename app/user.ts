import { cookies } from "next/headers";
import { cache } from "react";
import { TUser } from "./user-context";
import { VerifyToken } from "@/serviceInterfaces/json-web-token";

/**
 * Use this function to get the user's information from a SERVER COMPONENT.
 * You have to use the useUser custom hook from client components.
 * */
export const User = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let loggedIn = false;
  let user: TUser | null = null;

  if (token) {
    const tokenUser = VerifyToken(token);
    if (tokenUser) {
      loggedIn = true;
      user = {
        email: tokenUser.email,
        firstName: tokenUser.firstName,
        lastName: tokenUser.lastName,
      };
    }
  }

  return {
    loggedIn,
    user,
  };
});

export default User;
