import { NextRequest } from "next/server";

// TODO: implement registration
export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  if (!email || !password || !name) {
    return Response.json({ message: "Name, email, and password are required" }, { status: 400 });
  }

  return Response.json({ message: "Success" }, { status: 200 });
}
