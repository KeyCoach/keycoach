import { DbAttempt } from "../app/lib/types";
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

const newAttributeName = "newAttribute";
const defaultValue = "defaultValue";

async function UpdateUsers(): Promise<void> {
  const updateCommands = [];
  const tables = ["attempt", "attempt-dev"];

  for (const table of tables) {
    const scanCommand = new ScanCommand({
      TableName: table,
    });

    const attempts = await dynamo.send(scanCommand);

    if (!attempts.Items) {
      console.error("No users found in DB");
      return;
    }

    for (const attempt of attempts.Items as DbAttempt[]) {
      const updateCommand = new UpdateCommand({
        TableName: table,
        Key: {
          email: attempt.email,
          id: attempt.id,
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
      console.log("Attempts updated");
    })
    .catch((error) => {
      console.error("Error updating attempts", error);
    });
}

UpdateUsers();
