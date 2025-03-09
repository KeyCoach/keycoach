import { LessonPlans } from "../lib/types";
import { ConceptExplanation } from "./[lessonId]/steps/concept-explanation";
import { ReminderExplanation } from "./[lessonId]/steps/reminder-explanation";
import { LessonComplete } from "./[lessonId]/steps/lesson-complete";
import { QuoteTest } from "./[lessonId]/steps/quote-test";
import { TypingGame } from "./[lessonId]/steps/typing-game";

export const lessonPlans: LessonPlans = {
  a: {
    steps: [
      {
        id: "a2b2b7ac-b3a7-492e-af6c-e2e5f88341c1",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "b92e36e6-00b1-4bf5-86f9-d6e05483cbb3",
        node: <QuoteTest testId="e364a9c6-49d1-4569-8f2d-424f138a50d8" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "b95b47fc-3b81-40e7-84fd-21e373fa7ddd",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "cfcaa52a-ab4a-48a6-b254-99a493ff89eb",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "19ca01b4-bf0d-438f-bdaa-3ce663449294",
        node: <QuoteTest testId="8cc8728f-f8e3-4c1e-b74c-cb2c7fd0a100" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "be39bd3e-54a1-4412-867e-3b048dcbf9b1",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "50cd8b22-4aca-440d-b70f-8529c7894017",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  s: {
    steps: [
      {
        id: "1d291d45-e2b0-4a9b-992e-fd7ee38023dd",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "83e33871-a817-4dba-bdd5-95bffd9774e0",
        node: <QuoteTest testId="7d23f810-a5cc-4e91-b0d7-9f8a54c16e29" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "f3b135b9-f437-44f4-8388-ab0304c5c3d4",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "18dc4e34-78d8-4134-be54-7bf41a0bd028",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "13f41ca5-dff1-47a4-9965-66a1b21b1977",
        node: <QuoteTest testId="93e56a22-fd78-42b3-8aad-75c99eb41083" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "66f67810-4604-4748-a468-a221ad6bb024",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "36efe07e-1080-44a4-bcb8-03ce44597af8",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  d: {
    steps: [
      {
        id: "39bfd15f-9ec7-42cd-9f4d-6dd9afea4cab",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "16b4e720-b1f8-4a9c-ac2b-ab7b9a981b8a",
        node: <QuoteTest testId="6b4c2d67-8935-48de-b1f0-36ad45c98d3a" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "6e7e53d2-a8e8-40e9-b3f8-4d16460d16e4",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "83ce5000-9601-426d-98d7-f20270cd5df9",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "5f4eabbb-ee04-4f39-b636-8711f7a95395",
        node: <QuoteTest testId="a4f7e3d1-b980-4c25-9d76-2e58fc013d41" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "713e9452-2979-4d35-8f64-f0231573208f",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "e983f61f-2568-4128-adb7-af7ac2c93351",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  f: {
    steps: [
      {
        id: "b1e37841-43b8-4b47-bdcb-129069d15648",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "7baced75-015d-40cb-a118-2387b027a1b1",
        node: <QuoteTest testId="9c5b3f8a-2d17-4e06-b4f5-7a29c80f61e5" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "e5f70e9e-4ac0-45a3-9bda-31e94ee57746",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "14b8a213-ad9b-4022-b70a-06244b1f39d1",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "1a5b10e5-8f8f-4322-a399-eb09b2204b4f",
        node: <QuoteTest testId="1d8e7f65-4b32-49af-a0f6-5c92e47f8b9d" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "4e12b279-d08b-47cd-9f40-122a2b2eb658",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "33ee8151-ca40-4aa8-a324-638d781d9376",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  g: {
    steps: [
      {
        id: "7e68dbe2-7baa-4dcb-949e-f9e934fc4c48",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "55297d35-0a53-4247-8c38-f248a7b0f7ae",
        node: <QuoteTest testId="2e8c9g76-5ad3-47bg-91fe-83d4g219c05" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "c31d32d8-d0f0-4fb3-bcca-b74ec7141bae",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "e53d635b-bb10-41bc-b62e-02677c9966e8",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "3beef2fe-1f59-4b95-9a20-8c66f20d946a",
        node: <QuoteTest testId="7f1d4g23-9eb8-40g5-a6c2-1b9d8g354f0" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "9527a528-b8ba-4bc9-b328-aac59718ba29",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "2f38da5a-c98f-4f7b-bc22-adff23d55bb7",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  h: {
    steps: [
      {
        id: "8a44ada4-45f8-41ad-ad4f-cab478f4319e",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "bbd2a554-ed8b-4f8a-b761-cbe5bfb029cd",
        node: <QuoteTest testId="3f9e2h87-6bc4-48ch-a2gd-94e5h320d16" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "5df470d0-efb1-489a-8d7c-b76ec1906425",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "018004ea-eebe-439a-bdfe-246e24d87e4c",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "11e87af3-9329-4886-bfa4-2bfbca93555f",
        node: <QuoteTest testId="8g4d6h34-0fc9-41dh-b3e7-2h509f76ae1" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "36f7264f-9155-4ed2-90c7-b8dd2693501c",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "72f45a28-b690-41b9-b782-5444833685a5",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  j: {
    steps: [
      {
        id: "162af204-b735-4619-b5fd-8ec18d3e13ac",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "d66083e8-9abf-4534-9165-bd804c467da6",
        node: <QuoteTest testId="4g0f3j98-7cd5-49dj-b3he-05f6j431e27" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "c9ecbd7a-3ab9-45d8-b189-0f2a7bc295ad",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "96b8c5b3-e7de-4b56-9bba-c97787e8eb1d",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "e86a7d4b-8d78-481e-8a86-3d2e21b32f64",
        node: <QuoteTest testId="9h5e7j45-1gd0-42ej-c4f8-3j610g87bf2" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "5dabe04b-51a7-4d5f-8b8c-80eb71fe2a4c",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "805bdbc7-74de-4cca-8d10-848880bc6728",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  k: {
    steps: [
      {
        id: "ec60a00c-a5a1-49f1-b531-2ceb12f446da",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "e914f891-a21b-414f-9ab7-8495b14438ab",
        node: <QuoteTest testId="5h1g4k09-8de6-40ek-c5gf-16g7k542f38" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "21810590-a391-4b62-8d9d-210ffebb1568",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "352dc15f-9bde-408e-a779-38b9de7743ad",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "0e930222-61c9-43c6-9a87-33bd27438a64",
        node: <QuoteTest testId="0i6f8k56-2he1-43fk-d5g9-4k721h98cg3" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "cab7e335-d5c1-46d7-b1cd-85a91289247c",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "990ff42d-0ee7-4c67-8e87-44d65fdcb7cf",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  l: {
    steps: [
      {
        id: "7d4ff40e-ea18-4fee-ac11-042454208c80",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "91dfba0d-dea9-4b7b-9943-c059e3d2d9d0",
        node: <QuoteTest testId="6i2h5l10-9ef7-41fl-d6hg-27h8l653g49" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "835dd696-ccb9-4758-837e-b9af5fbcc81a",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy fingers! You're doing great.",
      },
      {
        id: "1db2b186-d67f-45be-8148-750b66cc9940",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "e1e0677a-33f3-4796-be4d-bf0fbe6dfb36",
        node: <QuoteTest testId="1j7g9l67-3if2-44gl-e6h0-5l832i09dh4" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "ad31861a-4e95-4e7f-8cc4-a8a67974b2d7",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "99bb9873-fc0e-4245-8fbe-a83b11691aeb",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
};

