import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import p5 from "p5";
import { KeyPosition, normalKeys, HandsFromTrackingResults } from "./hand-tracking";
import { useRouter } from "next/navigation";
import { startVideo } from "./p5";
import { Button, Loading } from "@/components";
import { Test } from "@/app/lib/types";
import axios from "axios";
import Image from "next/image";

enum Letter {
  Correct = "Correct",
  WrongLetter = "WrongLetter",
  WrongFinger = "WrongFinger",
  Missing = "Missing",
}

type Word = {
  word: string;
  inputs: {
    key: string;
    status: Letter;
  }[];
};

export default function Type({
  test,
  setSettingUp,
  cameraSetup,
  keyPositions,
}: {
  test: Test;
  setSettingUp: Dispatch<SetStateAction<boolean>>;
  cameraSetup: boolean;
  keyPositions: KeyPosition[][];
}) {
  const sentence = useMemo(() => test.textBody.split(" "), [test.textBody]);
  const router = useRouter();
  const testId = test.id;
  const src = test.src;
  const author = test.author;
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [testStart, setTestStart] = useState(0);
  const [userInput, setUserInput] = useState<Word[]>([{ word: sentence[0], inputs: [] }]);
  const userInputRef = useRef(userInput);
  const [mistakes, setMistakes] = useState(0);
  const correctChars = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Correct).length;
  }, 0);

  useEffect(() => {
    if (testStart === 0) return;

    // Update timer
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - testStart) / 1000));
    }, 1000);

    // Calculate WPM
    const totalChars = userInput.reduce((acc, word) => 
      acc + word.inputs.filter(input => input.status !== Letter.Missing).length, 0);
    const minutes = (Date.now() - testStart) / 60000; // Convert ms to minutes
    const newWpm = Math.round((totalChars / 5) / minutes); // Standard WPM calculation (chars/5 / minutes)
    setWpm(minutes > 0 ? newWpm : 0);

    // Calculate accuracy
    const totalAttempts = userInput.reduce((acc, word) => 
      acc + word.inputs.filter(input => input.status !== Letter.Missing).length, 0);
    const newAccuracy = totalAttempts > 0 
      ? ((totalAttempts - mistakes) / totalAttempts) * 100 
      : 100;
    setAccuracy(Math.round(newAccuracy * 10) / 10);

    return () => clearInterval(timer);
  }, [testStart, userInput, mistakes]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  // Logic for finishing the test
  const testFinished = TestIsComplete(userInput, sentence);
  const FinishTest = useCallback(() => {
    axios
      .post("/api/attempt", { testId, correctChars, duration: Date.now() - testStart, mistakes })
      .then((res) => {
        router.push(`/typing/result/${res.data.attemptId}`);
      });
  }, [router, testId, testStart, mistakes, correctChars]);
  useEffect(() => {
    if (testFinished) {
      FinishTest();
    }
  }, [testFinished, FinishTest]);

  // Logic for typing
  const onKeyPress = useCallback(
    (key: string, ctrlKey: boolean) => {
      if (testFinished) {
        return;
      }
      if (normalKeys.includes(key)) {
        if (testStart === 0) {
          setTestStart(Date.now());
        }
        const currWord = userInputRef.current.at(-1)!;

        const currLetter = currWord.word[currWord.inputs.length];
        const status = currLetter !== key ? Letter.WrongLetter : Letter.Correct;

        if (key === " ") {
          if (currWord.inputs.length !== currWord.word.length) {
            setMistakes(
              (prev) => prev + Math.max(0, currWord.word.length - currWord.inputs.length),
            );
          }
        } else if (status === Letter.WrongLetter) {
          setMistakes((prev) => prev + 1);
        }
      }

      setUserInput((prev) => {
        const userInput = JSON.parse(JSON.stringify(prev)); // best way to deep copy. I was getting crazy side effects

        let result = userInput;

        if (key === "Backspace") {
          if (ctrlKey) {
            result = HandleCtrlBackspace(userInput);
          } else {
            result = HandleBackspace(userInput);
          }
        } else if (key === " ") {
          result = HandleSpace(userInput, sentence);
        } else if (normalKeys.includes(key)) {
          result = HandleNormalKey(userInput, key);
        }

        userInputRef.current = result; // NOTE: anywhere you set userInput, you must also set userInputRef.current

        return result;
      });
    },
    [sentence, testStart, userInputRef, testFinished],
  );

  // Setup camera and key listeners. Runs once on mount
  useEffect(() => {
    console.log("setting up camera and key listeners");
    if (!cameraSetup) {
      const keyPressListener = (window.onkeydown = (e) => {
        if (InvalidKey(e, keyPositions)) return;
        e.preventDefault();
        onKeyPress(e.key, e.ctrlKey);
      });

      return () => {
        window.removeEventListener("keydown", keyPressListener);
      };
    }

    const formattedKeyPositions: Record<string, KeyPosition> = {};
    for (const row of keyPositions) {
      for (const key of row) {
        formattedKeyPositions[key.key] = key;
      }
    }
    let p: p5;
    let capture: p5.Element;
    let keyPressListener: any;

    const mainSketch = (p: p5) => {
      p.setup = () => {
        const handPose = window.ml5.handPose();
        capture = startVideo(p);

        keyPressListener = window.onkeydown = (e) => {
          if (InvalidKey(e, keyPositions)) return;
          e.preventDefault();
          onKeyPress(e.key, e.ctrlKey);

          function HandDataHandler() {
            handPose.detect(capture, (results: any) => {
              const hands = HandsFromTrackingResults(results);
              // TODO: implement async hand tracking data handler
              console.log(hands);
            });
          }

          const cameraDelay = 100;
          setTimeout(HandDataHandler, cameraDelay);
        };
      };
    };

    async function initializeP5() {
      console.log("importing p5");
      const p5 = (await import("p5")).default;
      p = new p5(mainSketch);
    }

    initializeP5();

    return () => {
      window.removeEventListener("keydown", keyPressListener);
      if (capture) capture.remove();
      if (p) p.remove();
    };
  }, [cameraSetup, keyPositions, onKeyPress]);

  if (testFinished) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 p-8" >
      <div className="flex justify-between items-center gap-4">
        <Button onClick={() => setSettingUp((prev) => !prev)}>
          {cameraSetup ? "Recalibrate Camera" : "Set up Camera"}
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-200 dark:bg-green-800 p-4 rounded-lg shadow-md flex-1 text-center">
            <h2 className="text-green-700 dark:text-green-300 text-lg font-semibold">WPM</h2>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{wpm}</p>
          </div>
          <div className="bg-cerulean-200 dark:bg-cerulean-800 p-4 rounded-lg shadow-md flex-1 text-center">
            <h2 className="text-cerulean-700 dark:text-cerulean-300 text-lg font-semibold">Accuracy</h2>
            <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-200">{accuracy}%</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mt-6 mx-auto">

        {/* Main typing area */}
        <div className="relative rounded-lg bg-slate-200 dark:bg-slate-900 overflow-hidden">
          <div className="p-8">
            {/* Test info */}
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-6">
              <span>Words: {sentence.length}</span>
              <span>Author: {test.author}</span>
            </div>

            {/* Typing area */}
            <div className="font-mono text-3xl leading-relaxed mb-8 min-h-[200px] p-6 rounded-lg">
              <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-50">
                {userInput.map((word, i) => (
                  <span key={i} className="inline-block">
                    {word.inputs.map((input, j) => (
                      <span
                        key={j}
                        className={
                          input.status === 'Correct'
                            ? 'text-slate-900 dark:text-slate-50'
                            : 'text-red-500 dark:text-red-400'
                        }
                      >
                        {input.key}
                      </span>
                    ))}
                    {i === userInput.length - 1 && (
                      <span kc-id="cursor" className="absolute blink font-bold">
                        ⎸
                      </span>                    )}
                    <span className="text-slate-400 dark:text-slate-500">
                      {word.word.slice(word.inputs.length)}
                    </span>
                    <span> </span>
                  </span>
                ))}
                <span className="text-slate-400 dark:text-slate-500">
                  {sentence.slice(userInput.length).join(' ')}
                </span>
              </p>
            </div>

            {/* Source citation */}
            <div className="text-right italic text-sm text-slate-600 dark:text-slate-400">
              <p>From "{test.src}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Delete the entire last word.
 *
 * If the last word has at least one letter, delete the word
 *
 * If the last word has no letters, delete the word, the space before it, and the word before that
 */
