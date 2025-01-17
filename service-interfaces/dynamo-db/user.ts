import { DbUser } from "@/app/lib/types";
import { BcryptHashPassword } from "../bcrypt";

// TODO: Implement DB User Retrieval
/** Gets user from DB by email. Returns null if there is no result */
export async function GetUserByEmail(email: string): Promise<DbUser | null> {
  return {
    email,
    fname: "John",
    lname: "Doe",
    passwordHash: BcryptHashPassword("password"),
  };
}

// TODO: Implement DB Registration
/** Creates user in DB. Returns null if user already exists. */
export async function CreateDbUser(
  email: string,
  password: string,
  fname: string,
  lname: string,
): Promise<DbUser | null> {
  return {
    email,
    fname,
    lname,
    passwordHash: BcryptHashPassword(password),
  };
}
