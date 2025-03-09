import { Test } from "../app/lib/types";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

async function AddTestsToDb(tests: Test[]): Promise<void> {
  const testCommands = [];
  const tables = ["test", "test-dev"];
  for (const test of tests) {
    for (const table of tables) {
      const updateCommand = new UpdateCommand({
        TableName: table,
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
      "For years after Lydgate remembered the impression produced in him by this involuntary appeal-this cry from soul to soul, without other consciousness than their moving with kindred natures in the same embroiled medium, the same troublous fitfully-illuminated life.",
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
    author: "Nephi",
    textBody: "And my father dwelt in a tent.",
    charCount: 30,
    wordCount: 7,
    difficulty: 5,
  },
  {
    id: "8cc8728f-f8e3-4c1e-b74c-cb2c7fd0a100",
    textBody:
      "As daylight fades, a wanderer navigates vast landscapes, marveling at radiant cascades and sprawling savannas, grasping at fleeting fragments of paradise. Against all adversities, passion and perseverance carve pathways across ancient archways, allowing aspirations to manifest amidst an ever-changing panorama of dazzling realities.",
    charCount: 333,
    wordCount: 43,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "e364a9c6-49d1-4569-8f2d-424f138a50d8",
    textBody:
      "Amidst the vast expanse of dazzling galaxies and sprawling landscapes, a passionate adventurer navigates labyrinthine pathways, marveling at cascading waterfalls, radiant auroras, and ancient artifacts. Against all adversities, they embrace the art of adaptation, grasping at fleeting moments of magic, allowing aspirations to ascend beyond all apparent limitations, always awaiting the arrival of another astonishing awakening.",
    charCount: 428,
    wordCount: 56,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "7d23f810-a5cc-4e91-b0d7-9f8a54c16e29",
    textBody:
      "The sunset cast soft shadows across the silent street as stars slowly appeared in the sky. Students from the university strolled past, discussing classical myths and stories passed down through centuries of scholarship and wisdom.",
    charCount: 209,
    wordCount: 34,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "93e56a22-fd78-42b3-8aad-75c99eb41083",
    textBody:
      "Jessica was serious about sustainability in her business. She used solar panels, saved water, and insisted on biodegradable packaging. This passion for conservation inspired her associates and transformed the small enterprise into something special.",
    charCount: 213,
    wordCount: 33,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "6b4c2d67-8935-48de-b1f0-36ad45c98d3a",
    textBody:
      "David decided to dedicate his weekend to deep cleaning the garden shed. Under piles of dusty old tools, he discovered a hidden wooden box filled with antique medals and faded photographs dating back to his grandfather's days.",
    charCount: 205,
    wordCount: 36,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "a4f7e3d1-b980-4c25-9d76-2e58fc013d41",
    textBody:
      "The old cedar door creaked as we wandered down the dimly lit corridor. Maddie held her breath, afraid of disturbing the silence. The foundation dated back decades, and every shadow seemed to hide untold secrets behind the wood paneling.",
    charCount: 212,
    wordCount: 37,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "9c5b3f8a-2d17-4e06-b4f5-7a29c80f61e5",
    textBody:
      "The forest felt different after the rainfall. Fresh pine scents filled the air, and ferns unfurled their fronds toward the filtered sunlight. A family of foxes darted between fallen logs, foraging for food before dusk fell.",
    charCount: 198,
    wordCount: 35,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "1d8e7f65-4b32-49af-a0f6-5c92e47f8b9d",
    textBody:
      "Chef Michael carefully folded flour into the mixture, his fingers working with familiar precision. The fragrant dough would transform into perfect loaves of sourdough. His grandfather had first taught him this craft fifty years before.",
    charCount: 201,
    wordCount: 33,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "2e8c9g76-5ad3-47bg-91fe-83d4g219c05",
    textBody:
      "The garden grew more magnificent each spring. Geraniums and goldenrod gathered along the gravel path, while dragonflies glided over the gleaming pond. The aging gardener smiled, grateful for another growing season in this generous landscape.",
    charCount: 210,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "7f1d4g23-9eb8-40g5-a6c2-1b9d8g354f0",
    textBody:
      "My grandfather's garage was a magical place, filled with gadgets and gizmos from bygone eras. He grinned as he showed me how to grind gears together, explaining the logic behind engineering with genuine enthusiasm and guiding my fingers gently.",
    charCount: 214,
    wordCount: 36,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "3f9e2h87-6bc4-48ch-a2gd-94e5h320d16",
    textBody:
      "The historic hotel had stood on the hill for hundreds of years. Its high ceilings and mahogany halls held the whispers of past generations. Sarah ran her hand over the smooth banister, wondering how many others had touched the same polished wood.",
    charCount: 211,
    wordCount: 38,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "8g4d6h34-0fc9-41dh-b3e7-2h509f76ae1",
    textBody:
      "Behind the house, a hidden path led through thick hawthorn bushes toward the harbor. Thomas had shown her this shortcut when they were children. Now she hurried along it, hoping to catch him before his ship sailed with the high tide.",
    charCount: 204,
    wordCount: 39,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "4g0f3j98-7cd5-49dj-b3he-05f6j431e27",
    textBody:
      "The journey to Japan had fulfilled Jenny's lifelong dream. She joined a jubilant crowd enjoying the cherry blossom festival, wrote in her journal each night, and savored miso soup with rice for breakfast just as the locals did.",
    charCount: 200,
    wordCount: 36,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "9h5e7j45-1gd0-42ej-c4f8-3j610g87bf2",
    textBody:
      "Major Jackson adjusted his uniform before joining the judges' panel. The junior officers stood at attention, awaiting their evaluation. Today's exercises would test their judgment under pressure, a critical skill in their military trajectory.",
    charCount: 207,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "5h1g4k09-8de6-40ek-c5gf-16g7k542f38",
    textBody:
      "Karen kept her keys on a kangaroo keychain she'd picked up in Sydney. Her basket of knitting sat by the rocking chair, with half-finished socks for her kids and a blanket for her sister's newborn baby.",
    charCount: 181,
    wordCount: 34,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "0i6f8k56-2he1-43fk-d5g9-4k721h98cg3",
    textBody:
      "The kayak skimmed across the lake's dark water. Mark checked his pockets for his pocketknife and whiskey flask before hiking up the knoll. The sky looked ominous, with black clouds stacked like blocks on the horizon.",
    charCount: 196,
    wordCount: 35,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "6i2h5l10-9ef7-41fl-d6hg-27h8l653g49",
    textBody:
      "Light filtered through colored glass, illuminating the old library with a kaleidoscope of patterns. Eliza ran her fingers along leather-bound volumes, feeling the embossed lettering and listening to the subtle creaking of the floorboards beneath her steps.",
    charCount: 214,
    wordCount: 35,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "1j7g9l67-3if2-44gl-e6h0-5l832i09dh4",
    textBody:
      "The little village lay nestled in a lush valley, surrounded by rolling hills. Colorful wildflowers bloomed along the lanes leading to the local marketplace, where villagers sold fresh vegetables, handmade quilts, and jars of golden honey.",
    charCount: 197,
    wordCount: 33,
    difficulty: 5,
    author: null,
    src: null,
  },
];

AddTestsToDb(tests);
