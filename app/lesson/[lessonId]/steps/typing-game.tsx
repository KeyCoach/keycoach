import { Button } from "@/components/button";
import { useState } from "react";
import { BufferScreen } from "./buffer-screen";
import dynamic from "next/dynamic";

const TypeInvader = dynamic(() => import("@/components/type-invader/TypeInvader"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

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
