import { GetTestById } from "@/service-interfaces/dynamo-db/test";
import { NextRequest } from "next/server";
import { BackendErrors } from "../errors";

/** Get test from DB. Return 404 if not found */
export async function GET(request: NextRequest) {
  const testId = request.nextUrl.searchParams.get("testId");

  if (!testId) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  const test = await GetTestById(testId);

  if (!test) {
    return BackendErrors.ENTITY_NOT_FOUND;
  }

  return Response.json(
    { test },
    { headers: { "Cache-Control": "public, max-age=600, s-maxage=600" } },
  );
}
