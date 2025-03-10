import { Attempt, DbAttempt } from "@/app/lib/types";
import { dynamo, ATTEMPT_TABLE_NAME } from "./client";
import { BatchWriteCommand, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { GetTestById } from "./test";

/** Gets attempt from DB by id. Returns null if there is no result */
export async function GetAttemptById(
  id: string,
  email: string | null = "unknown",
): Promise<Attempt | false> {
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
  console.log(item);

  if (!item) return false;

  if (item.test) return item as Attempt;

  return AddTestToAttempt(item);
}

/** Inserts attempt into DB. */
export async function CreateTestAttempt(attempt: DbAttempt): Promise<DbAttempt | false> {
  const putCommand = new PutCommand({
    TableName: ATTEMPT_TABLE_NAME,
    Item: attempt,
  });

  return await dynamo
    .send(putCommand)
    .then(() => {
      return attempt;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

/** Gets all test attempts from DB by email. */
export async function GetAttemptsByEmail(email: string): Promise<Attempt[] | false> {
  const query = new QueryCommand({
    TableName: ATTEMPT_TABLE_NAME,
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  });

  const res = await dynamo.send(query);

  if (!res?.Items) return false;
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
async function AddTestToAttempt(attempt: DbAttempt): Promise<Attempt> {
  const test = await GetTestById(attempt.testId);

  return {
    ...attempt,
    test: test!,
  };
}

export async function DeleteUserAttempts(email: string): Promise<boolean> {
  const query = new QueryCommand({
    TableName: ATTEMPT_TABLE_NAME,
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
    ProjectionExpression: "id",
  });

  const res = await dynamo.send(query);

  if (!res?.Items) return false;

  const attempts = res.Items as { id: string }[];

  const deleteRequests = attempts.map((attempt) => ({
    DeleteRequest: { Key: { id: attempt.id, email } },
  }));

  while (deleteRequests.length > 0) {
    const res = await dynamo
      .send(
        new BatchWriteCommand({
          RequestItems: {
            [ATTEMPT_TABLE_NAME]: deleteRequests.splice(0, 25),
          },
        }),
      )
      .catch((err) => {
        console.error(err);
        return false;
      });
    if (!res) return false;
  }

  return true;
}
