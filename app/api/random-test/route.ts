import { GetRandomTest } from "@/service-interfaces/dynamo-db/test";
import { BackendErrors } from "../errors";

/** Get test from DB */
export async function GET() {
  const test = await GetRandomTest();

  if (!test) {
    return BackendErrors.SERVER_ERROR;
  }

  return Response.json({ test }, { headers: { "Cache-Control": "no-store" } });
}
