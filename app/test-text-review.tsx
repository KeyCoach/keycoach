import { Attempt, Letter } from "./lib/types";

export function TestTextReview({ attempt }: { attempt: Attempt }) {
  return attempt.userInput.map((word, wordIndex) => (
    <span key={wordIndex}>
      <span className="inline-block">
        {word.inputs.map((input, letterIndex) => {
          const letterClasses = {
            correct: "text-slate-900 dark:text-slate-50",
            wrong: "text-red-500 dark:text-red-400",
            missing: "text-slate-400 dark:text-slate-500",
            wrongFinger: "text-orange-500 dark:text-orange-400",
          };

          let letterClass = "";
          if (input.status === Letter.Wrong) {
            letterClass = letterClasses.wrong;
          } else if (input.status === Letter.Missing) {
            letterClass = letterClasses.missing;
          } else if (input.correctFinger === false) {
            // uses "=== false" to exclude null (null means no finger data)
            letterClass = letterClasses.wrongFinger;
          } else if (
            attempt.mistakes.some(
              (mistake) => mistake.letterIndex === letterIndex && mistake.wordIndex === wordIndex,
            )
          ) {
            letterClass = letterClasses.wrong;
          } else {
            letterClass = letterClasses.correct;
          }

          const correctWord = word.inputs.every(
            (input, letterIndex) =>
              input.status === Letter.Correct &&
              input.correctFinger !== false &&
              !attempt.mistakes.some(
                (mistake) => mistake.letterIndex === letterIndex && mistake.wordIndex === wordIndex,
              ),
          );

          const wrongWordClass = correctWord ? "" : "underline decoration-red-400";
          return (
            // letters they've typed so far
            <span
              key={"letter" + wordIndex + "," + letterIndex}
              kc-id="letter"
              className={` ${letterClass} ${wrongWordClass}`}
            >
              {input.key}
            </span>
          );
        })}
        {/* their cursor */}
        {wordIndex === attempt.userInput.length - 1 && (
          <span className="blink absolute font-bold">⎸</span>
        )}
        {/* the rest of the word */}
        {word.word
          ?.slice(word.inputs.length)
          .split("")
          .map((letter, j) => (
            <span key={"ghost-letter" + j} kc-id="ghost-letter" className="text-slate-400">
              {letter}
            </span>
          ))}
      </span>
      <span> </span>
    </span>
  ));
}
