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
      "Serene sunsets slowly stretch across sky-spanning spaces, sending soft shadows silent into sleepy seaside streets. Silhouettes of sailors savoring sweet sea salt seem suspended in stillness. Soon, starlight sparkles, scattering silver specks skyward, shifting seasons seamlessly. Several scholars study sacred scrolls, searching special symbols, some scribing sophisticated solutions to stubborn societal struggles, showcasing steadfast scholarly standards.",
    charCount: 430,
    wordCount: 52,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "93e56a22-fd78-42b3-8aad-75c99eb41083",
    textBody:
      "Surprising secrets sometimes surface suddenly, sparking serious discussion amongst skeptics and supporters. Smooth stone structures stand solemnly since seven centuries, sustaining significant storm stress. Selected specialists simulate stellar systems, successfully studying cosmic substances. Society seeks sustainable solutions, striving sincerely, setting strong standards, shaping safer surroundings. Students share stories, songs, and splendid social suggestions, strengthening solidarity, spreading smiles.",
    charCount: 431,
    wordCount: 50,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "6b4c2d67-8935-48de-b1f0-36ad45c98d3a",
    textBody:
      "During dark December days, determined dancers display dazzling dynamic demonstrations, drawing diverse delighted doubles down dimly-lit dance floors. Distinguished doctors develop detailed diagrams, documenting dangerous diseases, diligently designing drugs despite demanding deadlines. Dedicated designers draft digital documents, delivering dramatic designs directly to distant domains. Daring divers descend deeply, discovering dormant dragons, dusty debris, and deserted dwellings, defying danger dutifully.",
    charCount: 417,
    wordCount: 52,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "a4f7e3d1-b980-4c25-9d76-2e58fc013d41",
    textBody:
      "Delicate dewdrops dance down during dawn, decorating delightful daisy displays. Dedicated developers debug difficult digital dilemmas, diving deep daily. Dramatic dialogues develop between distinguished diplomats, defining divisive doctrines diplomatically. Determined dogs dash deftly, dodging dangerous ditches, demonstrating devoted discipline. Dusty documents detail distant discoveries, describing diverse dimensions, drawing detailed diagrams. Drifting dreams drive decisive doers down different destinations, displaying daring determination.",
    charCount: 429,
    wordCount: 50,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "9c5b3f8a-2d17-4e06-b4f5-7a29c80f61e5",
    textBody:
      "Fifteen fearless friends faced formidable forest frontiers, finding fascinating features following four flowing falls. Fragrant flowers filled fertile fields, fulfilling fundamental functions for flying fauna. Fortunate families feast on fresh fruits, favoring firm figs from familiar farms. Faithful farmers focus on fruitful farming, fostering fine food for future festivals. Fierce flames flicker from fireplaces, forming fantastic figures, fighting freezing fog. Formal frameworks facilitate fair freedom for flourishing futures.",
    charCount: 425,
    wordCount: 51,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "1d8e7f65-4b32-49af-a0f6-5c92e47f8b9d",
    textBody:
      "Fluttering flags fell from fifteen fortresses following fierce fighting. Foreign films featured famous figures, forming fabulous fantasies for fascinated fans. Fishermen found five floating fish from far fauna families. Friendly foxes frequently frolic, freely foraging for fallen fruits. Fast floodwaters force families from familiar farmsteads, fleeing for forest foothills. Fortunate fireflies flash faintly for five full February evenings, featuring fascinating flights. Flexible facilities form functional frameworks for future factories.",
    charCount: 427,
    wordCount: 52,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "2e8c9g76-5ad3-47bg-91fe-83d4g219c05",
    textBody:
      "Glittering galaxies guide graceful geese gently gliding groundward. Generous gardeners grow gorgeous green gardens, granting gleaming grapes, golden gourds, and gigantic ginger. Grateful graduates gather, giving genuine gratitude, generating goodwill. Glorious glimpses of grand geological greatness greet geologists gathering gleaming gemstones. Gifted guitarists gradually gain global glory, giving goosebumps through graceful gestures. Gallant guards guarantee general guidance, governing gateways, guarding goods against greedy gangs.",
    charCount: 429,
    wordCount: 50,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "7f1d4g23-9eb8-40g5-a6c2-1b9d8g354f0",
    textBody:
      "Graciously given gifts generate genuine grins, gladdening groups globally. Gargantuan glaciers gradually glide, grinding granite geologies, generating gorgeous gorges. Gregarious geese gather grain, growing greater gradually, guarding goslings against glaring goshawks. Generous governments guarantee grants, guiding genuine growth, granting golden graduation goals. Gravity gently guides glowing galaxies, galaxies generating grand gravitational games. Gallant gladiators gain glory, greeting grand gatherings, gracefully gesturing gratitude.",
    charCount: 426,
    wordCount: 47,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "3f9e2h87-6bc4-48ch-a2gd-94e5h320d16",
    textBody:
      "Hopeful hunters hustle hurriedly home, having harvested healthy hares. Hulking horses haul heavy harvests, helping hardworking households handle huge haystacks. Humble historians highlight hidden heroes, honoring hallowed heritage. Hearty hospitality helps heal hearts, harboring harmony. Hilarious haikus humbly hold heartwarming humor, heightening human happiness. Honest hackers help hunt harmful hazards, highlighting helpful hints. Handsome husbands hang holiday holly, heightening homes' hospitable hamlets, humming harmonies.",
    charCount: 427,
    wordCount: 48,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "8g4d6h34-0fc9-41dh-b3e7-2h509f76ae1",
    textBody:
      "Healthier habits help humans handle harsh hardships, heightening happiness. Hurried hikers head higher, hoping hills harbor hidden havens. Half-hearted handshakes hardly help heal heated hostilities between households. Humble heroes humbly hide honorable histories, having helped hundreds. Haunting harmonies hover, highlighting heavenly hymns, humbling haughty hearts. Humor helps humanize hectic hospital hallways, helping heal hurting humans. Huge hurricanes hammer harbors, highlighting humanitarian helping hands. Historic happenings help humanity harvest helpful hindsight.",
    charCount: 430,
    wordCount: 51,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "4g0f3j98-7cd5-49dj-b3he-05f6j431e27",
    textBody:
      "Jubilant jugglers juggle jade jewels, joking jovially, joining jumbled jamborees. Jarring judgments justly jeopardize juvenile jackals jumping jauntily. Junior journalists jot journal jargon, justifying jumbled juxtapositions. Japanese jasmine joyfully joins jungle jasmine, jutting jaggedly. Jealous jays jeer, jostling jungle jaguars just jogging jointly. Jesters juggle jingling jingle bells, jamming joyfully. Jovial judges justify judicial judgments, joining judicial jurisdictions. Jumpy jackrabbits jaunt jaggedly, journeying jungles, joining jack-o-lantern jamborees.",
    charCount: 426,
    wordCount: 48,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "9h5e7j45-1gd0-42ej-c4f8-3j610g87bf2",
    textBody:
      "Jazz journalists joyfully journey, jotting justly jubilant judgments. Jovial jurors join juries, judging justifiably, jettisoning jaded jealousies. Jaguars jump jauntily, journeying jungle junctures. Jumping jacks just jumpstart January joggers, joining jogging junkets. Jam jars jostle, jiggling juice judiciously. Juvenile jesters juggle jalapenos, joking jovially. Japanese jade jewelry jangles joyously. Jumbo jets journey jointly, jetting jetsetters just jubilantly. Justified judgments jingle jarringly, jamming jittery jokers. Jockeys jostle, jumping jumbled jungle jutting junction.",
    charCount: 422,
    wordCount: 50,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "5h1g4k09-8de6-40ek-c5gf-16g7k542f38",
    textBody:
      "Knowledgeable kangaroos keep kind koalas keen, kindling kinships, knowing kindred karma keeps kingdoms kinder. Knockout kickboxers keenly kick karate kids, knocking knights kneeling. Keyboardists kindle keen keyboard knowledge, keeping key keynotes klinking. Kitchen kings knead knuckle-sized knots, kneading knobs knocking kettles. Kitten kingdoms kindle kitten kinships, keeping kitchens kempt. Keen knowledge keepers kindle kindred knowledge, knitting key knowledges. Knotty kayaks keep knowers knee-deep, kindling keen kayaking kinfolk.",
    charCount: 425,
    wordCount: 51,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "0i6f8k56-2he1-43fk-d5g9-4k721h98cg3",
    textBody:
      "Keen knights kept kingdom keys, kindly keeping kingdoms kempt. Kitten keepers knit kitten kennels, knitting knowledge keenly. Ketchup kings kept kicking kitchen kettles, keeping kooky kitchens kicking. Kaleidoscope keepsakes kindle keen kindred knowledge, keeping kinspeople kindly knitted. Kindly kimonos kept knocking kangaroo knapsacks. Keyboard kings kept knocking keyboards, keeping keyboard knowledge keen. Knotted kernels kept knocking kitchen knives. Kiwi keepers kept kites kicking, knocking kingdom kites. Katydids keep kindling knolls kindly keening.",
    charCount: 428,
    wordCount: 52,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "6i2h5l10-9ef7-41fl-d6hg-27h8l653g49",
    textBody:
      "Lively lyrics lull listeners, leaving lasting legacies. Luminous lakes lazily lap limestone ledges, letting little leaves linger longer. Loyal leaders light lengthy lanterns, leading lost locals lakeward. Libraries lend loads of legendary literature, linking learners lovingly. Lasting laughter literally lightens lives, lifting longing ladies. Lovable lambs leisurely leap lush landscapes, looking lively. Lofty lighthouses loom largely, lighting late locomotives, letting liners locate land. Luminaries lavishly launch luxurious liners, lending lovely landscapes lasting luster.",
    charCount: 429,
    wordCount: 52,
    difficulty: 5,
    author: null,
    src: null,
  },
  {
    id: "1j7g9l67-3if2-44gl-e6h0-5l832i09dh4",
    textBody:
      "Loving lions leisurely lounge, licking little lion luminaries. Lonely lumberjacks labor long, lifting logs like light leaves. Lavish libraries loan literature lovers lengthy literary legacies. Lively ladies lead lengthy lessons, lighting lanterns liberally. Laughing larks loop lazily, landing lightly, lifting loftily. Luminous lightning leaves landscapes lit, lending lakesides lasting light. Limitless learning leads logical leaders, launching latest leaps. Legendary lullabies linger long, lulling little lads. Lovely lilies line lengthy lanes, leaving lasting loveliness.",
    charCount: 426,
    wordCount: 51,
    difficulty: 5,
    author: null,
    src: null,
  },
];

AddTestsToDb(tests);
