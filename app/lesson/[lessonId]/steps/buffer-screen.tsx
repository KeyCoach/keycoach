"use client";
import { useEffect } from "react";
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

const FadeInSection = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <div
    className="animate-fade-in"
    style={{
      animationDelay: `${delay}ms`,
      animationFillMode: "forwards",
    }}
  >
    {children}
  </div>
);

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
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.7s ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
      <div className="grid w-full max-w-5xl auto-rows-auto gap-6">
        <FadeInSection delay={0}>
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl py-4 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
            <h1 className="text-3xl">{lessonStepDescription}</h1>
            <p className="text-xl">{lessonPerformanceSummary}</p>
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
