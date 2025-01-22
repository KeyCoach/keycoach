import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import p5 from "p5";
import { KeyPosition, normalKeys, HandsFromTrackingResults } from "./hand-tracking";
import { useRouter } from "next/navigation";
import { startVideo } from "./p5";
import { Button, H1, Loading } from "@/design-lib";
import { Test } from "@/app/lib/types";
import axios from "axios";

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
  const [testStart, setTestStart] = useState(0);
  const [userInput, setUserInput] = useState<Word[]>([{ word: sentence[0], inputs: [] }]);
  const userInputRef = useRef(userInput);
  const [mistakes, setMistakes] = useState(0);
  const correctChars = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Correct).length;
  }, 0);

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
    <div>
      <Button onClick={() => setSettingUp((prev) => !prev)}>
        {cameraSetup ? "Recalibrate Camera" : "Set up Camera"}
      </Button>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="border-4 border-gray-300 rounded-lg p-10 w-full max-w-6xl">
          {/* <div className="mb-6 text-center">
          <H1 className="text-4xl font-extrabold mb-4">Typing Test</H1>
        </div> */}
          <div className="font-mono text-4xl text-left mb-6 leading-relaxed">
            <p className="whitespace-pre-wrap">
              {userInput.map((word, i) => {
                const correctWord = word.inputs.every((input) => input.status === Letter.Correct);
                const wrongWordClass = correctWord ? "" : "underline decoration-red-400";
                return (
                  <span key={i}>
                    <span kc-id="word" className="inline-block">
                      {word.inputs.map((input, j) => {
                        const classes: Record<Letter, string> = {
                          [Letter.Correct]: "text-black",
                          [Letter.WrongLetter]: "text-red-500",
                          [Letter.Missing]: "text-slate-400",
                          [Letter.WrongFinger]: "text-orange-500",
                        };
                        return (
                          <span
                            key={"letter" + i + "," + j}
                            kc-id="letter"
                            className={`${classes[input.status]} ${wrongWordClass}`}
                          >
                            {input.key}
                          </span>
                        );
                      })}
                      {i === userInput.length - 1 && (
                        <span kc-id="cursor" className="absolute blink font-bold">
                          ⎸
                        </span>
                      )}
                      {word.word
                        ?.slice(word.inputs.length)
                        .split("")
                        .map((letter, j) => (
                          <span
                            key={"ghost-letter" + j}
                            kc-id="ghost-letter"
                            className="text-slate-400"
                          >
                            {letter}
                          </span>
                        ))}
                    </span>

                    <span kc-id="space"> </span>
                  </span>
                );
              })}
              {sentence.slice(userInput.length).map((word, i) => (
                <span key={"ghost-wrod" + i}>
                  <span kc-id="ghost-word" className="text-slate-400">
                    {word}
                  </span>
                  <span kc-id="space"> </span>
                </span>
              ))}
            </p>
          </div>
          <div className="text-right text-sm font-serif italic text-black-700">
            <p>{`An excerpt from \"${src}\" by ${author}`}</p>
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
