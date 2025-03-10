"use client";
import { useEffect } from "react";
import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Confetti } from "@/components/confetti";
import { FadeInSection } from "@/components/fade-in-section";
import Image from "next/image";

export function LessonComplete() {
  const { triggerConfetti } = Confetti({ confettiAmount: 50 });

  useEffect(() => {
    // Trigger confetti after the component mounts
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 800);

    return () => clearTimeout(timer);
  }, [triggerConfetti]);

  return (
    <div className="h-page flex items-center justify-center px-4">
      <div className="grid w-full max-w-xl auto-rows-auto gap-8">
        <FadeInSection delay={0}>
          <div className="relative flex flex-col items-center justify-center gap-4 rounded-2xl py-8 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
            <h1 className="text-3xl font-bold">Lesson Complete!</h1>
            <p className="px-6 text-center text-xl">
              Congratulations! You've successfully finished this lesson.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="flex h-56 w-full items-center justify-center gap-6 py-4">
            <div className="flex w-1/3 justify-center">
              <Image
                src="/img/Strong-Mascot.png"
                alt="KeyCoach Mascot"
                width={400}
                height={400}
                priority
              />
            </div>
            <div className="flex h-40 w-1/2 items-center justify-center rounded-2xl bg-slate-200 p-6 text-black shadow-md dark:bg-slate-800 dark:text-white">
              Great job! Keep practicing to improve your typing skills even more.
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="mt-4 flex w-full items-center justify-center">
            <Button href="/lesson">Back to Lessons</Button>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

