import { Attempt, DbAttempt } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";
import { dynamo, ATTEMPT_TABLE_NAME } from "./client";
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { GetTestById } from "./test";

/** Gets attempt from DB by id. Returns null if there is no result */
export async function GetAttemptById(
  id: string,
  email: string | null = "unknown",
): Promise<Attempt | null> {
  const getCommand = new GetCommand({
    TableName: ATTEMPT_TABLE_NAME,
    Key: {
      id,
      email: email ?? "unknown",
    },
  });

  const item = await dynamo
    .send(getCommand)
    .then((res) => {
      if (!res.Item) return null;
      return res.Item as DbAttempt;
    })

    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!item) return null;

  return HydrateAttempt(item);
}

/** Inserts attempt into DB. */
export async function CreateTestAttempt(
  email: string | null,
  testId: string,
  accuracy: number,
  wpm: number,
  fingerAccuracy: number,
  mistakesCount: number,
  duration: number,
): Promise<DbAttempt> {
  const attempt: DbAttempt = {
    id: uuidv4(),
    email: email ?? "unknown",
    testId,
    accuracy,
    wpm,
    fingerAccuracy,
    mistakesCount,
    duration,
    date: Date.now(),
  };

  const putCommand = new PutCommand({
    TableName: ATTEMPT_TABLE_NAME,
    Item: attempt,
  });

  await dynamo.send(putCommand);

  return attempt;
}

/** Gets all test attempts from DB by email. */
export async function GetAttemptsByEmail(email: string): Promise<Attempt[] | null> {
  const query = new QueryCommand({
    TableName: ATTEMPT_TABLE_NAME,
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  });

  const res = await dynamo.send(query);

  if (!res?.Items) return null;
  const attempts = res.Items as DbAttempt[];

  return HydrateAttempts(attempts);
}

/** Adds Test data to many attempt objects. Concurrently requests test data from DB */
async function HydrateAttempts(attempts: DbAttempt[]): Promise<Attempt[]> {
  const hydratedAttempts: Attempt[] = [];
  const testIds = new Set(attempts.map((attempt) => attempt.testId));

  const testFetches = [];

  for (const testId of testIds) {
    testFetches.push(GetTestById(testId));
  }

  const tests = await Promise.all(testFetches);

  for (const attempt of attempts) {
    hydratedAttempts.push({
      ...attempt,
      test: tests.find((test) => test?.id === attempt.testId)!,
    });
  }

  return hydratedAttempts;
}

/** Adds Test data to the attempt object */
async function HydrateAttempt(attempt: DbAttempt): Promise<Attempt> {
  const test = await GetTestById(attempt.testId);

  return {
    ...attempt,
    test: test!,
  };
}
