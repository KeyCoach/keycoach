import { CreateTestAttempt, GetAttemptById, GetTestById } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";

/** Get attempt from DB. Reject if the attempt is associated with an account and creds don't match */
export async function GET(request: NextRequest) {
  const attemptId = request.nextUrl.searchParams.get("attemptId");
  const user = await AuthenticateUser();
  const email = user?.email || null;

  if (!attemptId) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const attempt = await GetAttemptById(attemptId, email);
  if (!attempt) {
    return Response.json(BackendErrors.ENTITY_NOT_FOUND, { status: 404 });
  }

  return Response.json({ attempt });
}

/** Add attempt to DB. */
export async function POST(request: NextRequest) {
  const { testId, correctChars, duration, mistakes } = await request.json();
  if (!testId || !correctChars || !duration || !mistakes) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const test = await GetTestById(testId);
  if (!test) {
    return Response.json(BackendErrors.ENTITY_NOT_FOUND, { status: 404 });
  }

  const accuracy = (test.charCount - mistakes) / test.charCount;

  const words = (correctChars + test.wordCount) / 5;
  const minutes = duration / 1000 / 60;
  const wpm = words / minutes;

  // TODO: figure out how to calculate finger accuracy
  const fingerAccuracy = 0.9;

  const user = await AuthenticateUser();
  const email = user?.email || null;

  // TODO: Add keyStrokes to attempt
  const attempt = await CreateTestAttempt(
    email,
    testId,
    accuracy,
    wpm,
    fingerAccuracy,
    mistakes,
    duration,
  );

  return Response.json({ attemptId: attempt.id }, { status: 200 });
}
