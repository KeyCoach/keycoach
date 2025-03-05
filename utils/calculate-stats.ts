import { Mistake, Word, Stat, Letter, Test } from "@/app/lib/types";

export function CalculateStats(
  test: Test,
  userInput: Word[],
  mistakes: Mistake[],
  duration: number,
): Stat {
  const correctChars = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Correct).length;
  }, 0);

  const wrongLetterMistakes = mistakes.filter(
    (mistake: Mistake) => mistake.status === Letter.WrongLetter,
  ).length;
  const wrongFingerMistakes = mistakes.filter(
    (mistake: Mistake) => mistake.status === Letter.WrongFinger,
  ).length;

  const accuracy = ((test.charCount - wrongLetterMistakes) / test.charCount) * 100;
  const fingerAccuracy = ((test.charCount - wrongFingerMistakes) / test.charCount) * 100;

  const words = (correctChars + test.wordCount) / 5;
  const minutes = duration / 1000 / 60;
  const wpm = words / minutes;

  console.log({ wpm, accuracy, fingerAccuracy });

  return { wpm, accuracy, fingerAccuracy };
}
