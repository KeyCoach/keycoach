import { DbUser, User } from "@/app/lib/types";
import { BcryptHashPassword } from "../bcrypt";
import { USER_TABLE_NAME, dynamo } from "./client";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

/** Gets user from DB by email. Returns null if there is no result */
export async function GetUserByEmail(email: string): Promise<DbUser | null> {
  const getCommand = new GetCommand({
    TableName: USER_TABLE_NAME,
    Key: {
      email,
    },
  });

  const user = await dynamo.send(getCommand).then((res) => {
    if (!res.Item) return null;
    return res.Item as DbUser;
  });

  return user;
}

/** Creates user in DB. Returns null if user already exists. */
export async function CreateDbUser(
  email: string,
  password: string,
  fname: string,
  lname: string,
): Promise<User | null> {
  const dbUser: DbUser = {
    id: uuidv4(),
    email,
    passwordHash: BcryptHashPassword(password),
    fname,
    lname,
  };

  const putCommand = new PutCommand({
    TableName: USER_TABLE_NAME,
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
