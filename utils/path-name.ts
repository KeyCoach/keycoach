// path-name.ts
import { headers } from "next/headers";

export async function retrievePathName() {
  const headersList = await headers();
  return headersList.get("x-invoke-path") || "/";
}
