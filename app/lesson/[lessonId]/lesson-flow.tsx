"use client";
import { useState } from "react";
import { ConceptExplanation } from "./steps/concept-explanation";
import { QuoteTest } from "./steps/quote-test";
import { TypingGame } from "./steps/typing-game";
import { FullTest } from "./steps/full-test";
import { BufferScreen } from "./steps/buffer-screen";
import Sidebar from "./sidebar";
import StatsPanel from "./stats-panel";
import { FadeInSection } from "@/components/fade-in-section";

export function LessonFlow({ lessonId }: { lessonId: string }) {
  const [lessonStep, setLessonStep] = useState(1);
  const [bufferScreen, setBufferScreen] = useState(false);

  function handleNextStep() {
    setBufferScreen(!bufferScreen);
    if (!bufferScreen) setLessonStep(lessonStep + 1);
  }

  function handlePreviousStep() {
    setBufferScreen(!bufferScreen);
    if (bufferScreen) setLessonStep(lessonStep - 1);
  }

  const steps = [
    <ConceptExplanation key="concept-1" conceptPhase={1} handleNextStep={handleNextStep} />,
    <QuoteTest key="quote-1" handleNextStep={handleNextStep} />,
    <TypingGame key="game-1" handleNextStep={handleNextStep} />,
    <FullTest key="test-1" testType="1 min" handleNextStep={handleNextStep} />,
    <ConceptExplanation key="concept-1" conceptPhase={2} handleNextStep={handleNextStep} />,
    <QuoteTest key="quote-2" handleNextStep={handleNextStep} />,
    <TypingGame key="game-2" handleNextStep={handleNextStep} />,
    <ConceptExplanation key="concept-3" conceptPhase={3} handleNextStep={handleNextStep} />,
    <FullTest key="test-2" testType="3 min" handleNextStep={handleNextStep} />,
  ];

  const currentStep = bufferScreen ? (
    <BufferScreen
      lessonStep={lessonStep}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
    />
  ) : (
    steps[lessonStep - 1] || <div>Lesson Complete!</div>
  );

  return (
    <div className="h-page relative flex w-full justify-center overflow-hidden">
      <FadeInSection
        direction="right"
        duration="slow"
        distance={50}
        className="absolute left-0 top-1/2 ml-2"
      >
        <Sidebar lessonId={lessonId} currentLevel={lessonStep} />
      </FadeInSection>
      <div className="relative w-3/5">{currentStep}</div>
      <FadeInSection
        direction="left"
        duration="slow"
        distance={50}
        className="absolute right-0 top-1/2 mr-2"
      >
        <StatsPanel />
      </FadeInSection>
    </div>
  );
}
