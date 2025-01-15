export function ProcessHandTrackingResults(results: any) {
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
    // NOTE: not sure why, but it totally gets the hands wrong. Awkward...
    if (hand.handedness === "Right") {
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

export type Hands = {
  l_thumb: null | {
    x: number;
    y: number;
  };
  l_index: null | {
    x: number;
    y: number;
  };
  l_middle: null | {
    x: number;
    y: number;
  };
  l_ring: null | {
    x: number;
    y: number;
  };
  l_pinky: null | {
    x: number;
    y: number;
  };
  r_thumb: null | {
    x: number;
    y: number;
  };
  r_index: null | {
    x: number;
    y: number;
  };
  r_middle: null | {
    x: number;
    y: number;
  };
  r_ring: null | {
    x: number;
    y: number;
  };
  r_pinky: null | {
    x: number;
    y: number;
  };
};

export type KeyPosition = {
  key: string;
  correctFingers: string[];
  x: number;
  y: number;
  positionSet: boolean;
  isLongKey?: boolean;
};

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
