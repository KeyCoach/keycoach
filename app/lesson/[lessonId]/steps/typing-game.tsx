import { Button } from "@/design-lib";

// app/lesson/[lessonId]/TypingGame.tsx
export function TypingGame({ handleNextStep }: { handleNextStep: () => void }) {
  return (
    <>
      <div>Some typing game</div>
      <Button onClick={handleNextStep}>Next Step</Button>
    </>
  );
}
