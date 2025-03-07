"use server";
import { VerifyToken } from "@/service-interfaces/json-web-token";
import { GetToken } from "@/utils/get-token";
import { User } from "@/app/lib/types";

export async function AuthenticateUser(): Promise<User | null> {
  const token = await GetToken();
  const user = VerifyToken(token);
  return user;
}
