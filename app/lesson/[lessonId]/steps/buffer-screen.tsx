"use client";
import { Button } from "@/components/button";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

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
}: {
  lessonStep: number;
  confettiNumber?: number;
  activityType?: activityEnum;
  handleNextStep: () => void;
}) {
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

  const popConfetti = async () => {
    let confettiProps: confettiProps = {
      confettiRadius: 8,
      confettiNumber: confettiNumber,
    };

    Math.random() > 0.5
      ? (confettiProps["emojis"] = ["🎉", "🎊", "🥳", "🚀", "🌟"])
      : (confettiProps["confettiColors"] = [
          "#E8975F",
          "#73C89B",
          "#6CB9DA",
          "#EB847F",
          "#669CD7",
          "#f2f2f2",
        ]);

    jsConfetti.addConfetti({
      ...confettiProps,
    });
  };

  return (
    <div className="roudned-lg absolute top-1/2 mx-auto flex w-full -translate-y-1/2 bg-slate-200 shadow-md shadow-slate-600 dark:bg-slate-900">
      <div id="buffer-screen-character" className="h-full w-1/3 text-center">
        where the character will go
      </div>
      <h1>{}</h1>
      The buffer screen for {lessonStepDescription}
      <Button className="mt-4" onClick={popConfetti} colorTheme="cerulean">
        Celebrate
      </Button>
      <Button className="mt-4" onClick={handleNextStep} colorTheme="amber">
        Next
      </Button>
    </div>
  );
}
