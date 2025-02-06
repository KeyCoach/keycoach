import { Button } from "@/components/button";

// app/lesson/[lessonId]/QuoteTest.tsx
export function QuoteTest({ handleNextStep }: { handleNextStep: () => void }) {
  return (
    <>
      <div>Some quote test</div>
      <Button onClick={handleNextStep}>Next Step</Button>
    </>
  );
}
