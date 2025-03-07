import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

const partitionKey = "email";
const sortKey = "id";

async function deleteAllItems() {
  let lastEvaluatedKey;

  const tables = ["attempt", "attempt-dev"];
  for (const table of tables) {
    do {
      const scanCommand = new ScanCommand({
        TableName: table,
        ProjectionExpression: `${partitionKey}, ${sortKey}`,
        ExclusiveStartKey: lastEvaluatedKey,
      });

      const scanResult: { Items?: Record<string, any>[]; LastEvaluatedKey?: Record<string, any> } =
        await dynamo.send(scanCommand);

      const items = scanResult.Items || [];
      lastEvaluatedKey = scanResult.LastEvaluatedKey;

      if (items.length > 0) {
        const deleteRequests = items.map((item) => ({
          DeleteRequest: { Key: { [partitionKey]: item[partitionKey], [sortKey]: item[sortKey] } },
        }));

        // Batch delete (25 at a time)
        while (deleteRequests.length > 0) {
          await dynamo.send(
            new BatchWriteCommand({
              RequestItems: {
                [table]: deleteRequests.splice(0, 25),
              },
            }),
          );
        }
      }
    } while (lastEvaluatedKey); // Continue until all items are scanned
  }

  console.log("All items deleted.");
}

deleteAllItems().catch(console.error);
