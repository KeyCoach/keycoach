import { CreateDbUser, GetDbUser } from "@/serviceInterfaces/dynamo-db";
import { SignToken } from "@/serviceInterfaces/json-web-token";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password, firstName, lastName } = await request.json();

  if (!email || !password || !firstName || !lastName) {
    return Response.json({ message: "Name, email, and password are required" }, { status: 400 });
  }

  let existingUser = await GetDbUser(email);
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

  const newUser = await CreateDbUser(newUserData);

  const token = SignToken(newUser);

  return Response.json({ message: "Success", token }, { status: 200 });
}
