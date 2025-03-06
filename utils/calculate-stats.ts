import { Mistake, Word, Stat, Letter } from "@/app/lib/types";

export function CalculateStats(userInput: Word[], mistakes: Mistake[], duration: number): Stat {
  if (userInput.length < 3) {
    return { wpm: 0, accuracy: 0, fingerAccuracy: 0 };
  }
  const minutes = duration / 1000 / 60;
  const numSpaces = userInput.filter((word) => word.inputs.length > 0).length - 1;

  const typedChars = userInput.reduce((acc, word) => {
    return acc + word.inputs.length;
  }, 0);

  const correctChars = userInput.reduce((acc, word) => {
    return (
      acc +
      word.inputs.filter(
        (input) => input.status === Letter.Correct || input.status === Letter.WrongFinger,
      ).length
    );
  }, 0);

  const wrongLetters = mistakes.filter(
    (mistake: Mistake) => mistake.status === Letter.WrongLetter,
  ).length;

  const missingLetters = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Missing).length;
  }, 0);

  const wrongFingerMistakes = mistakes.filter(
    (mistake: Mistake) => mistake.status === Letter.WrongFinger,
  ).length;

  // TODO: add gross wpm to stats
  // TODO: change Letter.WrongFinger to a flag instead of being in the enum
  const letterMistakes = wrongLetters + missingLetters;
  const grossWpm = (typedChars + numSpaces) / 5 / minutes;
  const netWpm = (correctChars + numSpaces) / 5 / minutes;
  const accuracy = ((typedChars - letterMistakes) / typedChars) * 100;
  const fingerAccuracy = ((correctChars - wrongFingerMistakes) / typedChars) * 100;

  return {
    wpm: netWpm,
    accuracy: Math.max(0, accuracy),
    fingerAccuracy: Math.max(0, fingerAccuracy),
  };
}
