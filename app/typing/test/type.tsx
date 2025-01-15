import Button from "@/components/button";
import { H1 } from "@/components/headers";
import { useCallback, useEffect, useMemo, useState } from "react";
import p5 from "p5";
import { KeyPosition, normalKeys, HandsFromTrackingResults } from "./hand-tracking";
import { useRouter } from "next/navigation";
import { startVideo } from "./p5";

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
  setSettingUp,
  cameraSetup,
  keyPositions,
}: {
  setSettingUp: (value: boolean) => void;
  cameraSetup: boolean;
  keyPositions: KeyPosition[][];
}) {
  const sentence = useMemo(
    () => ["The", "quick,", "brown;", "fox", "jumps", "over", "the", "lazy", "dog"],
    [],
  );
  const [userInput, setUserInput] = useState<Word[]>([{ word: sentence[0], inputs: [] }]);

  const router = useRouter();

  const FinishTest = useCallback(() => {
    router.push("/typing/result/1");
  }, [router]);

  const onKeyPress = useCallback(
    (key: string, ctrlKey: boolean) => {
      setUserInput((prev) => {
        if (TestComplete(prev, sentence)) {
          return prev;
        }
        let result = prev;

        if (key === "Backspace") {
          if (ctrlKey) {
            result = HandleCtrlBackspace(prev);
          } else {
            result = HandleBackspace(prev);
          }
        } else if (key === " ") {
          result = HandleSpace(prev, sentence);
        } else if (normalKeys.includes(key)) {
          result = HandleNormalKey(prev, key);
        }
        return result;
      });
    },
    [sentence],
  );

  useEffect(() => {
    if (!cameraSetup) {
      const keyPressListener = (window.onkeydown = (e) => {
        if (e.ctrlKey && e.code !== "Backspace") return;
        if (!keyPositions.flat().some((key) => key.key === e.code)) return;
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
        capture = startVideo(p);

        keyPressListener = window.onkeydown = (e) => {
          if (!validKey(e, keyPositions)) return;
          onKeyPress(e.key, e.ctrlKey);

          function HandDataHandler() {
            // PERF: initializing the handtracking here might come with a performance cost
            window.ml5.handPose().detect(capture, (results: any) => {
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
      const p5 = (await import("p5")).default;
      p = new p5(mainSketch);
    }

    initializeP5();

    return () => {
      window.removeEventListener("keydown", keyPressListener);
      if (capture) capture.remove();
      if (p) p.remove();
    };
  }, [userInput, cameraSetup, keyPositions, onKeyPress]);

  useEffect(() => {
    if (TestComplete(userInput, sentence)) {
      FinishTest();
    }
  }, [userInput, sentence, FinishTest]);

  return (
    <div>
      <H1>Typing Test</H1>
      Camera Setup: {cameraSetup ? "Yes" : "No"}
      <div>
        <Button onClick={() => setSettingUp(true)}>
          {cameraSetup ? "Recalibrate Camera" : "Set Up Camera"}
        </Button>
      </div>
      <div className="font-mono text-xl">
        <p>
          {userInput.map((word, i) => {
            const correctWord = word.inputs.every((input) => input.status === Letter.Correct);
            const wrongWordClass = correctWord ? "" : "underline decoration-red-400";
            return (
              <span key={i}>
                {word.inputs.map((input, j) => {
                  const classes: Record<Letter, string> = {
                    [Letter.Correct]: "text-black",
                    [Letter.WrongLetter]: "text-red-500",
                    [Letter.Missing]: "text-gray-500",
                    [Letter.WrongFinger]: "text-orange-500",
                  };
                  return (
                    <span
                      key={i + "," + j}
                      className={`${classes[input.status]} ${wrongWordClass}`}
                    >
                      {input.key}
                    </span>
                  );
                })}
                {i === userInput.length - 1 && <span className="absolute blink font-bold">⎸</span>}
                {word.word
                  ?.slice(word.inputs.length)
                  .split("")
                  .map((letter, j) => (
                    <span key={j} className="text-gray-500">
                      {letter}
                    </span>
                  )) || ""}
                <span key="space" className="no-underline">
                  &nbsp;
                </span>
              </span>
            );
          })}
          {sentence.slice(userInput.length).map((word, i) => (
            <span key={i} className="text-gray-500">
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function HandleCtrlBackspace(userInput: Word[]) {
  const currWord = userInput.at(-1)!;
  const firstWord = userInput[0].word;
  if (userInput.length > 1) {
    if (currWord.inputs.length > 0) {
      return [...userInput.slice(0, -1)];
    } else {
      const newInput = [...userInput.slice(0, -2)];
      if (newInput.length === 0) {
        return [{ word: firstWord, inputs: [] }];
      }
      return [...userInput.slice(0, -2)];
    }
  }
  return [
    {
      word: firstWord,
      inputs: [],
    },
  ];
}

function HandleBackspace(userInput: Word[]) {
  const currWord = userInput.at(-1)!;
  if (userInput.length === 1 && currWord.inputs.length === 0) {
    return userInput;
  }

  const letterIndex = currWord.inputs.length;
  if (letterIndex === 0 && userInput.length > 1) {
    const newUserInputs = userInput.slice(0, -1);
    while (newUserInputs.at(-1)?.inputs.at(-1)?.status === Letter.Missing) {
      newUserInputs.at(-1)?.inputs.pop();
    }
    return newUserInputs;
  }

  let newInputs = currWord.inputs.slice(0, -1);
  while (newInputs.at(-1)?.status === Letter.Missing) {
    newInputs = newInputs.slice(0, -1);
  }

  return [
    ...userInput.slice(0, -1),
    {
      word: currWord.word,
      inputs: newInputs,
    },
  ];
}

function HandleSpace(userInput: Word[], sentence: string[]) {
  const currWord = userInput.at(-1)!;
  if (currWord.inputs.length === 0) return userInput;
  const lastWord = {
    word: currWord.word,
    inputs: currWord.inputs.concat(
      currWord.word
        .split("")
        .map((letter) => ({
          key: letter,
          status: Letter.Missing,
        }))
        .slice(currWord.inputs.length),
    ),
  };
  const newWord: Word = {
    word: sentence[userInput.length],
    inputs: [],
  };
  return [...userInput.slice(0, -1), lastWord, newWord];
}

function HandleNormalKey(userInput: Word[], key: string) {
  const currWord = userInput.at(-1)!;
  const letterIndex = currWord.inputs.length;
  const wrongLetter = currWord.word[letterIndex] !== key;
  const status = wrongLetter ? Letter.WrongLetter : Letter.Correct;
  let displayKey = key;
  if (status === Letter.WrongLetter) {
    displayKey = currWord.word[letterIndex] || key;
  }

  return [
    ...userInput.slice(0, -1),
    {
      word: currWord.word,
      inputs: [
        ...currWord.inputs,
        {
          key: displayKey,
          status,
        },
      ],
    },
  ];
}

function TestComplete(userInput: Word[], sentence: string[]) {
  if (userInput.length < sentence.length) return false;
  if (userInput.length > sentence.length) return true;
  const lastWord = userInput.at(-1)!;
  if (lastWord.inputs.length < lastWord.word.length) return false;
  return lastWord.inputs.every((input) => input.status === Letter.Correct);
}

function validKey(e: KeyboardEvent, keyPositions: KeyPosition[][]) {
  if (e.ctrlKey && e.code !== "Backspace") return false;
  if (!keyPositions.flat().some((key) => key.key === e.code)) return false;
}
