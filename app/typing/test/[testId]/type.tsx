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
      <H1>Typing Test</H1>
      <div>
        <Button onClick={() => setSettingUp(true)}>
          {cameraSetup ? "Recalibrate Camera" : "Set Up Camera"}
        </Button>
      </div>
      Mistakes: {mistakes}
      <div className="font-mono text-xl">
        <p className="inline-block">
          {userInput.map((word, i) => {
            const incorrect = word.inputs.some((input) => input.status !== Letter.Correct);
            const notLastWord = i < userInput.length - 1;
            const redUnderline = incorrect && notLastWord ? "underline decoration-red-400" : "";
            return (
              <span key={"word" + i}>
                <span kc-type="word" className="inline-block">
                  {word.inputs.map((input, j) => {
                    const classes: Record<Letter, string> = {
                      [Letter.Correct]: "text-black",
                      [Letter.WrongLetter]: "text-red-500",
                      [Letter.Missing]: "text-gray-500",
                      [Letter.WrongFinger]: "text-orange-500",
                    };
                    return (
                      <span
                        key={"letter" + i + "," + j}
                        kc-type="letter"
                        className={`${classes[input.status]} ${redUnderline}`}
                      >
                        {input.key}
                      </span>
                    );
                  })}
                  {i === userInput.length - 1 && (
                    <span kc-type="cursor" className="absolute blink font-bold">
                      ⎸
                    </span>
                  )}
                  {word.word
                    ?.slice(word.inputs.length)
                    .split("")
                    .map((letter, j) => (
                      <span
                        key={"ghost-letter" + j}
                        kc-type="ghost-letter"
                        className="text-gray-500 inline-block"
                      >
                        {letter}
                      </span>
                    ))}
                </span>
                <span kc-type="space"> </span>
              </span>
            );
          })}
          {sentence.slice(userInput.length).map((word, i) => (
            <span key={"ghost-word" + i}>
              <span kc-type="ghost-word" className="text-gray-500 inline-block">
                {word}
              </span>
              <span kc-type="space"> </span>
            </span>
          ))}
        </p>
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
