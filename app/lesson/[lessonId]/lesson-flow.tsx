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

  const renderStep = () => {
    switch (lessonStep) {
      case 1:
        return bufferScreen ? (
          <BufferScreen lessonStep={lessonStep} />
        ) : (
          <ConceptExplanation conceptPhase={1} />
        );
      case 2:
        return bufferScreen ? <BufferScreen lessonStep={lessonStep} /> : <QuoteTest />;
      case 3:
        return bufferScreen ? <BufferScreen lessonStep={lessonStep} /> : <TypingGame />;
      case 4:
        return bufferScreen ? (
          <BufferScreen lessonStep={lessonStep} />
        ) : (
          <FullTest testType="1 min" />
        );
      case 5:
        return bufferScreen ? (
          <BufferScreen lessonStep={lessonStep} />
        ) : (
          <ConceptExplanation conceptPhase={2} />
        );
      case 6:
        return bufferScreen ? <BufferScreen lessonStep={lessonStep} /> : <QuoteTest />;
      case 7:
        return bufferScreen ? <BufferScreen lessonStep={lessonStep} /> : <TypingGame />;
      case 8:
        return bufferScreen ? (
          <BufferScreen lessonStep={lessonStep} />
        ) : (
          <ConceptExplanation conceptPhase={3} />
        );
      case 9:
        return bufferScreen ? (
          <BufferScreen lessonStep={lessonStep} />
        ) : (
          <FullTest testType="3 min" />
        );
      default:
        return <div>Lesson Complete!</div>;
    }
  };

  return (
    <div className="flex w-full relative">
      {/* lesson sidebar */}
      <Sidebar lessonId={lessonId} currentLevel={lessonStep} />
      <div className="flex flex-col w-full h-96">
        {renderStep()}
        <button onClick={() => handleNextStep()}>Next Step</button>
      </div>
      <StatsPanel />
    </div>
  );
}
