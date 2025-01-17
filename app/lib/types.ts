export type Test = {
  id: string;
  src: string;
  author: string;
  text: string;
  charCount: number;
  wordCount: number;
};

export type Attempt = {
  id: string;
  email?: string;
  testId: string;
  accuracy: number;
  wpm: number;
  timeStamp: number;
};

export type User = {
  email: string;
  fname: string;
  lname: string;
};

export type DbUser = User & {
  passwordHash: string;
};
