import { Hands, KeyPosition, Letter, Mistake, MistakeType, TestType, Word } from "@/app/lib/types";
import { Dispatch, SetStateAction } from "react";

/** Reformats hand tracking results */
export function HandsFromTrackingResults(results: any) {
  const hands: Hands = {
    l_thumb: null,
    l_index: null,
    l_middle: null,
    l_ring: null,
    l_pinky: null,
    r_thumb: null,
    r_index: null,
    r_middle: null,
    r_ring: null,
    r_pinky: null,
  };

  results.forEach((hand: any) => {
    if (hand.handedness === "Left") {
      hands.l_thumb = { x: hand.thumb_tip.x, y: hand.thumb_tip.y };
      hands.l_index = { x: hand.index_finger_tip.x, y: hand.index_finger_tip.y };
      hands.l_middle = { x: hand.middle_finger_tip.x, y: hand.middle_finger_tip.y };
      hands.l_ring = { x: hand.ring_finger_tip.x, y: hand.ring_finger_tip.y };
      hands.l_pinky = { x: hand.pinky_finger_tip.x, y: hand.pinky_finger_tip.y };
    } else {
      hands.r_thumb = { x: hand.thumb_tip.x, y: hand.thumb_tip.y };
      hands.r_index = { x: hand.index_finger_tip.x, y: hand.index_finger_tip.y };
      hands.r_middle = { x: hand.middle_finger_tip.x, y: hand.middle_finger_tip.y };
      hands.r_ring = { x: hand.ring_finger_tip.x, y: hand.ring_finger_tip.y };
      hands.r_pinky = { x: hand.pinky_finger_tip.x, y: hand.pinky_finger_tip.y };
    }
  });

  return hands;
}

/** Adds a new key position to list of keys. Performs regression to line up and space keys */
export function AddNewKey(keyCode: string, hands: any, keyPositions: KeyPosition[][]) {
  // Update the key positions with the new hand positions
  for (const row of keyPositions) {
    for (const key of row) {
      if (key.key === keyCode) {
        key.x = hands.r_index?.x ?? hands.l_index?.x;
        key.y = hands.r_index?.y ?? hands.l_index?.y;
        key.positionSet = true;
      }
    }
  }

  // Extrapolate the rest of the key positions
  const trendLines = CalculateTrendLines(keyPositions);
  return CalculateTunedKeyPositions(keyPositions, trendLines);
}

/** Runs linear regression for each row */
function CalculateTrendLines(keyPositions: KeyPosition[][]) {
  const regressionResults = [];
  for (const row of keyPositions.slice(0, 5)) {
    let xSum = 0;
    let ySum = 0;
    let xSquaredSum = 0;
    let xySum = 0;
    let keyCount = 0;
    for (const key of row) {
      if (key.x === 0 && key.y === 0) continue;
      keyCount++;
      xSum += key.x;
      ySum += key.y;
      xSquaredSum += key.x ** 2;
      xySum += key.x * key.y;
    }
    const slope = (keyCount * xySum - xSum * ySum) / (keyCount * xSquaredSum - xSum ** 2);
    const yIntercept = (ySum - slope * xSum) / keyCount;
    regressionResults.push([yIntercept, slope]);
  }
  return regressionResults;
}

/** Fits key positions to trendline, and spaces keys evenly */
function CalculateTunedKeyPositions(keyPositions: KeyPosition[][], trendLines: number[][]) {
  const fittedKeyPositions = FitKeyPositions(keyPositions, trendLines);
  const spacedKeyPositions = SpaceKeyPositions(fittedKeyPositions);
  return spacedKeyPositions;
}

