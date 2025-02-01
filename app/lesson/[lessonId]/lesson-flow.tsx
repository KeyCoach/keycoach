// app/lesson/[lessonId]/LessonFlow.tsx
"use client";
import { useState } from "react";
import { ConceptExplanation } from "./steps/concept-explanation";
import { QuoteTest } from "./steps/quote-test";
import { TypingGame } from "./steps/typing-game";
import { FullTest } from "./steps/full-test";
import { BufferScreen } from "./steps/buffer-screen";
import Sidebar from "./sidebar";
import StatsPanel from "./stats-panel";

export function LessonFlow({ lessonId }: { lessonId: string }) {
  const [lessonStep, setLessonStep] = useState(1);
  const [bufferScreen, setBufferScreen] = useState(false);

  function handleNextStep() {
    bufferScreen ? setBufferScreen(false) : setLessonStep(lessonStep + 1);
    setBufferScreen(!bufferScreen);
  }

  function handlePreviousStep() {
    setLessonStep(lessonStep - 1);
    setBufferScreen(!bufferScreen);
  }

  const renderStep = () => {
    switch (lessonStep) {
      case 1:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <ConceptExplanation conceptPhase={1} handleNextStep={handleNextStep} />
        );
      case 2:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <QuoteTest handleNextStep={handleNextStep} />
        );
      case 3:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <TypingGame handleNextStep={handleNextStep} />
        );
      case 4:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <FullTest testType="1 min" handleNextStep={handleNextStep} />
        );
      case 5:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <ConceptExplanation
            conceptPhase={2}
            handleNextStep={handleNextStep}
          />
        );
      case 6:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <QuoteTest handleNextStep={handleNextStep} />
        );
      case 7:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <TypingGame handleNextStep={handleNextStep} />
        );
      case 8:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <ConceptExplanation
            conceptPhase={3}
            handleNextStep={handleNextStep}
          />
        );
      case 9:
        return bufferScreen ? (
          <BufferScreen
            lessonStep={lessonStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        ) : (
          <FullTest testType="3 min" handleNextStep={handleNextStep} />
        );
      default:
        return <div>Lesson Complete!</div>;
    }
  };

  return (
    <div className="relative flex h-screen w-full justify-center">
      {/* lesson sidebar */}
      <Sidebar lessonId={lessonId} currentLevel={lessonStep} />
      <div className="absolute top-1/2 flex w-3/5 -translate-y-1/2 flex-col bg-slate-200 dark:bg-slate-900">
        {renderStep()}
      </div>
      <StatsPanel />
    </div>
  );
}
