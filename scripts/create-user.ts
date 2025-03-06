import { DbUser, User } from "@/app/lib/types";
import { BcryptHashPassword } from "@/service-interfaces/bcrypt";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

const users = [
  "test1@keycoa.ch",
  "test2@keycoa.ch",
  "test3@keycoa.ch",
  "test4@keycoa.ch",
  "test5@keycoa.ch",
  "test6@keycoa.ch",
  "test7@keycoa.ch",
  "test8@keycoa.ch",
  "test9@keycoa.ch",
  "test10@keycoa.ch",
];

/** Creates user in DB. Returns null if user already exists. */
export async function CreateDbUser(email: string, password: string, fname: string, lname: string) {
  const dbUser: DbUser = {
    id: uuidv4(),
    email,
    passwordHash: BcryptHashPassword(password),
    fname,
    lname,
  };

  const putCommand = new PutCommand({
    TableName: "user",
    //TableName: "user-dev",
    Item: dbUser,
    ConditionExpression: "attribute_not_exists(email)",
  });

  const user: User | null = await dynamo
    .send(putCommand)
    .then(() => ({
      id: dbUser.id,
      email: dbUser.email,
      fname: dbUser.fname,
      lname: dbUser.lname,
    }))
    .catch((err) => {
      console.error(err);
      return null;
    });

  return user;
}

for (const user of users) {
  CreateDbUser(user, "password", "fname", "lname").then(() => {
    console.log("successfully created user: ", user);
  });
}
