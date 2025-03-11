import { CreateDbUser } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";
import { cookies } from "next/headers";

/** Register a new user. */
export async function POST(request: NextRequest) {
  const { email, password, fname, lname } = await request.json();

  if (!email || !password || !fname || !lname) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  const newUser = await CreateDbUser(email, password, fname, lname);

  if (!newUser) {
    return BackendErrors.ENTITY_EXISTS;
  }

  const token = CreateUserToken(newUser);

  (await cookies()).set("token", token);

  return Response.json({ message: "Success", user: newUser }, { status: 200 });
}
