import { KeysType } from "../types/types";

export const KEYBOARD_LAYOUT: string[][] = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["caps lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "enter"],
  ["left shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "/", "right shift"],
];

export const KEYS: KeysType = {
  "": { name: "", width: 1, row: 2, pressed: false },
  "`": { name: "`", width: 1, row: 2, pressed: false },
  "1": { name: "1", width: 1, row: 2, pressed: false },
  "2": { name: "2", width: 1, row: 2, pressed: false },
  "3": { name: "3", width: 1, row: 2, pressed: false },
  "4": { name: "4", width: 1, row: 2, pressed: false },
  "5": { name: "5", width: 1, row: 2, pressed: false },
  "6": { name: "6", width: 1, row: 2, pressed: false },
  "7": { name: "7", width: 1, row: 2, pressed: false },
  "8": { name: "8", width: 1, row: 2, pressed: false },
  "9": { name: "9", width: 1, row: 2, pressed: false },
  "0": { name: "0", width: 1, row: 2, pressed: false },
  "-": { name: "-", width: 1, row: 2, pressed: false },
  "=": { name: "=", width: 1, row: 2, pressed: false },
  backspace: { name: "", width: 1.5, row: 2, pressed: false },
  tab: { name: "tab", width: 1.4, row: 3, pressed: false },
  "\\": { name: "", width: 1, row: 3, pressed: false },
  "caps lock": { name: "caps lock", width: 1.8, row: 4, pressed: false },
  enter: { name: "enter", width: 1.8, row: 4, pressed: false },
  "left shift": { name: "left shift", width: 2, row: 5, pressed: false },
  "right shift": { name: "right shift", width: 2, row: 5, pressed: false },
  // "left ctrl": { name: "left ctrl", width: 1, row: 6, pressed: false },
  // "left fn": { name: "left fn", width: 1, row: 6, pressed: false },
  // "left alt": { name: "left alt", width: 1, row: 6, pressed: false },
  windows: { name: "windows", width: 1.2, row: 6, pressed: false },
  space: { name: "space", width: 5, row: 6, pressed: false }
  // "right alt": { name: "right alt", width: 1.2, row: 6, pressed: false },
  // "right fn": { name: "right fn", width: 1, row: 6, pressed: false },
  // "right ctrl": { name: "right ctrl", width: 1, row: 6, pressed: false },
} as const;