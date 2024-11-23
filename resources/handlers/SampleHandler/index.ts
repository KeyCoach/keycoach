import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { LambdaInterface } from "@aws-lambda-powertools/commons";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const { SAMPLE_TABLE_NAME, LOG_LEVEL } = process.env;

const logger = new Logger({
  serviceName: "MarketEntryDataApi",
  logLevel: LOG_LEVEL,
});

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

class Lambda implements LambdaInterface {
  public async handler(
    event: APIGatewayProxyEvent,
    context: Context,
  ): Promise<APIGatewayProxyResult> {
    logger.addContext(context);

    const reqPath = event.path.toLowerCase();
    const method = event.httpMethod.toUpperCase();

    console.log("Event:", event);
    console.log("Path:", reqPath);
    console.log("Method:", method);

    const defaultheaders = {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    };

    if (reqPath === "/health") {
      return {
        statusCode: 200,
        headers: {
          ...defaultheaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Healthy" }),
      };
    }

    const putSampleDataCommand = new PutCommand({
      TableName: SAMPLE_TABLE_NAME,
      Item: {
        email: "test@test.com",
        firstName: "Test",
        lastName: "User",
        data: Math.random().toString(36).substring(7),
      },
    });

    const res = await dynamo
      .send(putSampleDataCommand)
      .then(() => {
        return {
          statusCode: 200,
          headers: {
            ...defaultheaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "Successfully added some data to the db" }),
        };
      })
      .catch(() => {
        return {
          statusCode: 500,
          headers: {
            ...defaultheaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "Failed to add data to the db" }),
        };
      });

    return res;
  }
}

export const handlerClass = new Lambda();
export const handler = handlerClass.handler;
