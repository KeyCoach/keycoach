import { getRandomWords } from "@/app/actions";
import { Test, TestType } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";

export async function GenerateWordsTest(wordCount: number): Promise<Test> {
  const words = await getRandomWords(wordCount);
  const test: Test = {
    id: uuidv4(),
    src: null,
    author: null,
    textBody: words.join(" "),
    charCount: words.length,
    wordCount: wordCount,
    difficulty: 1,
    type: TestType.Words,
    duration: null,
  };
  return test;
}

export async function GenerateTimedTest(duration: number): Promise<Test> {
  const impossibleWpm = 200;
  const words = await getRandomWords((duration * impossibleWpm) / 60);
  const test: Test = {
    id: uuidv4(),
    src: null,
    author: null,
    textBody: words.join(" "),
    charCount: words.join(" ").split("").length,
    wordCount: words.length,
    difficulty: 1,
    type: TestType.Timed,
    duration: duration,
  };
  return test;
}
