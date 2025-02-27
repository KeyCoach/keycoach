import p5 from "p5";
import { RefObject } from "react";

export type Test = {
  id: string;
  src: string;
  author: string;
  textBody: string;
  charCount: number;
  wordCount: number;
  difficulty: number;
};

export enum Letter {
  Correct = "Correct",
  WrongLetter = "WrongLetter",
  WrongFinger = "WrongFinger",
  Missing = "Missing",
}

export type Word = {
  word: string;
  inputs: {
    key: string;
    id: string;
    status: Letter;
    time: number;
  }[];
};

export type KeyStroke = {
  time: number;
  correctFinger: string;
  pressedFinger: string;
  correctLetter: string;
  pressedLetter: string;
  modelConfidence: number;
};

export type DbAttempt = {
  id: string;
  testId: string;
  email?: string;
  cameraActivated: boolean;
  accuracy: number;
  fingerAccuracy: number;
  wpm: number;
  userInput: Word[];
  mistakes: Mistake[];
  duration: number;
  date: number;
  keyStrokes?: KeyStroke[];
};

export type Attempt = DbAttempt & {
  test: Test;
};

export type User = {
  id: string;
  email: string;
  fname: string;
  lname: string;
};

export type DbUser = User & {
  passwordHash: string;
};

export type Errors = {
  [key: string]: {
    code: string;
    message: string;
    details?: string;
    status: number;
  };
};

type Finger = {
  x: number;
  y: number;
};

export type Hands = {
  l_thumb: null | Finger;
  l_index: null | Finger;
  l_middle: null | Finger;
  l_ring: null | Finger;
  l_pinky: null | Finger;
  r_thumb: null | Finger;
  r_index: null | Finger;
  r_middle: null | Finger;
  r_ring: null | Finger;
  r_pinky: null | Finger;
};

export type KeyPosition = {
  key: string;
  correctFingers: string[];
  x: number;
  y: number;
  positionSet: boolean;
  isLongKey?: boolean;
};

export type HandTrackContextType = {
  showVideo: boolean;
  cameraActivated: boolean;
  keyPositionsSet: boolean;
  setKeyPositionsSet: React.Dispatch<React.SetStateAction<boolean>>;
  modelReady: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  detectHands: RefObject<handposeCallback>;
  setCameraActivated: React.Dispatch<React.SetStateAction<boolean>>;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawFunction: React.Dispatch<React.SetStateAction<(p: p5, capture: p5.Element) => void>>;
  keyPositions: KeyPosition[][];
  setKeyPositions: React.Dispatch<React.SetStateAction<KeyPosition[][]>>;
};

export type handposeCallback = (callback: (hands: Hands) => void) => void;

export type Mistake = {
  key: string;
  time: number;
  status: Letter;
};
