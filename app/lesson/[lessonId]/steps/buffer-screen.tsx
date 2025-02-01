"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/button";
import { Confetti } from "@/components/confetti";

interface confettiProps {
  confettiRadius: number;
  confettiNumber: number;
  emojis?: string[];
  confettiColors?: string[];
}

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
  const { triggerConfetti } = Confetti({ confettiNumber: 100 });
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

  return (
    <div className="absolute top-1/2 mx-auto flex w-full -translate-y-1/2 rounded-lg bg-slate-200 shadow-md shadow-slate-600 dark:bg-slate-900">
      <div id="buffer-screen-character" className="h-full w-1/3 text-center">
        where the character will go
      </div>
      <h1>{lessonStepDescription}</h1>
      The buffer screen for {lessonStepDescription}
      <div className="flex justify-end">
        <Button className="mt-4" onClick={triggerConfetti}>
          Celebrate
        </Button>
        <Button className="mt-4" onClick={handlePreviousStep}>
          Previous
        </Button>
        <Button className="mt-4" onClick={handleNextStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
