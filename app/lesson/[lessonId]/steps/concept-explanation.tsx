// app/lesson/[lessonId]/ConceptExplanation.tsx
export function ConceptExplanation({ conceptPhase }: { conceptPhase: number }) {
  return (
    <div>
      {conceptPhase === 1 && <div>Intro Concept Explanation</div>}
      {conceptPhase === 2 && <div>Second Concept Explanation</div>}
      {conceptPhase === 3 && <div>Review Concept Explanation</div>}
    </div>
  );
}
