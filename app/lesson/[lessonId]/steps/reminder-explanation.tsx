"use client";

import { Button } from "@/components/button";
import { useLessonContext } from "../lesson-context";
import { FadeInSection } from "@/components/fade-in-section";
import Image from "next/image";

// app/lesson/[lessonId]/steps/quick-reminder-explanation.tsx
export function ReminderExplanation() {
  const { handleNextStep, lessonId } = useLessonContext();
  
  // Get just the key tips based on the lessonId
  const keyTips = getKeyTips(lessonId);
  
  return (
    <div className="h-page flex items-center justify-center py-8">
      <div className="grid w-full max-w-5xl auto-rows-auto gap-8">
        <FadeInSection delay={0}>
          <div className="flex min-h-[80px] flex-col items-center justify-center gap-4 rounded-2xl py-4 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
            <h1 className="text-3xl font-bold">Quick Reminder: '{lessonId.toUpperCase()}' Key</h1>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[250px]">
            {/* Mascot Side */}
            <div className="md:w-2/5 flex flex-col items-center justify-center">
              <div className="relative h-82 w-82 mb-4">
                <Image
                  src="/img/Teaching-Mascot.png"
                  alt="KeyCoach Mascot"
                  width={400}
                  height={400}
                  priority
                />                
              </div>
              <div className="bg-cerulean-50 dark:bg-cerulean-800 p-4 rounded-xl shadow-md max-w-xs">
                <p className="text-lg">Let's quickly review the '{lessonId}' key before we continue your practice!</p>
              </div>
            </div>
            
            {/* Reminder Content Side */}
            <div className="md:w-3/5">
              <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-cerulean-700 dark:text-cerulean-300 mb-4">
                  Key Tips for the '{lessonId.toUpperCase()}' Key
                </h2>
                
                <ul className="list-disc pl-5 text-lg space-y-2 mb-6">
                  {keyTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
                
                {/* Compact keyboard visualization - simplified version */}
                <div className="my-4 p-3 bg-gray-100 dark:bg-slate-800 rounded-lg flex justify-center">
                  <div className="w-12 h-12 rounded flex items-center justify-center text-xl font-bold border-4 border-cerulean-500 bg-cerulean-100 dark:bg-cerulean-800">
                    {lessonId.toUpperCase()}
                  </div>
                </div>
                
                {/* Navigation button */}
                <div className="flex justify-end mt-6">
                  <Button onClick={handleNextStep}>Continue Practice</Button>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

// Function to get key tips
function getKeyTips(key: string): string[] {
  const tipsMap: {[key: string]: string[]} = {
    "a": [
      "Press with your left pinky finger",
      "Keep your wrist stable when typing",
      "Return to home position immediately after pressing"
    ],
    "s": [
      "Press with your left ring finger",
      "Practice common combinations like 'st', 'sh', and 'sp'",
      "Use minimal movement for better speed"
    ],
    "d": [
      "Press with your left middle finger",
      "Keep other fingers in position while typing",
      "Practice words with the common 'ed' ending"
    ],
    "f": [
      "Press with your left index finger",
      "Feel for the raised bump to guide hand positioning",
      "Keep your wrist stable when typing"
    ],
    "g": [
      "Reach slightly right with your left index finger",
      "Return to 'F' position after typing",
      "Keep other fingers stable when reaching"
    ],
    "h": [
      "Reach slightly left with your right index finger",
      "Practice common digraphs like 'th', 'ch', and 'sh'",
      "Keep your right hand anchored at the home position"
    ],
    "j": [
      "Press with your right index finger",
      "Use the raised bump for touch typing guidance",
      "Practice alternating between left and right hand keys"
    ],
    "k": [
      "Press with your right middle finger",
      "Practice straight downward movement",
      "Work on common combinations like 'ck' and 'sk'"
    ],
    "l": [
      "Press with your right ring finger",
      "Practice common endings like '-ly' and '-al'",
      "Keep your wrist stable when typing"
    ],
    "q": [
      "Reach up with your left pinky from 'A'",
      "Practice the 'qu' combination",
      "Return to home position quickly"
    ],
    "w": [
      "Reach up with your left ring finger from 'S'",
      "Practice common words starting with 'w'",
      "Return to home position after typing"
    ],
    "e": [
      "Reach up with your left middle finger from 'D'",
      "Focus on smooth transitions when typing",
      "Practice this very common letter in different word positions"
    ],
    "r": [
      "Reach up with your left index finger from 'F'",
      "Practice common 'r' combinations",
      "Keep other fingers positioned while reaching"
    ]
  };

  // Return the tips for the requested key, or default tips if not found
  return tipsMap[key.toLowerCase()] || [
    `Use the correct finger position for the '${key}' key`,
    "Focus on accuracy before speed",
    "Return to the home row position after each keystroke"
  ];
}