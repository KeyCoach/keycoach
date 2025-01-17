import bcrypt from "bcryptjs";

/** Hashing function for db passwords */
export function BcryptHashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/** Verifying function for db passwords */
export function BcryptVerifyPassword(reqPassword: string, dbHash: string): boolean {
  return bcrypt.compareSync(reqPassword, dbHash);
}
