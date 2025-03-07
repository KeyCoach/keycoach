import { DbUser } from "@/app/lib/types";
import { BcryptHashPassword } from "../bcrypt";
import { USER_TABLE_NAME, dynamo } from "./client";
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
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
): Promise<DbUser | null> {
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

  return await dynamo
    .send(putCommand)
    .then(() => dbUser)
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export async function UpdateUserWpmGoal(email: string, wpmGoal: number): Promise<DbUser | false> {
  const updateCommand = new UpdateCommand({
    TableName: USER_TABLE_NAME,
    Key: {
      email,
    },
    UpdateExpression: "SET wpmGoal = :wpmGoal",
    ExpressionAttributeValues: {
      ":wpmGoal": wpmGoal,
    },
    ConditionExpression: "attribute_exists(email)",
    ReturnValues: "ALL_NEW",
  });

  return dynamo
    .send(updateCommand)
    .then((res) => {
      if (!res.Attributes) return false;
      return res.Attributes as DbUser;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function DeleteUser(email: string): Promise<boolean> {
  const deleteCommand = new DeleteCommand({
    TableName: USER_TABLE_NAME,
    Key: {
      email,
    },
  });

  return dynamo
    .send(deleteCommand)
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function UpdateUserPassword(email: string, password: string): Promise<boolean> {
  const updateCommand = new UpdateCommand({
    TableName: USER_TABLE_NAME,
    Key: {
      email,
    },
    UpdateExpression: "SET passwordHash = :passwordHash",
    ExpressionAttributeValues: {
      ":passwordHash": BcryptHashPassword(password),
    },
    ConditionExpression: "attribute_exists(email)",
  });

  return dynamo
    .send(updateCommand)
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function UpdateUserProfile(
  email: string,
  fname: string,
  lname: string,
): Promise<DbUser | false> {
  const updateCommand = new UpdateCommand({
    TableName: USER_TABLE_NAME,
    Key: {
      email,
    },
    UpdateExpression: "SET fname = :fname, lname = :lname",
    ExpressionAttributeValues: {
      ":fname": fname,
      ":lname": lname,
    },
    ConditionExpression: "attribute_exists(email)",
    ReturnValues: "ALL_NEW",
  });

  return dynamo
    .send(updateCommand)
    .then((res) => {
      if (!res.Attributes) return false;
      return res.Attributes as DbUser;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}