/** Fit the key positions to the trend lines */
function FitKeyPositions(keyPositions: KeyPosition[][], trendLines: number[][]): KeyPosition[][] {
  const fittedKeyPositions = [];

  for (let rowNum = 0; rowNum < 5; rowNum++) {
    fittedKeyPositions[rowNum] = [];
    const row = keyPositions[rowNum];
    const [yIntercept, slope] = trendLines[rowNum];
    if (Number.isNaN(yIntercept) || Number.isNaN(slope)) {
      fittedKeyPositions[rowNum] = [...row];
      continue;
    }
    for (let keyNum = 0; keyNum < row.length; keyNum++) {
      const key = row[keyNum];
      const [x, y] = GetClosestPointOnLine(key.x, key.y, slope, yIntercept);
      fittedKeyPositions[rowNum][keyNum] = { ...key, x, y };
    }
  }

  return fittedKeyPositions;
}

function GetClosestPointOnLine(x1: number, y1: number, m: number, b: number) {
  const x = (y1 + x1 / m - b) / (m + 1 / m);
  const y = m * x + b;
  return [x, y];
}

/** Space the keys evenly between the first and last key */
function SpaceKeyPositions(fittedKeyPositions: KeyPosition[][]): KeyPosition[][] {
  const spacedKeyPositions = [...fittedKeyPositions];
  for (let rowNum = 0; rowNum < 4; rowNum++) {
    const row = spacedKeyPositions[rowNum];
    const firstKey = row.find((key) => !key.isLongKey && key.positionSet);
    const lastKey = row.toReversed().find((key) => !key.isLongKey && key.positionSet);
    if (!firstKey || !lastKey || firstKey === lastKey) continue;
    const firstKeyIndex = row.indexOf(firstKey);
    const lastKeyIndex = row.indexOf(lastKey);
    const xDistance = lastKey.x - firstKey.x;
    const yDistance = lastKey.y - firstKey.y;
    const avgXDistance = xDistance / (lastKeyIndex - firstKeyIndex);
    const avgYDistance = yDistance / (lastKeyIndex - firstKeyIndex);
    for (const key of row) {
      if (key.isLongKey) continue;
      key.x = firstKey.x + avgXDistance * (row.indexOf(key) - row.indexOf(firstKey));
      key.y = firstKey.y + avgYDistance * (row.indexOf(key) - row.indexOf(firstKey));
      key.positionSet = true;
    }
  }
  return spacedKeyPositions;
}

