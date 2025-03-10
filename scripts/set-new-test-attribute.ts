import { Test } from "../app/lib/types";
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

const newAttributeName = "newAttribute";
const defaultValue = "defaultValue";

async function UpdateUsers(): Promise<void> {
  const updateCommands = [];
  const tables = ["test", "test-dev"];

  for (const table of tables) {
    const scanCommand = new ScanCommand({
      TableName: table,
    });

    const tests = await dynamo.send(scanCommand);

    if (!tests.Items) {
      console.error("No users found in DB");
      return;
    }

    for (const test of tests.Items as Test[]) {
      const updateCommand = new UpdateCommand({
        TableName: table,
        Key: {
          id: test.id,
        },
        UpdateExpression: `SET ${newAttributeName} = :defaultValue`,
        ExpressionAttributeValues: {
          ":defaultValue": defaultValue,
        },
      });
      updateCommands.push(updateCommand);
    }
  }

  await Promise.all(updateCommands.map((command) => dynamo.send(command)))
    .then(() => {
      console.log("Tests updated");
    })
    .catch((error) => {
      console.error("Error updating tests", error);
    });
}

UpdateUsers();
