import { DeleteUser, DeleteUserAttempts } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/app/actions";
import { BackendErrors } from "../errors";
import { cookies } from "next/headers";

export async function DELETE() {
  const user = await AuthenticateUser();

  if (!user) {
    return Response.json(BackendErrors.INVALID_CREDENTIALS, { status: 401 });
  }

  const deleteAttemptsSuccess = await DeleteUserAttempts(user.email);

  if (!deleteAttemptsSuccess) {
    return Response.json(BackendErrors.SERVER_ERROR, { status: 500 });
  }

  const deleteUserSuccess = await DeleteUser(user.email);

  if (!deleteUserSuccess) {
    return Response.json(BackendErrors.ENTITY_NOT_FOUND, { status: 404 });
  }

  (await cookies()).delete("token");

  return Response.json({ status: "success" });
}
