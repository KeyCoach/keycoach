import { TUser } from "@/app/user-context";
import jwt from "jsonwebtoken";

/** Verify JWT. return user if valid */
export function VerifyToken(token: string): TUser | null {
  let user;
  try {
    user = jwt.verify(token, "db5896e1-58d8-4172-a507-5755db17620a") as TUser;
  } catch {
    return null;
  }

  return user;
}

/** Create JWT for user */
export function CreateUserToken(user: TUser, expiresIn = 60 * 60): string {
  return jwt.sign(user, "db5896e1-58d8-4172-a507-5755db17620a", { expiresIn });
}
