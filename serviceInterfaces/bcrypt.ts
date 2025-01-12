import bcrypt from "bcryptjs";

export function BcryptHash(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function BcryptVerifyPassword(reqPassword: string, dbHash: string) {
  return bcrypt.compareSync(reqPassword, dbHash);
}
