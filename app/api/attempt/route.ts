import { CreateTestAttempt, GetAttemptById } from "@/service-interfaces/dynamo-db";
import { VerifyToken } from "@/service-interfaces/json-web-token";
import { GetToken } from "@/utils/get-token";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const attemptId = request.nextUrl.searchParams.get("attemptId");
  if (!attemptId) {
    return Response.json({ message: "attemptId is required" }, { status: 400 });
  }

  const token = await GetToken();
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = VerifyToken(token);
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const attempt = await GetAttemptById(attemptId);
  if (!attempt) {
    return Response.json({ message: "Attempt not found" }, { status: 404 });
  }

  if (attempt.userId !== user.email) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ attempt });
}

export async function POST(request: NextRequest) {
  const { userId, testId, accuracy, wpm } = await request.json();
  if (!userId || !testId || !accuracy || !wpm) {
    return Response.json(
      { message: "userId, testId, accuracy, and wpm are required" },
      { status: 400 },
    );
  }

  const token = await GetToken();
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = VerifyToken(token);
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (userId !== user.email) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await CreateTestAttempt(userId, testId, accuracy, wpm);
  return Response.json({ message: "Success" }, { status: 200 });
}
