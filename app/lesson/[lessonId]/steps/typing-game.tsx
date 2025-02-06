import { Button } from "@/components/button";

export function TypingGame({ handleNextStep }: { handleNextStep: () => void }) {
  return (
    <>
      <div>Some typing game</div>
      <Button onClick={handleNextStep}>Next Step</Button>
    </>
  );
}
