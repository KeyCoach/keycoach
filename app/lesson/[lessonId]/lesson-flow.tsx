"use client";
import Sidebar from "./sidebar";
import StatsPanel from "./stats-panel";
import { FadeInSection } from "@/components/fade-in-section";
import { useLessonContext } from "./lesson-context";

export function LessonFlow() {
  const { currentStep } = useLessonContext();

  return (
    <div className="h-page relative flex w-full justify-center overflow-hidden">
      <FadeInSection
        direction="right"
        duration="slow"
        distance={50}
        className="absolute left-0 top-1/2 ml-2"
      >
        <Sidebar />
      </FadeInSection>
      <div className="relative w-3/5">{currentStep.node}</div>
      <FadeInSection
        direction="left"
        duration="slow"
        distance={50}
        className="absolute right-0 top-1/2 mr-2"
      >
        <StatsPanel />
      </FadeInSection>
    </div>
  );
}
