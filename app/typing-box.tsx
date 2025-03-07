import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LoadingPage } from "@/components";
import { KeyPosition, Letter, Mistake, MistakeType, Test, Word } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";
import { normalKeys, UpdateFingerTechnique } from "@/app/hand-tracking";
import { useHandTracking } from "@/app/hand-track-context";
import axios from "axios";
import { CalculateStats } from "@/utils/calculate-stats";

export type OnTestCompleteCallback = (
  attemptId: string,
  userInput: Word[],
  mistakes: Mistake[],
  testStart: number,
  testEnd: number,
) => void;

export default function TypingBox({
  test,
  onTestComplete,
  setNetWpm,
  setGrossWpm,
  setAccuracy,
  setFingerAccuracy,
}: {
  test: Test;
  onTestComplete: OnTestCompleteCallback;
  setNetWpm?: React.Dispatch<React.SetStateAction<number>>;
  setGrossWpm?: React.Dispatch<React.SetStateAction<number>>;
  setAccuracy?: React.Dispatch<React.SetStateAction<number>>;
  setFingerAccuracy?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const testId = test.id;
  const { keyPositionsSet, settingUp, modelReady, keyPositions, detectHands, cameraActivated } =
    useHandTracking();
  const sentence = useMemo(() => test.textBody.split(" "), [test.textBody]);

  const [sendingRequest, setSendingRequest] = useState(false);
  const [testStart, setTestStart] = useState(0);
  const [userInput, setUserInput] = useState<Word[]>([{ word: sentence[0], inputs: [] }]);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  const userInputRef = useRef(userInput);
  const testFinished = TestIsComplete(userInput, sentence);
  const cameraSetup = keyPositionsSet && cameraActivated;

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
        const status = currLetter !== key ? Letter.Wrong : Letter.Correct;

        if (key === " ") {
          if (currWord.inputs.length !== currWord.word.length) {
            setMistakes((prev) => [
              ...prev,
              { key, time: timeSinceStart, type: MistakeType.Missing },
            ]);
          }
        } else if (status === Letter.Wrong) {
          setMistakes((prev) => [...prev, { key, time: timeSinceStart, type: MistakeType.Wrong }]);
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

    const { grossWpm, netWpm, accuracy, fingerAccuracy } = CalculateStats(
      userInput,
      mistakes,
      Date.now() - testStart,
    );
    setNetWpm?.(netWpm);
    setGrossWpm?.(grossWpm);
    setAccuracy?.(accuracy);
    setFingerAccuracy?.(fingerAccuracy);
  }, [
    test,
    testStart,
    userInput,
    setGrossWpm,
    mistakes,
    setNetWpm,
    setAccuracy,
    setFingerAccuracy,
  ]);

  // Setup camera and key listeners. Runs once on mount
  useEffect(() => {
    if (!cameraSetup) {
      const keyPressListener = (e: KeyboardEvent) => {
        if (settingUp) return;
        if (InvalidKey(e, keyPositions)) return;
        e.preventDefault();
        const id = uuidv4();
        const timeSinceStart = testStart ? Date.now() - testStart : 0;
        onKeyPress(e.key, e.ctrlKey, id, timeSinceStart);
      };

      window.addEventListener("keydown", keyPressListener);

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

    const keyPressListener = (e: KeyboardEvent) => {
      if (settingUp) return;
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
    };

    window.addEventListener("keydown", keyPressListener);

    return () => {
      window.removeEventListener("keydown", keyPressListener);
    };
  }, [testStart, cameraSetup, keyPositions, onKeyPress, detectHands, settingUp]);

  useEffect(() => {
    async function completeTest() {
      console.log("test finished");
      const attemptId = uuidv4();
      setSendingRequest(true);

      const body = {
        testId,
        attemptId,
        duration: Date.now() - testStart,
        userInput,
        mistakes,
        cameraActivated,
      };
      await axios.post("/api/attempt", body);

      onTestComplete(attemptId, userInput, mistakes, testStart, Date.now());
    }
    if (testFinished && !sendingRequest) {
      completeTest();
    }
  }, [
    testFinished,
    onTestComplete,
    userInput,
    sendingRequest,
    mistakes,
    testStart,
    testId,
    cameraActivated,
  ]);

  if ((cameraSetup && !modelReady) || sendingRequest) {
    return <LoadingPage />;
  }

  if (testFinished) {
    return <LoadingPage />;
  }

  return (
    <div className="relative h-fit max-w-7xl overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-900">
      <div className="p-8">
        <div className="mb-6 flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>Words: {sentence.length}</span>
          {test.author && <span>Author: {test.author}</span>}
        </div>

        <div className="mb-8 min-h-[200px] rounded-lg p-6 font-mono text-3xl leading-relaxed">
          <p className="whitespace-pre-wrap text-slate-900 dark:text-slate-50">
            {/*  words they have typed */}
            {userInput.map((word, i) => (
              <span key={i}>
                <span className="inline-block">
                  {word.inputs.map((input, j) => {
                    const letterClasses: Record<Letter, string> = {
                      [Letter.Correct]: "text-slate-900 dark:text-slate-50",
                      [Letter.Wrong]: "text-red-500 dark:text-red-400",
                      [Letter.Missing]: "text-slate-400 dark:text-slate-500",
                    };

                    const wrongFingerClass = "text-orange-500 dark:text-orange-400";

                    let letterClass = letterClasses[input.status];
                    if (input.status === Letter.Correct && !input.correctFinger) {
                      letterClass = wrongFingerClass;
                    }

                    const correctWord = word.inputs.every(
                      (input) => input.status === Letter.Correct,
                    );

                    const wrongWordClass = correctWord ? "" : "underline decoration-red-400";
                    return (
                      // letters they've typed so far
                      <span
                        key={"letter" + i + "," + j}
                        kc-id="letter"
                        className={`${letterClasses[input.status]} ${wrongWordClass}`}
                      >
                        {input.key}
                      </span>
                    );
                  })}
                  {/* their cursor */}
                  {i === userInput.length - 1 && (
                    <span className="blink absolute font-bold">⎸</span>
                  )}
                  {/* the rest of the word */}
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
                <span> </span>
              </span>
            ))}

            {/* the rest of the sentence */}
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

        {test.src && (
          <div className="text-right text-sm italic text-slate-600 dark:text-slate-400">
            <p>From "{test.src}"</p>
          </div>
        )}
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
        correctFinger: null,
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
  const status = currLetter !== key ? Letter.Wrong : Letter.Correct;

  currWord.inputs.push({
    id: inputId,
    key: currLetter || key,
    correctFinger: null,
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
    (input) => input.status === Letter.Correct || input.status === Letter.Wrong,
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
