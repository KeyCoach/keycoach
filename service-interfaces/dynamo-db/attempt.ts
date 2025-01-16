import { TestAttempt } from "@/app/lib/types";

// TODO: implement db connection to attempt table
export async function GetAttemptById(attemptId: string): Promise<TestAttempt | null> {
  return {
    id: attemptId,
    userId: "user-id",
    testId: "test-id",
    accuracy: 0.9,
    wpm: 100,
  };
}

// TODO: implement db connection to attempt table
export async function CreateTestAttempt(
  userId: string,
  testId: string,
  accuracy: number,
  wpm: number,
): Promise<void> {
  console.log("Creating test attempt", userId, testId, accuracy, wpm);
}
