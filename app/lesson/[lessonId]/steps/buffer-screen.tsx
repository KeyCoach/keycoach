// app/lesson/[lessonId]/BufferScreen.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/button";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export function BufferScreen({ lessonStep }: { lessonStep: number }) {
  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null);
  const lessonStepMap: { [key: number]: string } = {
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

  const lessonStepDescription = lessonStepMap[lessonStep];

  if (!lessonStepDescription) {
    return <div className="w-full text-center">Invalid lesson step</div>;
  }

  useEffect(() => {
    setJsConfetti(new JSConfetti()); // Initialize only on the client
  }, []);

  const popConfetti = async () => {
    if (jsConfetti) {
      await jsConfetti.addConfetti({
        confettiColors: ["#ff0000", "#00ff00", "#0000ff"],
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center text-center">
      The buffer screen for {lessonStepDescription}
      <div className="mt-4">
        <Button onClick={popConfetti}>Celebrate</Button>
      </div>
    </div>
  );
}