export const defaultKeyPositions: KeyPosition[][] = [
  // Digit row
  [
    { key: "Backquote", correctFingers: ["l_pinky"] },
    { key: "Digit1", correctFingers: ["l_pinky"] },
    { key: "Digit2", correctFingers: ["l_ring"] },
    { key: "Digit3", correctFingers: ["l_middle"] },
    { key: "Digit4", correctFingers: ["l_index"] },
    { key: "Digit5", correctFingers: ["l_index"] },
    { key: "Digit6", correctFingers: ["r_index"] },
    { key: "Digit7", correctFingers: ["r_index"] },
    { key: "Digit8", correctFingers: ["r_middle"] },
    { key: "Digit9", correctFingers: ["r_ring"] },
    { key: "Digit0", correctFingers: ["r_pinky"] },
    { key: "Minus", correctFingers: ["r_pinky"] },
    { key: "Equal", correctFingers: ["r_pinky"] },
    { key: "Backspace", correctFingers: ["r_pinky"], isLongKey: true },
  ],
  // Top row
  [
    { key: "Tab", correctFingers: ["l_pinky"], isLongKey: true },
    { key: "KeyQ", correctFingers: ["l_pinky"] },
    { key: "KeyW", correctFingers: ["l_ring"] },
    { key: "KeyE", correctFingers: ["l_middle"] },
    { key: "KeyR", correctFingers: ["l_index"] },
    { key: "KeyT", correctFingers: ["l_index"] },
    { key: "KeyY", correctFingers: ["r_index"] },
    { key: "KeyU", correctFingers: ["r_index"] },
    { key: "KeyI", correctFingers: ["r_middle"] },
    { key: "KeyO", correctFingers: ["r_ring"] },
    { key: "KeyP", correctFingers: ["r_pinky"] },
    { key: "BracketLeft", correctFingers: ["r_pinky"] },
    { key: "BracketRight", correctFingers: ["r_pinky"] },
    { key: "Backslash", correctFingers: ["r_pinky"], isLongKey: true },
  ],
  // Home row
  [
    { key: "CapsLock", correctFingers: ["l_pinky"], isLongKey: true },
    { key: "KeyA", correctFingers: ["l_pinky"] },
    { key: "KeyS", correctFingers: ["l_ring"] },
    { key: "KeyD", correctFingers: ["l_middle"] },
    { key: "KeyF", correctFingers: ["l_index"] },
    { key: "KeyG", correctFingers: ["l_index"] },
    { key: "KeyH", correctFingers: ["r_index"] },
    { key: "KeyJ", correctFingers: ["r_index"] },
    { key: "KeyK", correctFingers: ["r_middle"] },
    { key: "KeyL", correctFingers: ["r_ring"] },
    { key: "Semicolon", correctFingers: ["r_pinky"] },
    { key: "Quote", correctFingers: ["r_pinky"] },
    { key: "Enter", correctFingers: ["r_pinky"], isLongKey: true },
  ],
  // Bottom row
  [
    { key: "ShiftLeft", correctFingers: ["l_pinky"], isLongKey: true },
    { key: "KeyZ", correctFingers: ["l_pinky"] },
    { key: "KeyX", correctFingers: ["l_ring"] },
    { key: "KeyC", correctFingers: ["l_middle"] },
    { key: "KeyV", correctFingers: ["l_index"] },
    { key: "KeyB", correctFingers: ["l_index"] },
    { key: "KeyN", correctFingers: ["r_index"] },
    { key: "KeyM", correctFingers: ["r_index"] },
    { key: "Comma", correctFingers: ["r_middle"] },
    { key: "Period", correctFingers: ["r_ring"] },
    { key: "Slash", correctFingers: ["r_pinky"] },
    { key: "ShiftRight", correctFingers: ["r_pinky"], isLongKey: true },
  ],
  // Space row
  [
    { key: "ControlLeft", correctFingers: ["l_pinky"], isLongKey: true },
    { key: "AltLeft", correctFingers: ["l_thumb"], isLongKey: true },
    { key: "Space", correctFingers: ["r_thumb", "l_thumb"], isLongKey: true },
    { key: "AltRight", correctFingers: ["r_thumb"], isLongKey: true },
    { key: "ControlRight", correctFingers: ["r_pinky"], isLongKey: true },
  ],
  // Other Keys
  [
    { key: "Escape", correctFingers: ["l_pinky"] },
    { key: "Delete", correctFingers: ["*"] },
    { key: "End", correctFingers: ["*"] },
    { key: "PageDown", correctFingers: ["*"] },
    { key: "PageUp", correctFingers: ["*"] },
    { key: "Home", correctFingers: ["*"] },
    { key: "Insert", correctFingers: ["*"] },
    { key: "ArrowLeft", correctFingers: ["*"] },
    { key: "ArrowDown", correctFingers: ["*"] },
    { key: "ArrowUp", correctFingers: ["*"] },
    { key: "ArrowRight", correctFingers: ["*"] },
  ],
].map((row) => row.map((key) => ({ ...key, x: 0, y: 0, positionSet: false })));

