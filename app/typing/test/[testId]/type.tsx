import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LoadingPage } from "@/components";
import { KeyPosition, Letter, Mistake, Test, Word } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";
import { normalKeys, UpdateFingerTechnique } from "@/app/hand-tracking";
import { useHandTracking } from "@/app/hand-track-context";
import axios from "axios";

export default function Type({
  test,
  setSettingUp,
}: {
  test: Test;
  setSettingUp: Dispatch<SetStateAction<boolean>>;
  cameraSetup: boolean;
}) {
  const { keyPositionsSet, modelReady, keyPositions, detectHands, cameraActivated } =
    useHandTracking();
  const sentence = useMemo(() => test.textBody.split(" "), [test.textBody]);
  const router = useRouter();

  const [wpm, setWpm] = useState(0);
  const [testStart, setTestStart] = useState(0);
  const [userInput, setUserInput] = useState<Word[]>([{ word: sentence[0], inputs: [] }]);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [accuracy, setAccuracy] = useState(100);

  const userInputRef = useRef(userInput);
  const correctChars = userInput.reduce((acc, word) => {
    return acc + word.inputs.filter((input) => input.status === Letter.Correct).length;
  }, 0);
  const testId = test.id;
  const testFinished = TestIsComplete(userInput, sentence);
  const cameraSetup = keyPositionsSet && cameraActivated;

  /** Logic to be executed on test completion */
  const FinishTest = useCallback(() => {
    const body = {
      testId,
      correctChars,
      duration: Date.now() - testStart,
      userInput,
      mistakes,
      cameraActivated,
    };
    axios.post("/api/attempt", body).then((res) => {
      router.push(`/typing/result/${res.data.attemptId}`);
    });
  }, [router, userInput, cameraActivated, testId, testStart, mistakes, correctChars]);

  /** handle key presses. Add, edit, and delete recorded keys */
  const onKeyPress = useCallback(
    (key: string, ctrlKey: boolean, inputId: string, timeSinceStart: number) => {
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
            setMistakes((prev) => [...prev, { key, time: timeSinceStart, status }]);
          }
        } else if (status === Letter.WrongLetter) {
          setMistakes((prev) => [...prev, { key, time: timeSinceStart, status }]);
        }
      }

      setUserInput((prev) => {
        const userInput = JSON.parse(JSON.stringify(prev));
        let result = userInput;

        if (key === "Backspace") {
          if (ctrlKey) {
            result = HandleCtrlBackspace(userInput);
          } else {
            result = HandleBackspace(userInput);
          }
        } else if (key === " ") {
          result = HandleSpace(userInput, sentence, inputId, timeSinceStart);
        } else if (normalKeys.includes(key)) {
          result = HandleNormalKey(userInput, key, inputId, timeSinceStart);
        }

        userInputRef.current = result;
        return result;
      });
    },
    [sentence, testStart, userInputRef, testFinished],
  );

  /** keep onscreen user metrics up to date */
  useEffect(() => {
    if (testStart === 0) return;

    const totalChars = userInput.reduce(
      (acc, word) => acc + word.inputs.filter((input) => input.status !== Letter.Missing).length,
      0,
    );
    const minutes = (Date.now() - testStart) / 60000;
    const newWpm = Math.round(totalChars / 5 / minutes);
    setWpm(minutes > 0 ? newWpm : 0);
    const totalAttempts = userInput.reduce(
      (acc, word) => acc + word.inputs.filter((input) => input.status !== Letter.Missing).length,
      0,
    );
    const newAccuracy =
      totalAttempts > 0 ? ((totalAttempts - mistakes.length) / totalAttempts) * 100 : 100;
    setAccuracy(Math.round(newAccuracy * 10) / 10);
  }, [testStart, userInput, mistakes]);

  // Setup camera and key listeners. Runs once on mount
  useEffect(() => {
    if (!cameraSetup) {
      const keyPressListener = (window.onkeydown = (e) => {
        if (InvalidKey(e, keyPositions)) return;
        e.preventDefault();
        const id = uuidv4();
        const timeSinceStart = testStart ? Date.now() - testStart : 0;
        onKeyPress(e.key, e.ctrlKey, id, timeSinceStart);
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

    const keyPressListener = (window.onkeydown = (e) => {
      if (InvalidKey(e, keyPositions)) return;
      e.preventDefault();
      const id = uuidv4();
      const timeSinceStart = testStart ? Date.now() - testStart : 0;
      onKeyPress(e.key, e.ctrlKey, id, timeSinceStart);

      function HandDataHandler() {
        detectHands.current((hands) => {
          UpdateFingerTechnique(
            e.key,
            e.code,
            id,
            hands,
            formattedKeyPositions,
            timeSinceStart,
            setUserInput,
            setMistakes,
          );
        });
      }
      const cameraDelay = 120;

      setTimeout(HandDataHandler, cameraDelay);
    });

    return () => {
      window.removeEventListener("keydown", keyPressListener);
    };
  }, [testStart, cameraSetup, keyPositions, onKeyPress, detectHands]);

  useEffect(() => {
    if (testFinished) {
      console.log("Test Finished");
      FinishTest();
    }
  }, [testFinished, FinishTest]);

  if (cameraSetup && !modelReady) {
    return <LoadingPage />;
  }

  if (testFinished) {
    return <LoadingPage />;
  }

  return (
    <div className="h-page p-4 bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between gap-4">
        <Button onClick={() => setSettingUp((prev) => !prev)}>
          {cameraSetup ? "Recalibrate Camera" : "Set up Camera"}
        </Button>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex-1 rounded-lg bg-green-200 p-4 text-center shadow-md dark:bg-green-800">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">WPM</h2>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{wpm}</p>
          </div>
          <div className="flex-1 rounded-lg bg-cerulean-200 p-4 text-center shadow-md dark:bg-cerulean-800">
            <h2 className="text-lg font-semibold text-cerulean-700 dark:text-cerulean-300">
              Accuracy
            </h2>
            <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-200">
              {accuracy}%
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl">
        <div className="relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-900">
          <div className="p-8">
            <div className="mb-6 flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Words: {sentence.length}</span>
              <span>Author: {test.author}</span>
            </div>

            <div className="mb-8 min-h-[200px] rounded-lg p-6 font-mono text-3xl leading-relaxed">
              <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-50">
                {userInput.map((word, i) => (
                  <span key={i} className="inline-block">
                    {word.inputs.map((input, j) => {
                      const classes: Record<Letter, string> = {
                        [Letter.Correct]: "text-slate-900 dark:text-slate-50",
                        [Letter.WrongLetter]: "text-red-500 dark:text-red-400",
                        [Letter.WrongFinger]: "text-orange-500 dark:text-orange-400",
                        [Letter.Missing]: "text-slate-400 dark:text-slate-500",
                      };
                      const correctWord = word.inputs.every(
                        (input) => input.status === Letter.Correct,
                      );
                      const wrongWordClass = correctWord ? "" : "underline decoration-red-400";
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
                      <span className="blink absolute font-bold">⎸</span>
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
                    <span> </span>
                  </span>
                ))}
                {sentence.slice(userInput.length).map((word, i) => (
                  <span key={"ghost-word" + i}>
                    <span kc-id="ghost-word" className="inline-block text-slate-400">
                      {word}
                    </span>
                    <span kc-id="space"> </span>
                  </span>
                ))}
              </p>
            </div>

            <div className="text-right text-sm italic text-slate-600 dark:text-slate-400">
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
function HandleSpace(userInput: Word[], sentence: string[], inputId: string, timePressed: number) {
  const currWord = userInput.at(-1)!;
  if (currWord.inputs.length === 0) return userInput;

  // Show shadow of missing letters
  currWord.inputs.push(
    ...currWord.word
      .split("")
      .map((letter) => ({
        id: inputId,
        key: letter,
        status: Letter.Missing,
        time: timePressed,
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
function HandleNormalKey(userInput: Word[], key: string, inputId: string, timePressed: number) {
  const currWord = userInput.at(-1)!;

  const currLetter = currWord.word[currWord.inputs.length];
  const status = currLetter !== key ? Letter.WrongLetter : Letter.Correct;

  currWord.inputs.push({
    id: inputId,
    key: currLetter || key,
    status,
    time: timePressed,
  });
  return userInput;
}

function TestIsComplete(userInput: Word[], sentence: string[]) {
  if (userInput.length < sentence.length) return false;
  if (userInput.length > sentence.length) return true;
  const lastWord = userInput.at(-1)!;
  if (lastWord.inputs.length < lastWord.word.length) return false;
  return lastWord.inputs.every(
    (input) => input.status === Letter.Correct || input.status === Letter.WrongFinger,
  );
}

function InvalidKey(e: KeyboardEvent, keyPositions: KeyPosition[][]) {
  if (e.ctrlKey && e.code !== "Backspace") {
    return true;
  }

  if (!keyPositions.flat().some((key) => key.key === e.code)) {
    return true;
  }
}
