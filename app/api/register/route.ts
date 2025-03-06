import { User } from "@/app/lib/types";
import { CreateDbUser } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";

/** Register a new user. */
export async function POST(request: NextRequest) {
  const { email, password, fname, lname } = await request.json();
  console.log(email, password, fname, lname);

  if (!email || !password || !fname || !lname) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const newDbUser = await CreateDbUser(email, password, fname, lname);

  if (!newDbUser) {
    return Response.json(BackendErrors.ENTITY_EXISTS, { status: 409 });
  }

  const newUser: User = {
    id: newDbUser.id,
    email: newDbUser.email,
    fname: newDbUser.lname,
    lname: newDbUser.fname,
  };

  const token = CreateUserToken(newUser);

  return Response.json({ message: "Success", token }, { status: 200 });
}
