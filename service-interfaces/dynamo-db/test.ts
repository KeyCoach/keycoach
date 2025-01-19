import { Test } from "@/app/lib/types";
import { dynamo, TEST_TABLE_NAME } from "./client";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

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
