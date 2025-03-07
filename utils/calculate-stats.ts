import { Mistake, Word, Stat, Letter, MistakeType } from "@/app/lib/types";

export function CalculateStats(userInput: Word[], mistakes: Mistake[], duration: number): Stat {
  if (userInput.length < 3) {
    return { netWpm: 0, grossWpm: 0, accuracy: 0, fingerAccuracy: 0 };
  }
  const minutes = duration / 1000 / 60;
  const numSpaces = userInput.filter((word) => word.inputs.length > 0).length - 1;

  const totalTypedLetters = userInput.reduce((acc, word) => {
    return acc + word.inputs.length;
  }, 0);

  const correctChars = userInput.reduce((acc, word) => {
    return (
      acc +
      word.inputs.filter(
        (input) => input.status === Letter.Correct || input.status === Letter.Wrong,
      ).length
    );
  }, 0);

  const missingLetters = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Missing).length;
  }, 0);

  const wrongLetters = mistakes.filter(
    (mistake: Mistake) => mistake.type === MistakeType.Wrong,
  ).length;

  const wrongFingerLetters = mistakes.filter(
    (mistake: Mistake) => mistake.type === MistakeType.Technique,
  ).length;

  const letterMistakes = wrongLetters + missingLetters;
  const grossWpm = (totalTypedLetters + numSpaces) / 5 / minutes;
  const netWpm = (correctChars + numSpaces) / 5 / minutes;
  const accuracy = ((totalTypedLetters - letterMistakes) / totalTypedLetters) * 100;
  const fingerAccuracy = ((correctChars - wrongFingerLetters) / totalTypedLetters) * 100;

  return {
    netWpm,
    grossWpm,
    accuracy: Math.max(0, accuracy),
    fingerAccuracy: Math.max(0, fingerAccuracy),
  };
}
