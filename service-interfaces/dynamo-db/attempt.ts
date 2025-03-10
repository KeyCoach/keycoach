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

  if (!item) return false;

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

  return AddTestToAttempts(attempts);
}

/** Adds Test data to many attempt objects. Concurrently requests test data from DB */
async function AddTestToAttempts(attempts: DbAttempt[]): Promise<Attempt[]> {
  console.log(attempts);
  const completeAttempts: Attempt[] = [];

  async function addTest(attempt: DbAttempt) {
    if (attempt.test) return attempt;

    const test = await GetTestById(attempt.testId);
    if (!test) return false;
    return {
      ...attempt,
      test,
    };
  }

  await Promise.all(attempts.map(addTest)).then((hydratedAttempts) => {
    hydratedAttempts.forEach((attempt) => {
      if (attempt) completeAttempts.push(attempt as Attempt);
      else console.error("Failed to hydrate attempt");
    });
  });

  return completeAttempts;
}

/** Adds Test data to the attempt object */
async function AddTestToAttempt(attempt: DbAttempt): Promise<Attempt> {
  if (attempt.test) return attempt as Attempt;

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
