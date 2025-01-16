export type Test = {
  id: string;
  src: string;
  author: string;
  text: string;
  charCount: number;
  wordCount: number;
};

export type TestAttempt = {
  id: string;
  userId: string;
  testId: string;
  accuracy: number;
  wpm: number;
};

export type User = {
  email: string;
  fname: string;
  lname: string;
  password: string;
};
