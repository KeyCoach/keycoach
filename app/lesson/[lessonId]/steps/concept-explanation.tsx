import { Button } from "@/components/button";

// app/lesson/[lessonId]/ConceptExplanation.tsx
export function ConceptExplanation({
  conceptPhase,
  handleNextStep,
}: {
  conceptPhase: number;
  handleNextStep: () => void;
}) {
  return (
    <>
      <div>
        {conceptPhase === 1 && <div>Intro Concept Explanation</div>}
        {conceptPhase === 2 && <div>Second Concept Explanation</div>}
        {conceptPhase === 3 && <div>Review Concept Explanation</div>}
      </div>
      <Button onClick={handleNextStep}>Next Step</Button>
    </>
  );
}
