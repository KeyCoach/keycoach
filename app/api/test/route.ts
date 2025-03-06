import { GetTestById } from "@/service-interfaces/dynamo-db/test";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";

/** Get test from DB. Return 404 if not found */
export async function GET(request: NextRequest) {
  const testId = request.nextUrl.searchParams.get("testId");

  if (!testId) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const test = await GetTestById(testId);

  if (!test) {
    return Response.json(BackendErrors.ENTITY_NOT_FOUND, { status: 404 });
  }

  return Response.json({ test });
}
