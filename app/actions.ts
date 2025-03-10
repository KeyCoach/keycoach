"use server";
import { VerifyToken } from "@/service-interfaces/json-web-token";
import { GetToken } from "@/utils/get-token";
import { User } from "@/app/lib/types";
import * as fs from "fs";
import path from "path";

export async function AuthenticateUser(): Promise<User | null> {
  const token = await GetToken();
  const user = VerifyToken(token);
  return user;
}

const filePath = path.join(process.cwd(), "wordlists/google-10000-english-usa-no-swears.txt");
const wordList = fs.readFileSync(filePath, "utf-8");

export async function getRandomWords(numLines: number): Promise<string[]> {
  const lines = wordList.split("\n");
  const randomLines = [];
  for (let i = 0; i < numLines; i++) {
    randomLines.push(lines[Math.floor(Math.random() * lines.length)]);
  }
  return randomLines;
}
