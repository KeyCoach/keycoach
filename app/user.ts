import { cache } from "react";
import { TUser } from "./user-context";
import { VerifyToken } from "@/service-interfaces/json-web-token";
import { GetToken } from "@/utils/get-token";

/**
 * Use this function to get the user's information from a SERVER COMPONENT.
 * You have to use the useUser custom hook from client components.
 * */
export const User = cache(async () => {
  const token = await GetToken();

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
