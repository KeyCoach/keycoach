import { Test } from "@/app/lib/types";
import { tests } from "../test-data";

export async function GetTestFromId(testId: string): Promise<Test | undefined> {
  return tests.find((test) => test.id === testId);
}
