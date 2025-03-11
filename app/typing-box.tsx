import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LoadingPage } from "@/components";
import { KeyPosition, Letter, Mistake, MistakeType, Test, TestType, Word } from "@/app/lib/types";
import { v4 as uuidv4 } from "uuid";
import {
  HandleBackspace,
  HandleCtrlBackspace,
  HandleNormalKey,
  HandleSpace,
  InvalidKey,
  normalKeys,
  TestIsComplete,
  UpdateFingerTechnique,
} from "@/app/hand-tracking";
import { useHandTracking } from "@/app/hand-track-context";
import axios from "@/app/axios-client";
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
  testType,
  duration = Infinity,
}: {
  test: Test;
  onTestComplete: OnTestCompleteCallback;
  setNetWpm?: React.Dispatch<React.SetStateAction<number>>;
  setGrossWpm?: React.Dispatch<React.SetStateAction<number>>;
  setAccuracy?: React.Dispatch<React.SetStateAction<number>>;
  setFingerAccuracy?: React.Dispatch<React.SetStateAction<number>>;
  testType: TestType;
  duration: number;
}) {
  const [scrollTranslate, setScrollTranslate] = useState(0);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const testId = test.id;

  const { keyPositionsSet, settingUp, modelReady, keyPositions, detectHands, cameraActivated } =
    useHandTracking();
  const sentence = useMemo(() => test.textBody.split(" "), [test.textBody]);

  const [sendingRequest, setSendingRequest] = useState(false);
  const [testStart, setTestStart] = useState(0);
  const [userInput, setUserInput] = useState<Word[]>([{ word: sentence[0], inputs: [] }]);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const testEnd = testStart + duration * 1000;

  const userInputRef = useRef(userInput);
  const testFinished = TestIsComplete(userInput, sentence, testType, duration, testStart);
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
        const currLetter = currWord.word[currWord.inputs.length] ?? " ";
        const status = currLetter !== key ? Letter.Wrong : Letter.Correct;

        if (key === " ") {
          if (currWord.inputs.length !== currWord.word.length) {
            setMistakes((prev) => [
              ...prev,
              {
                wordIndex: userInput.length - 1,
                letterIndex: currWord.inputs.length,
                key: currLetter,
                time: timeSinceStart,
                type: MistakeType.Missing,
              },
            ]);
          }
        } else if (status === Letter.Wrong) {
          setMistakes((prev) => [
            ...prev,
            {
              wordIndex: userInput.length - 1,
              letterIndex: currWord.inputs.length,
              key: currLetter,
              time: timeSinceStart,
              type: MistakeType.Wrong,
            },
          ]);
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
    [sentence, testStart, userInputRef, testFinished, userInput],
  );

  useEffect(() => {
    setTestStart(0);
    setUserInput([{ word: sentence[0], inputs: [] }]);
    setMistakes([]);
    setTimeRemaining(duration);
    setScrollTranslate(0);
  }, [duration, sentence, testType]);

  useEffect(() => {
    if (!testStart) return;
    const interval = setInterval(() => {
      const timeRemaining = Math.max(0, Math.round((testEnd - Date.now()) / 1000));
      setTimeRemaining(timeRemaining);
    }, 100);
    return () => clearInterval(interval);
  }, [testStart, testEnd]);

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

      const newAttempt: Record<string, any> = {
        testId,
        attemptId,
        duration: Date.now() - testStart,
        userInput,
        mistakes,
        cameraActivated,
      };

      if (testType === TestType.Timed) {
        const newTest = { ...test };
        newTest.textBody = userInput.map((word) => word.word).join(" ");
        newTest.wordCount = newTest.textBody.split(" ").length;
        newTest.charCount = newTest.textBody.split("").length;
        newAttempt.test = newTest;
      } else if (testType === TestType.Words) {
        const newTest = { ...test };
        newTest.duration = null;
        newAttempt.test = newTest;
      }

      await axios.post("/api/attempt", newAttempt);

      onTestComplete(attemptId, userInput, mistakes, testStart, Date.now());
    }
    if (testFinished && !sendingRequest) {
      completeTest();
    }
  }, [
    test,
    duration,
    testType,
    testFinished,
    onTestComplete,
    userInput,
    sendingRequest,
    mistakes,
    testStart,
    testId,
    cameraActivated,
  ]);

  useEffect(() => {
    if (!cursorRef.current || !scrollAnchorRef.current) {
      return;
    }

    const scrollAnchorHeight =
      scrollAnchorRef.current.getBoundingClientRect().bottom -
      scrollAnchorRef.current.getBoundingClientRect().top;

    const scrollAreaMidY =
      scrollAnchorRef.current.getBoundingClientRect().top + scrollAnchorHeight / 2;

    const cursorScrollDist = cursorRef.current.getBoundingClientRect().top - scrollAreaMidY;
    console.log(cursorScrollDist);

    if (cursorScrollDist > 0) {
      setScrollTranslate((prev) => prev - cursorScrollDist);
    }
  }, [userInput]);

  if ((cameraSetup && !modelReady) || sendingRequest) {
    return <LoadingPage />;
  }

  if (testFinished) {
    return <LoadingPage />;
  }

  const letterClasses = {
    correct: "text-slate-900 dark:text-slate-50",
    wrong: "text-red-500 dark:text-red-400",
    missing: "text-slate-400",
    wrongFinger: "text-yellow-600 dark:text-yellow-400",
  };
  const wrongWordClass = "underline decoration-red-400";

  // TODO: make the typing box scroll with the cursor
  return (
    <div className="h-fit w-full max-w-7xl overflow-hidden rounded-lg bg-slate-100 p-8 dark:bg-slate-900">
      <div className="relative" ref={scrollAnchorRef}>
        <div className="mb-6 flex justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>Words: {sentence.length}</span>
          {test.author && <span>Author: {test.author}</span>}
          {testType === TestType.Timed && <span>Time Left: {timeRemaining} s</span>}
        </div>

        <div className="relative mb-8 max-h-[320px] min-h-[320px] overflow-hidden rounded-lg p-6 font-mono text-3xl leading-relaxed">
          <p
            className="absolute whitespace-pre-wrap text-slate-900 dark:text-slate-50"
            style={{ transform: `translateY(${scrollTranslate}px)` }}
          >
            {/*  words they have typed */}
            {userInput.map((word, i) => (
              <span key={i}>
                <span className="inline-block">
                  {word.inputs.map((input, j) => {
                    let letterClass = "";
                    if (input.status === Letter.Wrong) {
                      letterClass = letterClasses.wrong;
                    } else if (input.status === Letter.Missing) {
                      letterClass = letterClasses.missing;
                    } else if (input.correctFinger === false) {
                      // uses "=== false" to exclude null (null means no finger data)
                      letterClass = letterClasses.wrongFinger;
                    } else {
                      letterClass = letterClasses.correct;
                    }

                    const correctWord = word.inputs.every(
                      (input) => input.status === Letter.Correct && input.correctFinger !== false,
                    );

                    const wrongWord = correctWord ? "" : wrongWordClass;
                    return (
                      // letters they've typed so far
                      <span
                        key={"letter" + i + "," + j}
                        kc-id="letter"
                        className={` ${letterClass} ${wrongWord}`}
                      >
                        {input.key}
                      </span>
                    );
                  })}
                  {/* their cursor */}
                  <span ref={cursorRef}>
                    {/* ref for cursor that doesn't animate and do weird stuff */}
                  </span>
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
