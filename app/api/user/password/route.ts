import { AuthenticateUser } from "@/app/actions";
import { BackendErrors } from "../../errors";
import { NextRequest } from "next/server";
import { UpdateUserPassword } from "@/service-interfaces/dynamo-db";

/** Update user password */
export async function PATCH(request: NextRequest) {
  const { password } = await request.json();
  const user = await AuthenticateUser();

  if (!user) {
    return BackendErrors.UNAUTHORIZED;
  }

  if (!password) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  const updatedDbUser = await UpdateUserPassword(user.email, password);

  if (!updatedDbUser) {
    return BackendErrors.SERVER_ERROR;
  }

  return Response.json({ message: "Success" }, { status: 200 });
}
