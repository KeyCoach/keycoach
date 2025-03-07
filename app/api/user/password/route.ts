import { AuthenticateUser } from "@/app/actions";
import { BackendErrors } from "../../errors";
import { NextRequest } from "next/server";
import { UpdateUserPassword } from "@/service-interfaces/dynamo-db";

/** Update user password */
export async function PATCH(request: NextRequest) {
  const { password } = await request.json();
  const user = await AuthenticateUser();

  if (!user || !password) {
    return Response.json(BackendErrors.MISSING_ARGUMENTS, { status: 422 });
  }

  const updatedDbUser = await UpdateUserPassword(user.email, password);

  if (!updatedDbUser) {
    return Response.json(BackendErrors.SERVER_ERROR, { status: 500 });
  }

  return Response.json({ message: "Success" }, { status: 200 });
}
