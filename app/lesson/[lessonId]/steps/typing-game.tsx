import { Button } from "@/components/button";
import TypingAsteroids from "@/components/type-invader/TypingAsteroids";

export function TypingGame({ handleNextStep }: { handleNextStep: () => void }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <TypingAsteroids />
        <Button onClick={handleNextStep}>Next Step</Button>
      </div>
    </>
  );
}
