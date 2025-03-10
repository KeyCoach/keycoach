import { Test } from "@/app/lib/types";
import { dynamo, TEST_TABLE_NAME } from "./client";
import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

/** Gets test from DB by id. Returns null if there is no result */
export async function GetTestById(testId: string): Promise<Test | null> {
  const getCommand = new GetCommand({
    TableName: TEST_TABLE_NAME,
    Key: {
      id: testId,
    },
  });

  const res = await dynamo.send(getCommand).catch((err) => {
    console.error(err);
    return null;
  });

  if (!res?.Item) return null;

  return res.Item as Test;
}

/** Gets all tests from DB. */
export async function GetAllTests(): Promise<Test[]> {
  const scanCommand = new ScanCommand({
    TableName: TEST_TABLE_NAME,
  });

  const res = await dynamo.send(scanCommand);

  if (!res?.Items) return [];
  const tests = res.Items as Test[];

  return tests;
}

export async function GetRandomTest(): Promise<Test | null> {
  const scanCommand = new ScanCommand({
    TableName: TEST_TABLE_NAME,
    ProjectionExpression: "id",
  });

  const res = await dynamo.send(scanCommand).catch((err) => {
    console.error(err);
    return null;
  });
  if (!res?.Items) return null;

  const tests = res.Items as { id: string }[];

  if (tests.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * tests.length);

  const getCommand = new GetCommand({
    TableName: TEST_TABLE_NAME,
    Key: {
      id: tests[randomIndex].id,
    },
  });

  const test = await dynamo.send(getCommand).catch((err) => {
    console.error(err);
    return null;
  });

  if (!test?.Item) return null;

  return test.Item as Test;
}

export async function PutTest(test: Test): Promise<Test | boolean> {
  const putCommand = new PutCommand({
    TableName: TEST_TABLE_NAME,
    Item: test,
  });

  return await dynamo
    .send(putCommand)
    .then(() => {
      return test;
    })

    .catch((err) => {
      console.error(err);
      return false;
    });
}
