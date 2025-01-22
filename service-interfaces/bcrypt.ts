import bcrypt from "bcryptjs";

/** Hashing function for db passwords */
export function BcryptHashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/** Verify password against db hash */
export function BcryptVerifyPassword(plaintextPassword: string, dbHash: string): boolean {
  return bcrypt.compareSync(plaintextPassword, dbHash);
}
