"use client";
import { useEffect } from "react";
import { Button } from "@/components/button";
import { Confetti } from "@/components/confetti";
import { FadeInSection } from "@/components/fade-in-section";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const lessonStepMap: Record<number, string> = {
    1: "concept-explanation",
    2: "Nice job! You've completed the concept explanation.",
    3: "Great work in that last typing test.",
    4: "Woah, speedy fingers! You're doing great.",
    5: "You're on fire! Keep up the good work.",
    6: "It seems like you're getting the hang of this.",
    7: "Another great typing test. Keep it up!",
    8: "You blasted those asteroids!",
    9: "Get ready for the final challenge!",
  };

  const lessonStepDescription = lessonStepMap[lessonStep] || "Invalid lesson step";
  const lessonPerformanceSummary = (): React.ReactNode => {
    // random wpm between 40-80
    const wpm = Math.round(Math.random() * 40 + 40);
    // random accuracy between 90-100
    const accuracy = Number(Math.random() * 10 + 90).toFixed(2);
    return (
      <p className="text-xl">
        In that last level, you typed at <span className="font-semibold dark:text-cerulean-300 text-cerulean-700">{wpm} WPM</span>, with an typing accuracy of <span className="font-semibold dark:text-cerulean-300 text-cerulean-700">{accuracy}%</span>.
      </p>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="grid w-full max-w-5xl auto-rows-auto gap-6">
        <FadeInSection delay={0}>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl py-4 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
            <h1 className="text-3xl">{lessonStepDescription}</h1>
            {lessonPerformanceSummary()}
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
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
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="flex w-full items-center justify-center">
            <div className="w-full">
              <Accordion />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={600}>
          <div className="flex w-full items-center justify-between gap-12">
            <Button onClick={triggerConfetti}>back to lessons</Button>
            <div className="flex gap-4">
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={800}>
          <div className="flex w-full items-center justify-center">
            <ProgressBar currentLevel={lessonStep} />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
