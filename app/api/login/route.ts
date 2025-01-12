import { TUser } from "@/app/user-context";
//import { BcryptVerifyPassword } from "@/serviceInterfaces/bcrypt";
import { GetDbUser } from "@/serviceInterfaces/dynamo-db";
import { SignToken } from "@/serviceInterfaces/json-web-token";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ message: "Email and password are required" }, { status: 400 });
  }

  const user = await LoginValid(email, password);

  if (!user) {
    return Response.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const token = SignToken(user);

  return Response.json({ message: "Success", token }, { status: 200 });
}

async function LoginValid(email: string, _password: string): Promise<TUser | null> {
  const dbUser = await GetDbUser(email);

  if (!dbUser) {
    return null;
  }

  //if (email !== dbUser.email || !BcryptVerifyPassword(password, dbUser.password)) {
  //  return null;
  //}

  return {
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email,
  };
}
