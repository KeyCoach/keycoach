"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/button";
import { Confetti } from "@/components/confetti";
import ProgressBar from "./buffer-screen/progress-bar";

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
    <div className="flex min-h-screen items-center justify-center">
      {/* grid of 5 rows, vertically centered on the page */}
      <div className="grid h-3/4 w-full grid-rows-5 gap-4">
        {/* first row is the completion message */}
        <div className="row-span-1 flex flex-col items-center justify-center gap-6 rounded-2xl bg-slate-800 py-6 shadow-md shadow-slate-600">
          <h1 className="text-4xl">{lessonStepDescription}</h1>
          <p className="text-xl">{lessonPerformanceSummary}</p>
        </div>
        {/* second row is the character */}
        <div className="row-span-1 flex w-full items-center justify-center gap-12">
          <div
            id="buffer-screen-character"
            className="grid h-full w-1/3 place-items-center text-center"
          >
            where the character will go
          </div>
          <div
            id="character-quote"
            className="grid h-full w-1/3 place-items-center rounded-3xl bg-slate-800 shadow-md shadow-slate-600"
          >
            the quote the character will say
          </div>
        </div>
        {/* third row is the keyboard accuracy chart */}
        <div className="row-span-1 flex w-full items-center justify-center">
          <div
            id="keyboard-accuracy-chart"
            className="grid h-full w-1/3 place-items-center text-center"
          >
            click to expand the keyboard accuracy chart
          </div>
        </div>
        {/* fourth row is the buttons */}
        <div className="row-span-1 flex w-full items-center justify-between gap-12">
          <Button onClick={triggerConfetti}>back to lessons</Button>
          <Button onClick={triggerConfetti}>Celebrate</Button>
          <div className="flex gap-4">
            <Button onClick={handlePreviousStep}>Previous</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </div>
        </div>
        {/* fifth row is the lesson progress bar */}
        <div className="row-span-1 flex w-full items-center justify-center">
          <ProgressBar currentLevel={lessonStep} />
        </div>
      </div>
    </div>
  );
}
