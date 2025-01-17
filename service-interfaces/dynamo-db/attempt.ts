import { Attempt } from "@/app/lib/types";

// TODO: implement db connection to attempt table
/** Gets attempt from DB by id. Returns null if there is no result */
export async function GetAttemptById(attemptId: string): Promise<Attempt | null> {
  return {
    id: attemptId,
    email: "email",
    testId: "test-id",
    accuracy: 0.9,
    timeStamp: Date.now(),
    wpm: 100,
  };
}

// TODO: implement db connection to attempt table
/** Inserts attempt into DB. */
export async function CreateTestAttempt(
  email: string | undefined,
  testId: string,
  accuracy: number,
  wpm: number,
): Promise<Attempt> {
  const id = "uuid";
  return {
    timeStamp: Date.now(),
    id,
    email,
    testId,
    accuracy,
    wpm,
  };
}

export async function GetAttemptsByEmail(email: string): Promise<Attempt[] | null> {
  return [
    {
      id: "uuid",
      email,
      testId: "1",
      accuracy: 0.9,
      timeStamp: Date.now(),
      wpm: 100,
    },
    {
      id: "uuid1",
      email,
      testId: "2",
      accuracy: 0.8,
      timeStamp: Date.now(),
      wpm: 90,
    },
    {
      id: "uuid2",
      email,
      testId: "3",
      accuracy: 0.7,
      timeStamp: Date.now(),
      wpm: 80,
    },
  ];
}
