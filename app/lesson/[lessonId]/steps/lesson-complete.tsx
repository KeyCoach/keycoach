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
            <p className="text-xl text-center px-6">
              Congratulations! You've successfully finished this lesson.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="flex h-56 w-full items-center justify-center gap-6 py-4">
            <div className="w-1/3 flex justify-center">
              <Image 
                src="/img/Strong-Mascot.png" 
                alt="KeyCoach Mascot" 
                width={400} 
                height={400} 
                priority 
              />
            </div>
            <div className="flex h-40 w-1/2 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 p-6 shadow-md text-black dark:text-white">
              Great job! Keep practicing to improve your typing skills even more.
            </div>
          </div>
        </FadeInSection>

        <FadeInSection delay={400}>
          <div className="flex w-full items-center justify-center mt-4">
            <Link href="/lesson">
              <Button>Back to Lessons</Button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}