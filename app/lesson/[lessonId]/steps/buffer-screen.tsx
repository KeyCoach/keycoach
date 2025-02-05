"use client";
import { Button } from "@/components/button";
import { Confetti } from "@/components/confetti";
import ProgressBar from "./buffer-screen/progress-bar";
import Accordion from "./buffer-screen/key-accuracy-accordion";

enum activityEnum {
  conceptExplanation = "concept-explanation",
  quoteTest = "quote-test",
  typingGame = "typing-game",
  fullTest = "full-test",
}

export function BufferScreen({
  lessonStep,
  confettiNumber = 100,
  activityType = activityEnum.conceptExplanation,
  handleNextStep,
  handlePreviousStep,
}: {
  lessonStep: number;
  confettiNumber?: number;
  activityType?: activityEnum;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}) {
  const { triggerConfetti } = Confetti({ confettiNumber: confettiNumber });
  const lessonStepMap: Record<number, string> = {
    1: "concept-explanation",
    2: "quote-test",
    3: "typing-game",
    4: "full-test",
    5: "concept-explanation",
    6: "quote-test",
    7: "typing-game",
    8: "concept-explanation",
    9: "full-test",
  };

  const lessonStepDescription = lessonStepMap[lessonStep] || "Invalid lesson step";
  const lessonPerformanceSummary = "You typed 100 words per minute with 95% accuracy";

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="grid w-full max-w-5xl auto-rows-auto gap-6">
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl py-4 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
          <h1 className="text-3xl">{lessonStepDescription}</h1>
          <p className="text-xl">{lessonPerformanceSummary}</p>
        </div>

        <div className="flex h-56 w-full items-center justify-center gap-12 py-4">
          <div id="buffer-screen-character" className="w-2/5 text-center">
            where the fox mascot will go
          </div>
          <div
            id="character-quote"
            className="grid h-full w-2/5 place-items-center rounded-3xl bg-slate-50 shadow-md shadow-slate-200 dark:bg-slate-800 dark:shadow-slate-600"
          >
            the quote the fox mascot will say
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <div className="w-full">
            <Accordion />
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-12">
          <Button onClick={triggerConfetti}>back to lessons</Button>
          <Button onClick={triggerConfetti}>Celebrate</Button>
          <div className="flex gap-4">
            <Button onClick={handlePreviousStep}>Previous</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </div>

        <div className="flex w-full items-center justify-center">
          <ProgressBar currentLevel={lessonStep} />
        </div>
      </div>
    </div>
  );
}