import { User } from "@/app/lib/types";
import { BcryptVerifyPassword } from "@/service-interfaces/bcrypt";
import { GetUserByEmail } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { NextRequest } from "next/server";

/** Login a user. */
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
async function LoginValid(email: string, password: string): Promise<User | null> {
  const dbUser = await GetUserByEmail(email);

  if (!dbUser) {
    return null;
  }

  if (!BcryptVerifyPassword(password, dbUser.passwordHash)) {
    return null;
  }

  return {
    id: dbUser.id,
    fname: dbUser.fname,
    lname: dbUser.lname,
    email: dbUser.email,
  };
}
