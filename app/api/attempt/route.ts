import { CreateTestAttempt, GetAttemptById, GetTestById } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/app/actions";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";
import { CalculateStats } from "@/utils/calculate-stats";

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
  const { cameraActivated, testId, attemptId, duration, mistakes, userInput } =
    await request.json();
  if (
    !testId ||
    !userInput ||
    !mistakes ||
    !attemptId ||
    cameraActivated === undefined ||
    duration === undefined
  ) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const test = await GetTestById(testId);
  if (!test) {
    return Response.json(BackendErrors.ENTITY_NOT_FOUND, { status: 404 });
  }

  const { netWpm, grossWpm, accuracy, fingerAccuracy } = CalculateStats(
    userInput,
    mistakes,
    duration,
  );

  const user = await AuthenticateUser();
  const email = user?.email || null;

  const attempt = await CreateTestAttempt(
    email,
    attemptId,
    testId,
    accuracy,
    grossWpm,
    netWpm,
    fingerAccuracy,
    mistakes,
    duration,
    userInput,
    cameraActivated,
  );

  if (!attempt) {
    return Response.json(BackendErrors.SERVER_ERROR, { status: 500 });
  }

  return Response.json({ attemptId: attempt.id }, { status: 200 });
}
