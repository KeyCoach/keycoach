import { CreateDbUser } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";
import { cookies } from "next/headers";

/** Register a new user. */
export async function POST(request: NextRequest) {
  const { email, password, fname, lname } = await request.json();
  console.log(email, password, fname, lname);

  if (!email || !password || !fname || !lname) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const newUser = await CreateDbUser(email, password, fname, lname);

  if (!newUser) {
    return Response.json(BackendErrors.ENTITY_EXISTS, { status: 409 });
  }

  const token = CreateUserToken(newUser);

  (await cookies()).set("token", token);

  return Response.json({ message: "Success", user: newUser }, { status: 200 });
}
