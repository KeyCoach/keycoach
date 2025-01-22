import { Test } from "@/app/lib/types";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

const TEST_TABLE_NAME = "test";

async function AddTestsToDb(tests: Test[]): Promise<void> {
  const testCommands = [];
  for (const test of tests) {
    const updateCommand = new UpdateCommand({
      TableName: TEST_TABLE_NAME,
      Key: {
        id: test.id,
      },
      UpdateExpression: `SET src = :src, author = :author, textBody = :textBody, charCount = :charCount, wordCount = :wordCount, difficulty = :difficulty`,
      ExpressionAttributeValues: {
        ":src": test.src,
        ":author": test.author,
        ":textBody": test.textBody,
        ":charCount": test.charCount,
        ":wordCount": test.wordCount,
        ":difficulty": test.difficulty,
      },
    });
    testCommands.push(updateCommand);
  }
  await Promise.all(testCommands.map((command) => dynamo.send(command)))
    .then(() => {
      console.log("Tests added to DB");
    })
    .catch((error) => {
      console.error("Error adding tests to DB", error);
    });
}

const tests: Test[] = [
  {
    id: "fbc1dfad-da51-45e9-bb93-0692459c4db8",
    src: "A Portrait of the Artist as a Young Man",
    author: "James Joyce",
    textBody:
      "A certain pride, a certain awe, withheld him from offering to God even one prayer at night, though he knew it was in God's power to take away his life while he slept and hurl his soul hellward ere he could beg for mercy.",
    charCount: 220,
    wordCount: 44,
    difficulty: 1,
  },
  {
    id: "f8a22df2-38bc-4692-a6da-cdd526b673e6",
    src: "The Call of the Wild",
    author: "Jack London",
    textBody:
      "When, on the still cold nights, he pointed his nose at a star and howled long and wolf-like, it was his ancestors, dead and dust, pointing nose at star and howling down through the centuries and through him. And his cadences were their cadences, the cadences which voiced their woe and what to them was the meaning of the stillness, and the cold, and dark.",
    charCount: 356,
    wordCount: 65,
    difficulty: 2,
  },
  {
    id: "919c2a12-38f2-48a9-bf1b-e510ac689379",
    src: "Middlemarch",
    author: "George Eliot",
    textBody:
      "For years after Lydgate remembered the impression produced in him by this involuntary appeal—this cry from soul to soul, without other consciousness than their moving with kindred natures in the same embroiled medium, the same troublous fitfully-illuminated life.",
    charCount: 263,
    wordCount: 38,
    difficulty: 3,
  },
  {
    id: "2f075fa3-b932-4b6d-91bf-41523670d1bb",
    src: "The Sound and the Fury",
    author: "William Faulkner",
    textBody:
      "The air brightened, the running shadow patches were now the obverse, and it seemed to him that the fact that the day was clearing was another cunning stroke on the part of the foe, the fresh battle toward which he was carrying ancient wounds.",
    charCount: 242,
    wordCount: 44,
    difficulty: 4,
  },
  {
    id: "8c12b751-a1cc-410f-9ee6-71813d391f54",
    src: "The Book of Mormon",
    author: "Mormon (duh)",
    textBody: "And my father dwelt in a tent.",
    charCount: 23,
    wordCount: 7,
    difficulty: 5,
  },
  {
    id: "8e25223f-ce2b-4e0f-9bf5-b6cb06ab8c38",
    src: "Test",
    author: "Styles Weiler",
    textBody: "' \" ` ~ : ;",
    charCount: 23,
    wordCount: 7,
    difficulty: 5,
  },
];

AddTestsToDb(tests);
