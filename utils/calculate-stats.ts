import { Mistake, Word, Stat, Letter, Test } from "@/app/lib/types";

export function CalculateStats(
  test: Test,
  userInput: Word[],
  mistakes: Mistake[],
  duration: number,
): Stat {
  if (userInput.length < 3) {
    return { wpm: 0, accuracy: 0, fingerAccuracy: 0 };
  }
  const correctChars = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Correct).length;
  }, 0);

  // BUG: this does not properly take missing words into account
  const wrongLetterMistakes = mistakes.filter(
    (mistake: Mistake) => mistake.status === Letter.WrongLetter,
  ).length;
  const wrongFingerMistakes = mistakes.filter(
    (mistake: Mistake) => mistake.status === Letter.WrongFinger,
  ).length;

  const accuracy = ((test.charCount - wrongLetterMistakes) / test.charCount) * 100;
  const fingerAccuracy = ((test.charCount - wrongFingerMistakes) / test.charCount) * 100;

  const words = (correctChars + userInput.length) / 5;
  const minutes = duration / 1000 / 60;
  const wpm = words / minutes;

  console.log(wpm, accuracy, fingerAccuracy);

  return { wpm, accuracy, fingerAccuracy };
}
