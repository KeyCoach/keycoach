import { TUser } from "@/app/user-context";
import jwt from "jsonwebtoken";

export function VerifyToken(token: string): TUser | null {
  let user;
  try {
    user = jwt.verify(token, "db5896e1-58d8-4172-a507-5755db17620a") as TUser;
  } catch {
    return null;
  }

  return user;
}

export function SignToken(user: TUser) {
  return jwt.sign(user, "db5896e1-58d8-4172-a507-5755db17620a", { expiresIn: 60 * 60 });
}
