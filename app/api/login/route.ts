import { User } from "@/app/lib/types";
import { BcryptVerifyPassword } from "@/service-interfaces/bcrypt";
import { GetUserByEmail } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";
import { cookies } from "next/headers";

/** Login a user. */
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const user = await LoginValid(email, password);

  if (!user) {
    return Response.json(BackendErrors.INVALID_CREDENTIALS, { status: 401 });
  }

  const token = CreateUserToken(user);

  (await cookies()).set("token", token);

  return Response.json({ message: "Success", user }, { status: 200 });
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

  const { passwordHash, ...user } = dbUser;

  return user;
}
