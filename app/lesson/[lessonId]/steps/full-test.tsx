import { Button } from "@/design-lib";

// app/lesson/[lessonId]/FullTest.tsx
export function FullTest({
  testType,
  handleNextStep,
}: {
  testType: string;
  handleNextStep: () => void;
}) {
  return (
    <>
      <div>
        {testType === "1 min" && <div>1 minute test</div>}
        {testType === "3 min" && <div>3 minute test</div>}
      </div>
      <Button onClick={handleNextStep}>Next Step</Button>
    </>
  );
}
