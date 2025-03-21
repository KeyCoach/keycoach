import { AuthenticateUser } from "@/app/actions";
import { BackendErrors } from "../../errors";
import { NextRequest } from "next/server";
import { UpdateUserProfile } from "@/service-interfaces/dynamo-db";
import { CreateUserToken } from "@/service-interfaces/json-web-token";
import { cookies } from "next/headers";

/** Update user profile information */
export async function PATCH(request: NextRequest) {
  const { fname, lname } = await request.json();
  const user = await AuthenticateUser();

  if (!user) {
    return BackendErrors.UNAUTHORIZED;
  }

  if (!fname || !lname) {
    return BackendErrors.MISSING_ARGUMENTS;
  }

  const updatedDbUser = await UpdateUserProfile(user.email, fname, lname);

  if (!updatedDbUser) {
    return BackendErrors.SERVER_ERROR;
  }

  const { passwordHash, ...updatedUser } = updatedDbUser;

  const token = CreateUserToken(updatedUser);

  (await cookies()).set("token", token);

  return Response.json({ message: "Success", user: updatedUser }, { status: 200 });
}
