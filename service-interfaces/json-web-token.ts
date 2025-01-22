import { User } from "@/app/lib/types";
import jwt from "jsonwebtoken";

const JWT_SECRET = "f71808ef-2176-46d8-9bb4-3c304117ba8c";

/** Verify JWT. return user if valid */
export function VerifyToken(token: string | null): User | null {
  if (!token) return null;
  let user;
  try {
    user = jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }

  return user;
}

/** Create JWT for user */
export function CreateUserToken(user: User, expiresIn = 60 * 60): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn });
}
