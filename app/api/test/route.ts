import { GetTestById } from "@/service-interfaces/dynamo-db/test";
import { NextRequest } from "next/server";

/** Get test from DB. Return 404 if not found */
export async function GET(request: NextRequest) {
  const testId = request.nextUrl.searchParams.get("testId");

  if (!testId) {
    return Response.json({ message: "testId is required" }, { status: 400 });
  }

  const test = await GetTestById(testId);

  if (!test) {
    return Response.json({ message: "Test not found" }, { status: 404 });
  }

  return Response.json({ test });
}
