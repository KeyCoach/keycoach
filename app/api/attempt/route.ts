import { CreateTestAttempt, GetAttemptById, GetTestById } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/app/actions";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";
import { CalculateStats } from "@/utils/calculate-stats";
import { DbAttempt } from "@/app/lib/types";

/** Get attempt from DB. Reject if the attempt is associated with an account and creds don't match */
export async function GET(request: NextRequest) {
  const attemptId = request.nextUrl.searchParams.get("attemptId");
  const user = await AuthenticateUser();

  if (!user) {
    return BackendErrors.UNAUTHORIZED;
  }

  const email = user.email;

  if (!attemptId) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  const attempt = await GetAttemptById(attemptId, email);
  if (!attempt) {
    return BackendErrors.ENTITY_NOT_FOUND;
  }

  return Response.json(
    { attempt },
    { headers: { "Cache-Control": "public, max-age=600, s-maxage=600" } },
  );
}

/** Add attempt to DB. */
export async function POST(request: NextRequest) {
  const {
    test: randTest,
    cameraActivated,
    testId,
    attemptId,
    duration,
    mistakes,
    userInput,
  } = await request.json();

  if (
    !testId ||
    !userInput ||
    !mistakes ||
    !attemptId ||
    cameraActivated === undefined ||
    duration === undefined
  ) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  if (!randTest) {
    const test = await GetTestById(testId);
    if (!test) {
      return BackendErrors.ENTITY_NOT_FOUND;
    }
  }

  const { netWpm, grossWpm, accuracy, fingerAccuracy } = CalculateStats(
    userInput,
    mistakes,
    duration,
  );

  const user = await AuthenticateUser();
  const email = user?.email || "unknown";

  const attempt: DbAttempt = {
    id: attemptId,
    email: email,
    testId,
    accuracy,
    netWpm,
    grossWpm,
    cameraActivated,
    fingerAccuracy,
    mistakes,
    userInput,
    duration,
    date: Date.now(),
  };

  if (randTest) {
    attempt.test = randTest;
  }

  await CreateTestAttempt(attempt);

  if (!attempt) {
    return BackendErrors.SERVER_ERROR;
  }

  return Response.json({ attemptId: attempt.id }, { status: 200 });
}
