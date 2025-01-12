import { BcryptHashPassword } from "./bcrypt";

// TODO: Implement DB User Retrieval
export async function GetDbUser(email: string): Promise<Record<string, any> | null> {
  return {
    email,
    firstName: "John",
    lastName: "Doe",
    password: BcryptHashPassword("password"),
  };
}

// TODO: Implement DB Registration
export async function CreateDbUser(user: any) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}
