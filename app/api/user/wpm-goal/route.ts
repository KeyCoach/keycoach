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

  if (!user || !wpmGoal) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const updatedDbUser = await UpdateUserWpmGoal(user.email, wpmGoal);

  if (!updatedDbUser) {
    return Response.json(BackendErrors.SERVER_ERROR, { status: 500 });
  }

  const { passwordHash, ...newUser } = updatedDbUser;

  const token = CreateUserToken(newUser);

  (await cookies()).set("token", token, { httpOnly: true });

  return Response.json({ message: "Success", user: newUser }, { status: 200 });
}
