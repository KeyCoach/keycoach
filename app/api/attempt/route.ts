import { CreateTestAttempt, GetAttemptById, GetTestById } from "@/service-interfaces/dynamo-db";
import { VerifyToken } from "@/service-interfaces/json-web-token";
import { GetToken } from "@/utils/get-token";
import { NextRequest } from "next/server";

/** Get attempt from DB. Reject if the attempt is associated with an account and creds don't match */
export async function GET(request: NextRequest) {
  const attemptId = request.nextUrl.searchParams.get("attemptId");
  if (!attemptId) {
    return Response.json({ message: "attemptId is required" }, { status: 400 });
  }

  const attempt = await GetAttemptById(attemptId);
  if (!attempt) {
    return Response.json({ message: "Attempt not found" }, { status: 404 });
  }

  if (attempt.email) {
    const token = await GetToken();
    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = VerifyToken(token);
    if (!user || user.email !== attempt.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return Response.json({ attempt });
}

/** Add attempt to DB. */
export async function POST(request: NextRequest) {
  const { testId, correctChars, duration, mistakes } = await request.json();
  if (!testId || !correctChars || !duration || !mistakes) {
    return Response.json({ message: "Bad Request" }, { status: 400 });
  }

  let email;
  const token = await GetToken();
  if (token) {
    email = VerifyToken(token)?.email;
  }

  const test = await GetTestById(testId);
  if (!test) {
    return Response.json({ message: "Test not found" }, { status: 404 });
  }

  const accuracy = (test.charCount - mistakes) / test.charCount;

  const words = (correctChars + test.wordCount) / 5;
  const minutes = duration / 1000 / 60;
  const wpm = words / minutes;

  const attemptId = await CreateTestAttempt(email, testId, accuracy, wpm);

  return Response.json({ attemptId }, { status: 200 });
}
