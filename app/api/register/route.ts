import { CreateDbUser, GetDbUser } from "@/serviceInterfaces/dynamo-db";
import { CreateUserToken } from "@/serviceInterfaces/json-web-token";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName } = await request.json();

  if (!email || !password || !firstName || !lastName) {
    return Response.json({ message: "Name, email, and password are required" }, { status: 400 });
  }

  let existingUser = await GetDbUser(email);
  // TODO: Delete this line when you implement the DB User Retrieval
  existingUser = null;

  if (existingUser) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  const newUserData = {
    email,
    password,
    firstName,
    lastName,
  };

  const newDbUser = await CreateDbUser(newUserData);

  const token = CreateUserToken(newDbUser);

  return Response.json({ message: "Success", token }, { status: 200 });
}
