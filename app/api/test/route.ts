import { GetRandomTest } from "@/service-interfaces/dynamo-db/test";
import { BackendErrors } from "../errors";

/** Get test from DB. Return 404 if not found */
export async function GET() {
  const test = await GetRandomTest();

  if (!test) {
    return Response.json(BackendErrors.SERVER_ERROR, { status: 500 });
  }

  return Response.json({ test });
}
