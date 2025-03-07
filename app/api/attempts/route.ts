import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/app/actions";
import { BackendErrors } from "../errors";

/** Get all user attempts from DB. Reject if the attempt is associated with an account and creds don't match */
export async function GET() {
  const user = await AuthenticateUser();

  if (!user) {
    return Response.json(BackendErrors.INVALID_CREDENTIALS, { status: 401 });
  }

  const attempts = await GetAttemptsByEmail(user.email);

  if (!attempts) {
    return Response.json(BackendErrors.ENTITY_NOT_FOUND, { status: 404 });
  }

  return Response.json({ attempts });
}
