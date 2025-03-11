import { UpdateUserWpmGoal } from "@/service-interfaces/dynamo-db";
import { NextRequest } from "next/server";
import { BackendErrors } from "../../errors";
import { AuthenticateUser } from "@/app/actions";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { cookies } from "next/headers";

/** Register a new user. */
export async function PATCH(request: NextRequest) {
  const { wpmGoal } = await request.json();
  const user = await AuthenticateUser();

  if (!user) {
    return BackendErrors.UNAUTHORIZED;
  }

  if (!wpmGoal) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  const updatedDbUser = await UpdateUserWpmGoal(user.email, wpmGoal);

  if (!updatedDbUser) {
    return BackendErrors.SERVER_ERROR;
  }

  const { passwordHash, ...newUser } = updatedDbUser;

  const token = CreateUserToken(newUser);

  (await cookies()).set("token", token);

  return Response.json({ message: "Success", user: newUser }, { status: 200 });
}
