import { TUser } from "@/app/user-context";
import { GetUserFromEmail } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { NextRequest } from "next/server";

/** Handle the login request. */
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ message: "Email and password are required" }, { status: 400 });
  }

  const user = await LoginValid(email, password);

  if (!user) {
    return Response.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const token = CreateUserToken(user);

  return Response.json({ message: "Success", token }, { status: 200 });
}

/** Validate the login credentials. Return the user if valid */
async function LoginValid(email: string, _password: string): Promise<TUser | null> {
  const dbUser = await GetUserFromEmail(email);

  if (!dbUser) {
    return null;
  }

  // TODO: Validate password

  return {
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
  };
}
