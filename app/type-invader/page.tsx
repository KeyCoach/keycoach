import { Stars } from "@/components/stars-background";
import TypeInvaderWrapper from "./type-invader-container";

export default function TypeInvaderPage() {
  const numDots = Math.floor(Math.random() * 25) + 45;
  return (
    <div className="w-text mx-auto mt-12">
      <Stars numDots={numDots} />

      {/* type invader */}
      <div className="overflow-hidden rounded-lg shadow">
        <TypeInvaderWrapper />
      </div>
    </div>
  );
}