export function UpdateFingerTechnique(
  key: string,
  keyCode: string,
  inputId: string,
  hands: Hands,
  keyPositions: Record<string, KeyPosition>,
  timeSinceStart: number,
  setUserInput: Dispatch<SetStateAction<Word[]>>,
  setMistakes: Dispatch<SetStateAction<Mistake[]>>,
) {
  if (!keyPositions[keyCode]) return;
  if (!keyPositions[keyCode].positionSet) return;

  const fingerDistances: Record<string, number> = {};

  Object.entries(hands).forEach(([finger_name, finger_coords]) => {
    if (!finger_coords) return;
    const distance = Math.sqrt(
      (finger_coords.x - keyPositions[keyCode].x) ** 2 +
        (finger_coords.y - keyPositions[keyCode].y) ** 2,
    );
    fingerDistances[finger_name] = distance;
  });

  const closestFinger = { fingerName: "", distance: Infinity };
  Object.entries(fingerDistances).forEach(([fingerName, distance]) => {
    if (distance < closestFinger.distance) {
      closestFinger.fingerName = fingerName;
      closestFinger.distance = distance;
    }
  });

  if (closestFinger.fingerName === "") {
    console.error("No fingers detected");
  }
  const correctFingers = keyPositions[keyCode].correctFingers;

  const usedCorrectFinger = UsedCorrectFinger(fingerDistances, correctFingers, keyPositions);

  let wordIndex: number;
  let letterIndex: number;

  setUserInput((prev) => {
    const userInput: Word[] = JSON.parse(JSON.stringify(prev));

    wordIndex = userInput.length - 1;
    letterIndex = userInput.at(-1)!.inputs.length;

    for (const word of userInput) {
      for (const letter of word.inputs) {
        if (letter.id === inputId && letter.status === Letter.Correct) {
          letter.correctFinger = usedCorrectFinger;
        }
      }
    }

    return userInput;
  });

  if (!usedCorrectFinger) {
    setMistakes((prev) => [
      ...prev,
      {
        wordIndex,
        letterIndex,
        key,
        time: timeSinceStart,
        type: MistakeType.Technique,
      },
    ]);
  }
}

function UsedCorrectFinger(
  fingerDistances: Record<string, number>,
  correctFingers: string[],
  keyPositions: Record<string, KeyPosition>,
) {
  const fCoords = keyPositions["KeyF"];
  const gCoords = keyPositions["KeyG"];
  const keyDistance = Math.sqrt((fCoords.x - gCoords.x) ** 2 + (fCoords.y - gCoords.y) ** 2);
  console.log(keyDistance);
  const usedCorrectFinger = correctFingers.some(
    (fingerName) => fingerDistances[fingerName] < keyDistance * 1.2,
  );
  return usedCorrectFinger;
}

/**
 * Delete the entire last word.
 *
 * If the last word has at least one letter, delete the word
 *
 * If the last word has no letters, delete the word, the space before it, and the word before that
 */
export function HandleCtrlBackspace(userInput: Word[]) {
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
export function HandleBackspace(userInput: Word[]) {
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
export function HandleSpace(
  userInput: Word[],
  sentence: string[],
  inputId: string,
  timePressed: number,
) {
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
export function HandleNormalKey(
  userInput: Word[],
  key: string,
  inputId: string,
  timePressed: number,
) {
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

export function TestIsComplete(
  userInput: Word[],
  sentence: string[],
  testType: TestType,
  duration = 0,
  testStart = 0,
) {
  if (testType === TestType.Timed) {
    if (Date.now() - testStart > duration * 1000 && userInput.length > 1) {
      return true;
    }
  }

  if (userInput.length < sentence.length) return false;
  if (userInput.length > sentence.length) return true;
  const lastWord = userInput.at(-1)!;
  if (lastWord.inputs.length < lastWord.word.length) return false;
  return lastWord.inputs.every(
    (input) => input.status === Letter.Correct || input.status === Letter.Wrong,
  );
}

export function InvalidKey(e: KeyboardEvent, keyPositions: KeyPosition[][]) {
  if (e.ctrlKey && e.code !== "Backspace") {
    return true;
  }

  if (!keyPositions.flat().some((key) => key.key === e.code)) {
    return true;
  }
}

export const normalKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "{",
  "]",
  "}",
  ";",
  ":",
  "'",
  '"',
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
  "\\",
  "|",
  "`",
  "~",
  " ",
];
