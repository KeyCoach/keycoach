"use client";

import { useState } from "react";
import Link from "next/link";

type LessonProps = {
  lessonId: string;
};

export function LessonSteps({ lessonId }: LessonProps) {
  const [lessonStep, setLessonStep] = useState(1);

  return (
    <div>
      <div>Current Step: {lessonStep}</div>
      <div>
        <button onClick={() => setLessonStep(lessonStep + 1)}>Next Step</button>
      </div>
      <div>
        <Link href="/lesson">Back to Lesson Dashboard</Link>
      </div>
    </div>
  );
}
