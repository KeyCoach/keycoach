"use client";

import { Button } from "@/components/button";
import { useLessonContext } from "../lesson-context";
import { FadeInSection } from "@/components/fade-in-section";
import Image from "next/image";
import { useState } from "react";
import { Divider } from "@/components";

// Define types for our key explanations
interface KeyExplanation {
  fingerPosition: string;
  importance: string;
  tips: string[];
}

type ExplanationsMap = {
  [key: string]: KeyExplanation;
};

// app/lesson/[lessonId]/ConceptExplanation.tsx
export function ConceptExplanation() {
  const { handleNextStep, lessonId } = useLessonContext();
  const [currentStep, setCurrentStep] = useState(0);

  // Get the key information based on the lessonId
  const keyInfo = getKeyExplanation(lessonId);

  // Steps for the guided explanation
  const steps = [
    {
      title: "Finger Position",
      content: keyInfo.fingerPosition,
      mascotMessage: `Hi there! I'm going to help you learn the '${lessonId}' key. First, let's make sure your finger is in the right position!`,
    },
    {
      title: "Why It's Important",
      content: keyInfo.importance,
      mascotMessage: `Great job! Now, let me tell you why mastering the '${lessonId}' key is so important for your typing journey.`,
    },
    {
      title: "Tips for Success",
      content: (
        <ul className="list-disc space-y-2 pl-5 text-lg">
          {keyInfo.tips.map((tip: string, index: number) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      ),
      mascotMessage: `You're doing fantastic! Here are some tips to help you master the '${lessonId}' key more quickly.`,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Define a more compact keyboard layout - just the keys we need
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
  ];

  // Find row containing target key
  const getTargetRow = () => {
    const targetKey = lessonId.toLowerCase();
    for (let i = 0; i < keyboardRows.length; i++) {
      if (keyboardRows[i].includes(targetKey)) {
        return i;
      }
    }
    return 1; // Default to home row if not found
  };

  return (
    <div className="h-page flex items-center justify-center py-8">
      <div className="grid w-full max-w-5xl auto-rows-auto gap-8">
        <FadeInSection delay={0}>
          <div className="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-2xl bg-slate-200 py-4 shadow-md dark:bg-slate-800 dark:shadow-slate-600">
            <h1 className="text-3xl font-bold">Learning the '{lessonId.toUpperCase()}' Key</h1>
            <p className="max-w-2xl text-center text-xl">
              Master the '{lessonId}' key to improve your typing speed and accuracy
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={200}>
          <div className="flex min-h-[350px] flex-col items-center justify-between gap-8 md:flex-row">
            {/* Mascot Side */}
            <div className="flex flex-col items-center justify-center md:w-2/5">
              <div className="h-82 w-82 relative mb-4">
                <Image
                  src="/img/Teaching-Mascot.png"
                  alt="KeyCoach Mascot"
                  width={400}
                  height={400}
                  priority
                />
              </div>
              <div className="max-w-xs rounded-xl bg-cerulean-200 p-4 shadow-md dark:bg-cerulean-800">
                <p className="text-lg">{steps[currentStep].mascotMessage}</p>
              </div>
            </div>

            {/* Lesson Content Side */}
            <div className="md:w-3/5">
              <div className="rounded-xl bg-slate-100 p-6 shadow-md dark:bg-slate-700">
                <div className="mb-4 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cerulean-600 font-bold text-white">
                    {currentStep + 1}
                  </div>
                  <h2 className="ml-3 text-2xl font-semibold text-cerulean-700 dark:text-cerulean-300">
                    {steps[currentStep].title}
                  </h2>
                </div>

                <div className="my-6 text-lg">
                  {typeof steps[currentStep].content === "string" ? (
                    <p>{steps[currentStep].content}</p>
                  ) : (
                    steps[currentStep].content
                  )}
                </div>

                {/* Compact Keyboard visualization */}
                {currentStep === 0 && (
                  <div className="my-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
                    <div className="mb-2 text-center text-sm font-semibold uppercase text-slate-600 dark:text-slate-300">
                      Keyboard Visualization
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center">
                        {keyboardRows.map((row, rowIndex) => (
                          <div key={rowIndex} className="mb-1 flex">
                            {row.map((key) => (
                              <div
                                key={key}
                                className={`mx-0.5 flex h-8 w-8 items-center justify-center rounded border-2 text-xs ${
                                  key === lessonId.toLowerCase()
                                    ? "border-cerulean-500 bg-cerulean-100 font-bold dark:bg-cerulean-800"
                                    : "border-gray-300 dark:border-gray-600"
                                }`}
                              >
                                {key.toUpperCase()}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {/* Navigation buttons */}
                <div className="mt-8 flex justify-between">
                  {currentStep === 0 ? (
                    <div></div>
                  ) : (
                    <Button onClick={prevStep} disabled={currentStep === 0}>
                      Previous
                    </Button>
                  )}

                  {currentStep < steps.length - 1 ? (
                    <Button onClick={nextStep}>Continue</Button>
                  ) : (
                    <Button onClick={handleNextStep}>Start Practicing</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}

// Function to get explanation for each key
function getKeyExplanation(key: string): KeyExplanation {
  const explanations: ExplanationsMap = {
    a: {
      fingerPosition:
        "The 'A' key should be pressed with your left pinky finger. When your hands are at the home row position (ASDF JKL;), your left pinky rests on the 'A' key.",
      importance:
        "The letter 'A' is the second most common letter in the English language. Learning to type it efficiently with your pinky finger builds strength in your weakest finger and improves overall typing speed for common words.",
      tips: [
        "Keep your wrist stable and move only your pinky finger to press the key",
        "Practice typing words with frequent 'A' usage like 'and', 'all', and 'amazing'",
        "Return to the home position immediately after pressing the key",
      ],
    },
    s: {
      fingerPosition:
        "The 'S' key should be pressed with your left ring finger. Your left ring finger naturally rests on this key in the home row position.",
      importance:
        "The 'S' is the 8th most common letter in English, appearing at the beginning of many words and as a plural marker. Mastering this key will significantly improve your typing flow.",
      tips: [
        "Practice the slight downward motion needed to press the key firmly",
        "Work on common 's' combinations like 'st', 'sh', and 'sp'",
        "Focus on minimal movement - just press down without moving your hand position",
      ],
    },
    d: {
      fingerPosition:
        "The 'D' key should be pressed with your left middle finger. This finger naturally rests on this key in the home row position.",
      importance:
        "The 'D' is a commonly used consonant that begins many English words. Strong command of this key improves your ability to type frequent words like 'do', 'day', and 'different'.",
      tips: [
        "Keep your other fingers in position while pressing the 'D' key",
        "Practice words with 'd' in different positions (start, middle, end)",
        "Work on the 'ed' ending which is very common in English",
      ],
    },
    f: {
      fingerPosition:
        "The 'F' key should be pressed with your left index finger. This is a home row key, and your left index finger should rest on it by default.",
      importance:
        "The 'F' key is not only important for typing words with 'f', but it's also a tactile guide for hand positioning. The small bump on this key helps you find the home row without looking.",
      tips: [
        "Feel for the raised bump on the key to confirm your hand position",
        "Practice transitioning between 'F' and nearby keys like 'G', 'R', and 'V'",
        "Keep your wrist stable and use just your index finger to press the key",
      ],
    },
    g: {
      fingerPosition:
        "The 'G' key should be pressed with your left index finger by reaching slightly to the right from its home position on the 'F' key.",
      importance:
        "The 'G' key requires your index finger to leave its home position temporarily, building finger independence and dexterity. This movement pattern is essential for faster typing.",
      tips: [
        "Practice the quick movement from 'F' to 'G' and back to 'F'",
        "Keep your other fingers in place while your index finger reaches for 'G'",
        "Use 'G' in common words like 'good', 'great', and 'going' for practice",
      ],
    },
    h: {
      fingerPosition:
        "The 'H' key should be pressed with your right index finger by reaching slightly to the left from its home position on the 'J' key.",
      importance:
        "The 'H' is a frequent consonant in English, appearing in many common words and in the 'th' digraph. Mastering this key improves your overall typing speed for everyday communication.",
      tips: [
        "Focus on the small leftward movement from 'J' to 'H'",
        "Practice common combinations like 'th', 'ch', and 'sh'",
        "Keep your other fingers stable while your index finger reaches for 'H'",
      ],
    },
    j: {
      fingerPosition:
        "The 'J' key should be pressed with your right index finger. This is a home row key, and your right index finger should rest on it by default.",
      importance:
        "Like the 'F' key, 'J' has a small raised bump to help with touch typing. It serves as the anchor for your right hand and proper finger positioning without looking at the keyboard.",
      tips: [
        "Feel for the raised bump to confirm your right hand position",
        "Practice quick alternations between left and right hand keys",
        "Work on building muscle memory by typing words with 'j' like 'just', 'join', and 'journey'",
      ],
    },
    k: {
      fingerPosition:
        "The 'K' key should be pressed with your right middle finger. This finger naturally rests on this key in the home row position.",
      importance:
        "The 'K' key builds right hand dexterity and appears in many common English words. Mastering this key contributes to balanced hand usage while typing.",
      tips: [
        "Focus on pressing straight down without shifting your hand position",
        "Practice common 'k' combinations like 'ck', 'sk', and 'nk'",
        "Work on coordination between both hands with words containing 'k'",
      ],
    },
    l: {
      fingerPosition:
        "The 'L' key should be pressed with your right ring finger. Your right ring finger naturally rests on this key in the home row position.",
      importance:
        "The 'L' is the 11th most common letter in English. It appears in many frequent words and common word endings, making it crucial for fluid typing.",
      tips: [
        "Keep your wrist stable and focus on isolated ring finger movement",
        "Practice common endings like '-ly', '-al', and '-ful'",
        "Work on words where 'l' appears doubled like 'all', 'will', and 'hello'",
      ],
    },
    // Add explanations for other keys
    q: {
      fingerPosition:
        "The 'Q' key should be pressed with your left pinky finger by reaching up from its home position on the 'A' key.",
      importance:
        "While less common than other letters, 'Q' appears in many important English words. Building skill with this key improves your typing fluency for words like 'question', 'quick', and 'quality'.",
      tips: [
        "Focus on the upward movement from 'A' to 'Q' and back to home position",
        "Practice the 'qu' combination which appears in almost all English words with 'q'",
        "Keep your other fingers in position while your pinky reaches up",
      ],
    },
    w: {
      fingerPosition:
        "The 'W' key should be pressed with your left ring finger by reaching up from its home position on the 'S' key.",
      importance:
        "The 'W' is a common letter that begins many English words. Mastering this key improves your typing speed for frequent words like 'with', 'when', and 'work'.",
      tips: [
        "Practice the upward movement from 'S' to 'W'",
        "Work on common 'w' combinations like 'wh', 'ow', and 'ew'",
        "Return to the home row immediately after pressing the key",
      ],
    },
    e: {
      fingerPosition:
        "The 'E' key should be pressed with your left middle finger by reaching up from its home position on the 'D' key.",
      importance:
        "The letter 'E' is the most common letter in the English language. Efficient typing of this key is crucial for overall typing speed and fluency.",
      tips: [
        "Practice the smooth movement from 'D' to 'E'",
        "Work on common 'e' combinations like 'ee', 'es', and 'ed'",
        "Develop muscle memory through practicing words with multiple 'e's",
      ],
    },
    r: {
      fingerPosition:
        "The 'R' key should be pressed with your left index finger by reaching up from its home position on the 'F' key.",
      importance:
        "The 'R' is the 8th most common letter in English. Mastering this key improves your ability to type common words like 'are', 'or', and 'your'.",
      tips: [
        "Focus on the upward reach from 'F' to 'R'",
        "Practice common 'r' combinations like 'tr', 'gr', and 'er'",
        "Keep your other fingers in position while reaching",
      ],
    },
    // Add explanations for the remaining keys as needed
  };

  // Return the explanation for the requested key, or a default if not found
  return (
    explanations[key.toLowerCase()] || {
      fingerPosition: `The '${key}' key should be pressed with the appropriate finger while maintaining proper hand positioning.`,
      importance: `Learning to type the '${key}' key efficiently will improve your overall typing speed and accuracy.`,
      tips: [
        "Keep your wrists stable and fingers curved",
        "Focus on accuracy before speed",
        "Return to the home row position after each keystroke",
      ],
    }
  );
}

