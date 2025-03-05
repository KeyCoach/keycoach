import { Button } from "@/components/button";
import { useLessonContext } from "../lesson-context";

// app/lesson/[lessonId]/ConceptExplanation.tsx
export function ConceptExplanation() {
  const { handleNextStep } = useLessonContext();
  // TODO: write something here
  return (
    <>
      <div>
        <h1>Concept Explanation</h1>
        <p>Some concept explanation</p>
      </div>
      <Button onClick={handleNextStep}>Next Step</Button>
    </>
  );
}
