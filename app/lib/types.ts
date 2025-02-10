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
  accuracy: number;
  fingerAccuracy: number;
  wpm: number;
  mistakesCount: number;
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
