import { cookies } from "next/headers";
import { cache } from "react";
import { TUser } from "./userContext";

const GetUser = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let loggedIn = false;
  let user = {
    name: "",
    email: "",
  };

  if (token && tokenValid(token)) {
    loggedIn = true;
    user = await fetchUserData(token);
  }

  return {
    loggedIn,
    user,
  };
});

// TODO: Replace this with a real token validation with jwt
function tokenValid(token: string) {
  return !!token;
}

// TODO: Replace this with a real API call
async function fetchUserData(token: string): Promise<TUser> {
  console.log(token);
  return {
    name: "John Doe",
    email: "asdf@tesst.com",
  };
}

export default GetUser;
