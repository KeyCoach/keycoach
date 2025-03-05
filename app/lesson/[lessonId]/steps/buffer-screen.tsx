"use client";
import { useEffect } from "react";
import { Button } from "@/components/button";
import { Confetti } from "@/components/confetti";
import { FadeInSection } from "@/components/fade-in-section";
import { BounceAnimation } from "@/components/bounce-animation";
import ProgressBar from "./buffer-screen/progress-bar";
import Accordion from "./buffer-screen/key-accuracy-accordion";
import Image from "next/image";
import { useLessonContext } from "../lesson-context";

export enum activityEnum {
  conceptExplanation = "concept-explanation",
  quoteTest = "quote-test",
  typingGame = "typing-game",
  fullTest = "full-test",
}

export function BufferScreen({
  confettiAmount = 0,
}: {
  confettiAmount?: number;
  activityType?: activityEnum;
}) {
  const { handleNextStep, handlePreviousStep, currentStepIndex, currentStep, wpm, acc } =
    useLessonContext();
  const lessonStepDescription = currentStep.cheer;

  // adjust confetti number based on performance
  if (wpm > 50) {
    confettiAmount += 18;
  } else if (wpm > 70) {
    confettiAmount += 18;
  } else if (wpm > 80) {
    confettiAmount += 18;
  }

  if (acc > 92) {
    confettiAmount += 18;
  } else if (acc > 95) {
    confettiAmount += 18;
  } else if (acc > 98) {
    confettiAmount += 18;
  }

  const { triggerConfetti } = Confetti({ confettiAmount: confettiAmount });

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 1400);

    return () => clearTimeout(timer);
  }, [triggerConfetti, confettiAmount]);

  const lessonPerformanceSummary = (): React.ReactNode => {
    return (
      <p className="text-xl">
        In that last level, you typed at{" "}
        <span className="font-semibold text-cerulean-700 dark:text-cerulean-300">
          {wpm.toFixed(0)} WPM
        </span>
        , with a typing accuracy of{" "}
        <span className="font-semibold text-cerulean-700 dark:text-cerulean-300">
          {acc.toFixed(0)}%
        </span>
        .
      </p>
    );
  };

  return (
    <div className="h-page flex items-center justify-center px-4">
      <div className="grid w-full max-w-5xl auto-rows-auto gap-6">
        <FadeInSection delay={0}>
          <div className="relative flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-2xl py-4 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
            <BounceAnimation
              duration="normal"
              startRotation={-6}
              middleRotation={6}
              endRotation={1}
              middleTranslate={-6}
              endTranslate={-3}
              className="absolute -left-6 -top-4 z-10"
            >
              <Image
                src="/img/e-key.png"
                alt="E key"
                width={256}
                height={256}
                className="h-14 w-14"
              />
            </BounceAnimation>
            <BounceAnimation
              duration="normal"
              startRotation={-4}
              middleRotation={14}
              endRotation={3}
              middleTranslate={-2}
              endTranslate={-7}
              className="absolute -right-4 top-4 z-10"
            >
              <Image
                src="/img/!-key.png"
                alt="! key"
                width={256}
                height={256}
                className="h-12 w-12"
              />
            </BounceAnimation>
            <BounceAnimation
              duration="slow"
              startRotation={-12}
              middleRotation={2}
              endRotation={-4}
              middleTranslate={-10}
              endTranslate={-7}
              className="absolute -top-6 right-12 z-10"
            >
              <Image
                src="/img/y-key.png"
                alt="Y key"
                width={256}
                height={256}
                className="h-10 w-10"
              />
            </BounceAnimation>
            <BounceAnimation
              duration="slow"
              startRotation={-6}
              middleRotation={5}
              endRotation={-3}
              middleTranslate={2}
              endTranslate={7}
              className="absolute -top-8 left-16 z-10"
            >
              <Image
                src="/img/ctrl-key.png"
                alt="ctrl key"
                width={256}
                height={256}
                className="h-10 w-10"
              />
            </BounceAnimation>
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
            <ProgressBar currentLevel={currentStepIndex} />
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
