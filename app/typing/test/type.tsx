import Button from "@/components/button";
import { H1 } from "@/components/headers";
import { useCallback, useEffect, useMemo, useState } from "react";
import p5 from "p5";
import { KeyPosition, normalKeys, ProcessHandTrackingResults } from "./keyboardUtils";

// TODO: Make the test actually end

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

  const onKeyPress = useCallback(
    (keyCode: string, key: string, ctrlKey: boolean) => {
      if (key === "Backspace") {
        if (ctrlKey) {
          // Delete the whole last word
          setUserInput((prev) => {
            const currWord = prev.at(-1)!;
            if (prev.length > 1) {
              if (currWord.inputs.length > 0) {
                return [...prev.slice(0, -1)];
              } else {
                const newInput = [...prev.slice(0, -2)];
                if (newInput.length === 0) {
                  return [{ word: sentence[0], inputs: [] }];
                }
                return [...prev.slice(0, -2)];
              }
            }
            return [
              {
                word: sentence[0],
                inputs: [],
              },
            ];
          });
        } else {
          // Delete the last letter
          setUserInput((prev) => {
            const currWord = prev.at(-1)!;
            if (prev.length === 1 && currWord.inputs.length === 0) {
              return prev;
            }

            const letterIndex = currWord.inputs.length;
            if (letterIndex === 0 && prev.length > 1) {
              const newUserInputs = prev.slice(0, -1);
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
              ...prev.slice(0, -1),
              {
                word: currWord.word,
                inputs: newInputs,
              },
            ];
          });
        }
      } else if (keyCode === "Space") {
        // Start next word
        setUserInput((prev) => {
          const currWord = prev.at(-1)!;
          if (currWord.inputs.length === 0) return prev;
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
            word: sentence[prev.length],
            inputs: [],
          };
          return [...prev.slice(0, -1), lastWord, newWord];
        });
      } else if (normalKeys.includes(key)) {
        // Add the letter to the current word
        setUserInput((prev) => {
          const currWord = prev.at(-1)!;
          const letterIndex = currWord.inputs.length;
          const wrongLetter = currWord.word[letterIndex] !== key;
          const status = wrongLetter ? Letter.WrongLetter : Letter.Correct;
          let displayKey = key;
          if (status === Letter.WrongLetter) {
            displayKey = currWord.word[letterIndex];
          }

          return [
            ...prev.slice(0, -1),
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
        });
      }
    },
    [sentence],
  );

  useEffect(() => {
    if (!cameraSetup) {
      const keyPressListener = (window.onkeydown = (e) => {
        if (e.ctrlKey && e.code !== "Backspace") return;
        if (!keyPositions.flat().some((key) => key.key === e.code)) return;
        onKeyPress(e.code, e.key, e.ctrlKey);
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
        capture = p.createCapture("video");
        const cameraDelay = 100;
        capture.size(640, 480);
        capture.hide();

        keyPressListener = window.onkeydown = (e) => {
          if (e.ctrlKey && e.code !== "Backspace") return;
          if (!keyPositions.flat().some((key) => key.key === e.code)) return;
          onKeyPress(e.code, e.key, e.ctrlKey);

          function HandDataHandler() {
            handPose.detect(capture, (results: any) => {
              const hands = ProcessHandTrackingResults(results);
              // TODO: implement async hand tracking data handler
              console.log(hands);
            });
          }

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

  return (
    <div>
      <H1>Typing Test</H1>
      Camera Setup: {cameraSetup ? "Yes" : "No"}
      {!cameraSetup && (
        <div>
          <Button onClick={() => setSettingUp(true)}>Setup Camera</Button>
        </div>
      )}
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
                  .slice(word.inputs.length)
                  .split("")
                  .map((letter, j) => (
                    <span key={j} className="text-gray-500">
                      {letter}
                    </span>
                  ))}
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
