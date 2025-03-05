import { Button } from "@/components/button";
import TypeInvader from "@/components/type-invader/TypeInvader";

export function TypingGame({ handleNextStep }: { handleNextStep: () => void }) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8">
        <TypeInvader />
        <Button onClick={handleNextStep}>Next Step</Button>
      </div>
    </>
  );
}
