// app/lesson/[lessonId]/BufferScreen.tsx
export function BufferScreen({ lessonStep }: { lessonStep: number }) {
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
    return <div>Invalid lesson step</div>;
  }

  return <div>The buffer screen for {lessonStepDescription}</div>;
}
