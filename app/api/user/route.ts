import { DeleteUser, DeleteUserAttempts } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/app/actions";
import { BackendErrors } from "../errors";
import { cookies } from "next/headers";

export async function DELETE() {
  const user = await AuthenticateUser();

  if (!user) {
    return BackendErrors.UNAUTHORIZED;
  }

  const deleteAttemptsSuccess = await DeleteUserAttempts(user.email);

  if (!deleteAttemptsSuccess) {
    return BackendErrors.SERVER_ERROR;
  }

  const deleteUserSuccess = await DeleteUser(user.email);

  if (!deleteUserSuccess) {
    return BackendErrors.ENTITY_NOT_FOUND;
  }

  (await cookies()).delete("token");

  return Response.json({ status: "success" });
}
