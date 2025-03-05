import { Button } from "@/components/button";
import TypeInvader from "@/components/type-invader/TypeInvader";
import { useState } from "react";
import { BufferScreen } from "./buffer-screen";

export function TypingGame() {
  const [testCompleted, setTestCompleted] = useState(false);

  if (testCompleted) {
    return <BufferScreen />;
  }
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8">
        <TypeInvader />
        <Button onClick={() => setTestCompleted(true)}>Next Step</Button>
      </div>
    </>
  );
}
