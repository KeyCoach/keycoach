import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
export const { TEST_TABLE_NAME, USER_TABLE_NAME, ATTEMPT_TABLE_NAME } = serverRuntimeConfig;

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));
