import p5 from "p5";
import { RefObject } from "react";

export type Test = {
  id: string;
  src: string | null;
  author: string | null;
  textBody: string;
  charCount: number;
  wordCount: number;
  difficulty: number;
  type: TestType;
  duration: number | null;
};

export enum Letter {
  Correct = "Correct",
  Wrong = "Wrong",
  Missing = "Missing",
}

export type Word = {
  word: string;
  inputs: {
    key: string;
    id: string;
    correctFinger: boolean | null;
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
  userInput: Word[];
  netWpm: number;
  grossWpm: number;
  mistakes: Mistake[];
  duration: number;
  date: number;
  keyStrokes?: KeyStroke[];
  test?: Test;
};

export type Attempt = DbAttempt & {
  test: Test;
};

export type LessonStats = {
  [stepId: string]: Stat & { cameraActivated: boolean };
};

export type Stat = {
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  fingerAccuracy: number;
};

export type User = {
  id: string;
  email: string;
  fname: string;
  lname: string;
  wpmGoal?: number;
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

export type LessonContextType = {
  lessonPlan: LessonPlan;
  lessonId: string;
  currentStep: Step;
  grossWpm: number;
  netWpm: number;
  acc: number;
  fingerAcc: number;
  avgGrossWpm: number;
  avgNetWpm: number;
  avgAcc: number;
  avgFingerAcc: number;
  stats: LessonStats;
  addStat: (stepId: string, stat: Stat) => void;
  resetStats: () => void;
  goToStep: (step: number) => void;
  currentStepIndex: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
};

export type HandTrackContextType = {
  /** The hand tracking module is setting up */
  settingUp: boolean;
  setSettingUp: React.Dispatch<React.SetStateAction<boolean>>;
  /** The hand tracking module is active */
  cameraActivated: boolean;
  setCameraActivated: React.Dispatch<React.SetStateAction<boolean>>;
  /** The positions of the keys */
  keyPositions: KeyPosition[][];
  setKeyPositions: React.Dispatch<React.SetStateAction<KeyPosition[][]>>;
  /** Key positions have been set */
  keyPositionsSet: boolean;
  setKeyPositionsSet: React.Dispatch<React.SetStateAction<boolean>>;
  /** The model is ready to run (model active, modules loaded) */
  modelReady: boolean;
  /** Function that exposes hand positions */
  detectHands: RefObject<handposeCallback>;
  /** show the video in canvasRef (must assign canvasRef) */
  showVideo: boolean;
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>;
  /** assign this ref to the window where you want the video shown  */
  canvasRef: React.RefObject<HTMLDivElement | null>;
  /** Set function that you want to run with the p5 draw function */
  setDrawFunction: React.Dispatch<React.SetStateAction<(p: p5, capture: p5.Element) => void>>;
};

export type handposeCallback = (callback: (hands: Hands) => void) => void;

export enum MistakeType {
  Wrong = "Wrong",
  Missing = "Missing",
  Technique = "Technique",
}

export type Mistake = {
  key: string;
  wordIndex: number;
  letterIndex: number;
  time: number;
  type: MistakeType;
};

export type LessonPlans = {
  [key: string]: LessonPlan;
};

export type Step = {
  id: string;
  node: React.ReactNode;
  name: string;
  cheer?: string;
};

export type LessonPlan = {
  steps: Step[];
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export enum TestType {
  Words = "Words",
  Quote = "Quote",
  Timed = "Timed",
}

export function ToTestType(testType: string | null): TestType {
  switch (testType) {
    case "Words":
      return TestType.Words;
    case "Quote":
      return TestType.Quote;
    case "Timed":
      return TestType.Timed;
    default:
      return TestType.Words;
  }
}
