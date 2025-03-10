import { Stars } from "@/components/stars-background";
import TypeInvaderWrapper from "./type-invader-container";

export default function TypeInvaderPage() {
  const numDots = Math.floor(Math.random() * 25) + 45;
  return (
    <div className="h-page relative">
      <Stars numDots={numDots} />
      <div className="w-text mx-auto pt-12">
        <div className="overflow-hidden rounded-lg shadow">
          <TypeInvaderWrapper />
        </div>
      </div>
    </div>
  );
}