function HandleCtrlBackspace(userInput: Word[]) {
  const currWord = userInput.at(-1)!;
  const firstWord = userInput[0].word;

  if (currWord.inputs.length === 0) {
    userInput = userInput.slice(0, -1);
  }

  if (userInput.length === 0) {
    return [{ word: firstWord, inputs: [] }];
  }

  userInput.at(-1)!.inputs = [];

  return userInput;
}

/**
 * Delete the last letter of the last word.
 *
 * If the last word has no letters, delete the word, the space before it, and any missing letters before that.
 */
function HandleBackspace(userInput: Word[]) {
  const currWord = userInput.at(-1)!;

  if (userInput.length === 1 && currWord.inputs.length === 0) {
    return userInput;
  }

  if (currWord.inputs.length === 0 && userInput.length > 1) {
    userInput = userInput.slice(0, -1);
    while (userInput.at(-1)?.inputs.at(-1)?.status === Letter.Missing) {
      userInput.at(-1)?.inputs.pop();
    }
  } else {
    userInput.at(-1)!.inputs.pop();
  }

  return userInput;
}

/**
 * Add a space to move the user to the next word.
 *
 * Do nothing if they haven't typed anything yet.
 * */
function HandleSpace(userInput: Word[], sentence: string[]) {
  const currWord = userInput.at(-1)!;
  if (currWord.inputs.length === 0) return userInput;

  // Show shadow of missing letters
  currWord.inputs.push(
    ...currWord.word
      .split("")
      .map((letter) => ({
        key: letter,
        status: Letter.Missing,
      }))
      .slice(currWord.inputs.length),
  );

  userInput.push({
    word: sentence[userInput.length],
    inputs: [],
  });

  return userInput;
}

/**
 * Add a letter to the last word. Determine if the letter is correct or not.
 * */
function HandleNormalKey(userInput: Word[], key: string) {
  const currWord = userInput.at(-1)!;

  const currLetter = currWord.word[currWord.inputs.length];
  const status = currLetter !== key ? Letter.WrongLetter : Letter.Correct;

  currWord.inputs.push({
    key: currLetter || key,
    status,
  });
  return userInput;
}

function TestIsComplete(userInput: Word[], sentence: string[]) {
  if (userInput.length < sentence.length) return false;
  if (userInput.length > sentence.length) return true;
  const lastWord = userInput.at(-1)!;
  if (lastWord.inputs.length < lastWord.word.length) return false;
  return lastWord.inputs.every((input) => input.status === Letter.Correct);
}

function InvalidKey(e: KeyboardEvent, keyPositions: KeyPosition[][]) {
  if (e.ctrlKey && e.code !== "Backspace") {
    return true;
  }

  if (!keyPositions.flat().some((key) => key.key === e.code)) {
    return true;
  }
}
