"use client";
import { useEffect } from "react";
import { Button } from "@/components/button";
import { Confetti } from "@/components/confetti";
import { FadeInSection } from "@/components/fade-in-section";
import { BounceAnimation } from "@/components/bounce-animation";
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
  const { handleNextStep, handlePreviousStep, currentStep, netWpm, acc } = useLessonContext();
  const lessonStepDescription = currentStep.cheer;

  // adjust confetti number based on performance
  if (netWpm > 50) {
    confettiAmount += 18;
  } else if (netWpm > 70) {
    confettiAmount += 18;
  } else if (netWpm > 80) {
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
          {netWpm.toFixed(0)} WPM
        </span>
        , with a typing accuracy of{" "}
        <span className="font-semibold text-cerulean-700 dark:text-cerulean-300">
          {acc.toFixed(0)}%
        </span>
        .
      </p>
    );
  };

  // Get mascot image and quote based on performance
  const getMascotFeedback = () => {
    // For low accuracy
    if (acc < 70) {
      return {
        image: "/img/Tired-Mascot.png",
        quote:
          "Good try! Slow down and focus on accuracy. It's better to type correctly than quickly.",
      };
    }
    // For low WPM but decent accuracy
    else if (netWpm < 30 && acc >= 80) {
      return {
        image: "/img/Tired-Mascot.png",
        quote: "Nice accuracy! Let's work on building up your speed now. Keep practicing!",
      };
    }
    // For medium performance
    else if (netWpm >= 30 && netWpm < 70 && acc >= 50 && acc < 90) {
      return {
        image: "/img/Excited-Mascot.png",
        quote: "You're making good progress! Keep practicing to improve both speed and accuracy.",
      };
    }
    // For good WPM but needs accuracy work
    else if (netWpm >= 60 && acc < 85) {
      return {
        image: "/img/Amazing-Mascot.png",
        quote: "Great speed! Try slowing down just a bit to improve your accuracy.",
      };
    }
    // For good accuracy but needs WPM work
    else if (netWpm < 50 && acc >= 90) {
      return {
        image: "/img/Excited-Mascot.png",
        quote: "Excellent accuracy! Now challenge yourself to type a little faster.",
      };
    }
    // For excellent performance
    else if (netWpm >= 60 && acc >= 90 && acc < 98) {
      return {
        image: "/img/Strong-Mascot.png",
        quote: "Looking STRONG! You're showing great balance between speed and accuracy!",
      };
    }
    // For outstanding performance
    else if (netWpm >= 70 && acc >= 98) {
      return {
        image: "/img/LookingGood-Mascot.png",
        quote:
          "LOOKING Good! Your typing skills are outstanding! You're mastering both speed and accuracy!",
      };
    }
    // Default feedback
    else {
      return {
        image: "/img/Mascot3.svg",
        quote: "Keep practicing! Consistent practice is the key to improving your typing skills.",
      };
    }
  };

  const { image, quote } = getMascotFeedback();

  return (
    <div className="h-page flex items-center justify-center px-4">
      <div className="grid w-full max-w-5xl auto-rows-auto gap-16">
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
            <div id="buffer-screen-character" className="objects-center w-1/3">
              <div>
                <Image src={image} alt="KeyCoach Mascot" width={275} height={275} priority />
              </div>
            </div>
            <div
              id="character-quote"
              className="flex h-40 w-1/2 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 p-6 shadow-md"
            >
              {quote}
            </div>
          </div>
        </FadeInSection>

        {/* <FadeInSection delay={400}>
          <div className="flex w-full items-center justify-center">
            <div className="w-full">
              <Accordion />
            </div>
          </div>
        </FadeInSection> */}

        <FadeInSection delay={600}>
          <div className="flex w-full items-center justify-between gap-12">
            <Button onClick={triggerConfetti}>back to lessons</Button>
            <div className="flex gap-4">
              <Button onClick={handlePreviousStep}>Previous</Button>
              <Button onClick={handleNextStep}>Next</Button>
            </div>
          </div>
        </FadeInSection>
        {/* 
        <FadeInSection delay={800}>
          <div className="flex w-full items-center justify-center">
            <ProgressBar currentLevel={currentStepIndex} />
          </div>
        </FadeInSection> */}
      </div>
    </div>
  );
}
