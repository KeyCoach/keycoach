import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ message: "Email and password are required" }, { status: 400 });
  }

  const userId = LoginValid(email, password);

  if (!userId) {
    return Response.json({ message: "Invalid email or password" }, { status: 401 });
  }

  const token = GenerateToken(userId);

  return Response.json({ message: "Success", token }, { status: 200 });
}

// TODO: Validate email and password with DB
function LoginValid(email: string, password: string): string | null {
  return email + password;
}

// TODO: Generate JWT
function GenerateToken(userId: string) {
  return userId;
}
