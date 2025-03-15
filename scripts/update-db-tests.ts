import { Test, TestType } from "../app/lib/types";
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "8c12b751-a1cc-410f-9ee6-71813d391f54",
    src: "The Book of Mormon",
    author: "Nephi",
    textBody: "And my father dwelt in a tent.",
    charCount: 30,
    wordCount: 7,
    difficulty: 5,
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
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
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "2k8h7q32-4if9-45qk-f7i1-6q743j10ei5",
    textBody:
      "The quaint village square buzzed with activity every weekend. Quirky antique shops displayed unique treasures while children squealed with delight around the fountain. Tranquil quiet returned only after sunset when shops closed their doors.",
    charCount: 213,
    wordCount: 33,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "3l9i8q43-5jg0-46ql-g8j2-7q854k21fj6",
    textBody:
      "Professor Quinn frequently questioned conventional theories, requiring students to think critically about scientific principles. His unorthodox quizzes often required quick thinking rather than quoting textbooks, making his quantum physics class both challenging and fascinating.",
    charCount: 216,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "4m0j9w54-6kh1-47wm-h9k3-8w965l32gk7",
    textBody:
      "Winter winds whistled through wooden window frames while we warmed ourselves by the fire. The weathered walls of the cabin had withstood decades of snowstorms, welcoming weary travelers with their worn but cozy charm.",
    charCount: 198,
    wordCount: 35,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "5n1k0w65-7li2-48wn-i0l4-9w076m43hl8",
    textBody:
      "Sarah walked slowly along the waterfront, watching waves wash over white sand. She wondered what life would bring next week when she would begin her new writing job at the west coast newspaper.",
    charCount: 180,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "6o2l1e76-8mj3-49eo-j1m5-0e187n54im9",
    textBody:
      "Every evening Emma enjoyed exploring the extensive gardens behind her grandmother's estate. The elderly gardener had created exceptional environments where exotic flowers emerged between evergreen hedges, their sweet essence enriching the air.",
    charCount: 210,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "7p3m2e87-9nk4-50ep-k2n6-1e298o65jn0",
    textBody:
      "The engineer examined each element of the design carefully. Energy efficiency was essential for environmental reasons, but elegance mattered equally to her aesthetic sensibilities. She erased several lines and redesigned the eastern entrance.",
    charCount: 205,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "8q4n3r98-0ol5-51rq-l3o7-2r309p76ko1",
    textBody:
      "Rivers rarely run straight through rocky terrain, rather they curve and carve through the hardest barriers. The current carries rich minerals from remote mountains, nurturing the fertile farmlands around rural communities.",
    charCount: 199,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "9r5o4r09-1pm6-52rr-m4p8-3r410q87lp2",
    textBody:
      "The researcher recorded her remarkable results after reviewing thirty prior experiments. Her groundbreaking discoveries regarding radiation resistance in certain organisms surprised her colleagues and transformed their understanding of cellular recovery.",
    charCount: 208,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "0s6p5t10-2qn7-53ts-n5q9-4t521r98mq3",
    textBody:
      "The talented teacher took time to thoroughly explain tough topics to her students. They tackled tricky mathematical theorems together, turning abstract concepts into tangible examples that twenty teenagers could truly understand.",
    charCount: 207,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "1t7q6t21-3ro8-54tt-o6r0-5t632s09nr4",
    textBody:
      "Tara transferred the tattered old manuscripts to their new protective cases. The texts contained traditional tales told through generations, their timeless truths still relevant despite being written two centuries ago.",
    charCount: 192,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "2u8r7y32-4sp9-55yu-p7s1-6y743t10os5",
    textBody:
      "Yesterday's young saplings have grown beyond your expectations, yielding beautiful yellow blossoms each spring. Many years ago, my grandfather loyally tended these gardens, yet he would hardly recognize them today.",
    charCount: 190,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "3v9s8y43-5tq0-56yv-q8t2-7y854u21pt6",
    textBody:
      "The psychology study yielded fascinating insights into memory systems. Analysts observed that younger participants typically recalled visual cues more easily, yet struggled with auditory information beyond thirty seconds.",
    charCount: 189,
    wordCount: 28,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "4w0t9u54-6ur1-57uw-r9u3-8u965v32qu7",
    textBody:
      "Under the university's updated curriculum, students must understand fundamental concepts before pursuing advanced studies. The unusual approach encourages curiosity and builds upon previous knowledge, ultimately resulting in deeper understanding.",
    charCount: 207,
    wordCount: 29,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "5x1u0u65-7vs2-58ux-s0v4-9u076w43rv8",
    textBody:
      "The museum curator unveiled a previously undiscovered sculpture during the autumn exhibition. Audiences gathered around the unique marble bust, marveling at its untouched beauty and superior craftsmanship from the cultural renaissance.",
    charCount: 204,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "6y2v1i76-8wt3-59iy-t1w5-0i187x54sw9",
    textBody:
      "In important scientific investigations, initial impressions might mislead researchers if their implicit biases influence interpretations. Critical thinking with intellectual integrity is indispensable for identifying meaningful insights within complex information.",
    charCount: 209,
    wordCount: 29,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "7z3w2i87-9xu4-60iz-u2x6-1i298y65tx0",
    textBody:
      "The island village sits idyllically between high cliffs and white sandy beaches. Its inhabitants live simply, fishing in the morning, tending their fruit orchards in the afternoon, and gathering at twilight for music.",
    charCount: 192,
    wordCount: 33,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "8a4x3o98-0yv5-61oa-v3y7-2o309z76uy1",
    textBody:
      "Once open ocean stretched beyond the horizon, offering opportunities for bold explorers. Overcoming obstacles of geography and orientation, they voyaged across enormous expanses to discover other worlds of rich possibilities.",
    charCount: 194,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "9b5y4o09-1zw6-62ob-w4z8-3o410a87vz2",
    textBody:
      "The old bookshop on the corner offers thousands of forgotten stories on its wooden shelves. Monica often browses for hours among novels, biographies, and historical accounts, lost in the comfort of other people's thoughts.",
    charCount: 202,
    wordCount: 34,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "0c6z5p10-2ax7-63pc-x5a9-4p521b98wa3",
    textBody:
      "Professor Parker prepared her presentation with particular care, placing special emphasis on practical applications. The proposed project promised impressive potential if properly implemented according to her precise parameters.",
    charCount: 201,
    wordCount: 29,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "1d7a6p21-3by8-64pd-y6b0-5p632c09xb4",
    textBody:
      "The peaceful path through the pine forest provided perfect opportunities for contemplation. Patches of purple wildflowers peeked between rocks, while playful squirrels darted up tree trunks, pausing occasionally to observe passing hikers.",
    charCount: 210,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "2e8b7z32-4cz9-65zc-z7d1-6z743e10de5",
    textBody:
      "The zealous zoologist zigzagged through the maze of analytical puzzles, organizing specimens with amazing precision. Her razor-sharp focus on zebra migration patterns had frozen research funds until she authorized the prize-winning magazine article.",
    charCount: 214,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "3f9c8z43-5dz0-66zd-z8e2-7z854f21ef6",
    textBody:
      "Professor Hazel recognized the zone where civilization had flourished before being frozen in time by volcanic ash. The archaeological site buzzed with activity as citizens gathered to visualize ancient plaza layouts.",
    charCount: 199,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "4g0d9x54-6ex1-67xe-x9f3-8x965g32fg7",
    textBody:
      "The exhibition showcased exquisite textiles with complex patterns woven by expert craftspeople. Visitors examined delicate silks and luxurious velvets, exclaiming over the extraordinary detail in each example of traditional techniques.",
    charCount: 206,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "5h1e0x65-7fx2-68xf-x0g4-9x076h43gh8",
    textBody:
      "Dr. Xavier explained the experimental treatment to anxious patients while his assistant mixed chemicals in exact proportions. The unorthodox approach had exceeded expectations during extensive clinical trials, exhibiting remarkable success rates.",
    charCount: 208,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "6i2f1c76-8gc3-69ci-c1h5-0c187i54hi9",
    textBody:
      "The coastal community celebrated its centennial with colorful decorations across the central square. Children carried candles in the procession while musicians created captivating melodies that echoed between concrete buildings.",
    charCount: 201,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "7j3g2c87-9hc4-70cj-c2i6-1c298j65ij0",
    textBody:
      "Classical concerts at the cultural center consistently attract capacity crowds during the academic calendar. Critics acclaim the acoustics, claiming that certain compositions become completely transformed in this contemporary space.",
    charCount: 203,
    wordCount: 29,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "8k4h3v98-0iv5-71vk-v3j7-2v309k76jk1",
    textBody:
      "The vast valley vista revealed verdant vegetation covering every visible surface. Vibrant wildflowers moved with the breeze while vinyl-sided vacation homes dotted the landscape, giving visitors a perfect view of native wildlife.",
    charCount: 199,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "9l5i4v09-1jv6-72vl-v4k8-3v410l87kl2",
    textBody:
      "Several innovative inventions have revolutionized television viewers' experiences over five decades. Virtual reality environments provide immersive adventures while video streaming services deliver diverse movies to every device with remarkable convenience.",
    charCount: 210,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "0m6j5b10-2kb7-73bm-b5l9-4b521m98lm3",
    textBody:
      "The big blue butterfly balanced briefly on the bright blooming bushes behind my brother's cabin. Beautiful birds soared above the babbling brook that flowed beneath the broken bridge connecting both banks.",
    charCount: 184,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "1n7k6b21-3lb8-74bn-b6m0-5b632n09mn4",
    textBody:
      "The basketball team celebrated their biggest victory by breaking bread together at Benjamin's bistro. The boys had battled bravely against formidable opponents, bringing home the bronze medal despite being tournament underdogs.",
    charCount: 201,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "2o8l7n32-4mn9-75no-n7o1-6n743o10no5",
    textBody:
      "The newly nominated principal announced necessary changes during an evening meeting. Parents nodded in agreement when she mentioned nutrition improvements in school lunches and innovative technology for the science department.",
    charCount: 197,
    wordCount: 30,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "3p9m8n43-5on0-76np-n8p2-7n854p21op6",
    textBody:
      "Nathan wandered along narrow mountain trails, noting native plants in his journal. The afternoon sunshine enhanced natural landscapes, turning ordinary stones into glistening treasures and transforming tiny streams into magnificent wonders.",
    charCount: 205,
    wordCount: 31,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "4q0n9m54-6pm1-77mq-m9q3-8m965q32pq7",
    textBody:
      "Many musical masterpieces remain memorable despite being composed hundreds of years ago. Modern musicians must maintain meticulous timing when performing Mozart's most demanding symphonies for appreciative summer audiences.",
    charCount: 192,
    wordCount: 29,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
  {
    id: "5r1o0m65-7qm2-78mr-m0r4-9m076r43qr8",
    textBody:
      "The mammoth museum welcomed more than a million visitors during its most successful summer. Families marveled at impressive exhibits showcasing ancient mammals, gemstones from remote mines, and magnificent ceremonial masks from indigenous communities.",
    charCount: 212,
    wordCount: 32,
    difficulty: 5,
    author: null,
    src: null,
    type: TestType.Quote,
    duration: null,
  },
];

AddTestsToDb(tests);
