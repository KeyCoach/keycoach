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
  q: {
    steps: [
      {
        id: "d6eec6a7-80c3-49ae-b7aa-1a950e5c423a",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "1e525e4d-c768-4554-b21a-b012f7d71c0d",
        node: <QuoteTest testId="2k8h7q32-4if9-45qk-f7i1-6q743j10ei5" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "a676a39e-2afc-4bde-ad15-f7d8e8545072",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "112f9a68-c8d3-4e89-8957-20e9812a9d7d",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "7f3b97ac-0057-4db6-994b-0acf1cc01b80",
        node: <QuoteTest testId="3l9i8q43-5jg0-46ql-g8j2-7q854k21fj6" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "a6c6a973-38f1-4fdb-8d59-8fc740392edc",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "b1e78373-f133-405d-a981-c7f50b560fb0",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  w: {
    steps: [
      {
        id: "9c802b56-e986-4cdf-a847-ada2127655f4",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "66982f68-337c-4ea7-b763-a9e517f36fb2",
        node: <QuoteTest testId="4m0j9w54-6kh1-47wm-h9k3-8w965l32gk7" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "e7378098-ec1c-4d55-949f-f3db537848ed",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "8e72eb66-db4b-4766-ad35-7825c3cca121",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "c87401f9-9f7a-4978-862d-0a31f55fc074",
        node: <QuoteTest testId="5n1k0w65-7li2-48wn-i0l4-9w076m43hl8" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "88d0d7de-15eb-4327-a570-d6a801af1e23",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "65f50129-df1d-43c8-9c19-bc15c7c11eb0",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  e: {
    steps: [
      {
        id: "969169ea-38a9-4dc9-9067-b11f6c2055ab",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "33ab7931-a21f-4942-840b-9287de8d389b",
        node: <QuoteTest testId="6o2l1e76-8mj3-49eo-j1m5-0e187n54im9" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "bb55f9eb-b7cb-45e4-b914-b305aa9e5e8c",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "dc88d010-65e1-4a2d-a008-846d3d4a4b1f",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "93ecb5ee-90c8-43e1-b3ae-37774be695e7",
        node: <QuoteTest testId="7p3m2e87-9nk4-50ep-k2n6-1e298o65jn0" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "ee99cf9e-ba30-4549-b61b-4bff51ff6a72",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "e861ab59-402b-4dad-9238-ec8a97a3fbed",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  r: {
    steps: [
      {
        id: "b0b4838b-59c2-4b64-8341-661ff4faf16a",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "7dd64b9d-24e8-4888-ba8f-49080e76a5f7",
        node: <QuoteTest testId="8q4n3r98-0ol5-51rq-l3o7-2r309p76ko1" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "5f53f29d-5b2c-446d-9d57-7ebb7691f5f9",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "4f867077-4b18-4551-aad4-b20d9e94ca86",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "db89c0f9-b68d-4f2f-8a78-1727b492b961",
        node: <QuoteTest testId="9r5o4r09-1pm6-52rr-m4p8-3r410q87lp2" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "c03e7c18-a9cc-4dca-9a64-6e8d3efc99e0",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "178f202e-5043-4b29-a7f3-7f6e93515d5e",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  t: {
    steps: [
      {
        id: "52d99367-9136-4c42-8413-0bd87d3df45f",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "32c3aae1-8b42-4e38-a1d0-ad20fbecd2f1",
        node: <QuoteTest testId="0s6p5t10-2qn7-53ts-n5q9-4t521r98mq3" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "a8f2790d-1572-463d-b7e0-223bed8b5aa3",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "3e665f68-754c-4c17-91ab-08ee06fb235a",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "5f8c6ad0-928f-4fa0-864a-2e8d11972392",
        node: <QuoteTest testId="1t7q6t21-3ro8-54tt-o6r0-5t632s09nr4" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "6a9dc7b6-9043-4894-b657-663bb34ea396",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "d500cd8e-3d87-4252-a6c8-73e36c787d33",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  y: {
    steps: [
      {
        id: "89732c3d-7496-44d1-bfda-e3b0dc819d1f",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "c5827bf6-845e-492d-92a4-cdb0247a61a3",
        node: <QuoteTest testId="2u8r7y32-4sp9-55yu-p7s1-6y743t10os5" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "a1e40e57-f1df-4eef-9bcd-1a06341e6b31",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "be9f43cf-ed4c-4e68-a66c-c186b1bfd32d",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "37eb84b6-ccbd-4412-9a4a-259b11174dbf",
        node: <QuoteTest testId="3v9s8y43-5tq0-56yv-q8t2-7y854u21pt6" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "5cf312f9-8521-4c09-838c-c5c24480a0e1",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "2c1bc2d9-61a0-4815-8623-b5a41d932ac8",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  u: {
    steps: [
      {
        id: "fcfb55ba-30c7-4086-b4da-ac6d58689425",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "f4941006-867c-4147-8a75-8fc3d7135948",
        node: <QuoteTest testId="4w0t9u54-6ur1-57uw-r9u3-8u965v32qu7" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "cba7700f-2e64-4363-a6a2-4557b8d167e0",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "0790036c-f567-436a-bb4f-ad77a426f5f4",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "12cd84dd-2c3e-45e4-a6cc-76aedf5f5599",
        node: <QuoteTest testId="5x1u0u65-7vs2-58ux-s0v4-9u076w43rv8" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "bd615958-3ee2-4ac7-9367-963ba7ce8523",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "f318794c-a650-4893-84e9-376620f57a4b",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  i: {
    steps: [
      {
        id: "c605a36f-b7dd-4c5e-899c-09d017a8ef14",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "9974c29a-7e8b-4de5-b533-074c815a7972",
        node: <QuoteTest testId="6y2v1i76-8wt3-59iy-t1w5-0i187x54sw9" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "2c37eab3-d1ca-4123-9a3a-767889b06ff6",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "0d23b93f-a648-46f5-b3d0-579d64e2acc4",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "23e835f6-1c43-4ee3-b8a1-41cb82ace611",
        node: <QuoteTest testId="7z3w2i87-9xu4-60iz-u2x6-1i298y65tx0" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "379afa40-8649-45bd-934d-129440111aa8",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "2480ade4-931e-43e3-8376-ad2fb4cf1339",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  o: {
    steps: [
      {
        id: "17b96817-8ad9-40ca-b712-8bf198316b2f",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "8bd01dc3-331b-4415-9fa6-71ffde1aaa7a",
        node: <QuoteTest testId="8a4x3o98-0yv5-61oa-v3y7-2o309z76uy1" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "358c7776-1860-4659-825a-0a38ea1e5825",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "98c24669-0668-4fd8-b354-b3126bea249c",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "516ab03d-1294-483e-9ec1-8f92132071bf",
        node: <QuoteTest testId="9b5y4o09-1zw6-62ob-w4z8-3o410a87vz2" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "4dbb9a14-3de9-48b9-9e7c-c8b59dd89fe7",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "c17b2d2d-4d85-49e3-870f-014cb5585e9d",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  p: {
    steps: [
      {
        id: "db8cc3d2-fbe8-4c70-a4a7-cba3a0e0dd29",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "f80849a0-9324-49e1-bfcc-13d2a68198d0",
        node: <QuoteTest testId="0c6z5p10-2ax7-63pc-x5a9-4p521b98wa3" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "660044f6-de35-4918-988c-03e74b58c5fb",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "6edf4b94-67c8-4cf4-9179-901677a6d70f",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "b886b9f5-911c-45f1-81c7-f5ab03d4866e",
        node: <QuoteTest testId="1d7a6p21-3by8-64pd-y6b0-5p632c09xb4" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "8dc3e5d8-1ce4-4419-80d6-0c9693b59fd4",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "7d20438f-af1d-4506-bd0f-a720b458730f",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  z: {
    steps: [
      {
        id: "9861dccd-83a6-43f9-b29b-176cf9eac566",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "a3e30350-1c9e-47bc-86da-5c40af55bf9e",
        node: <QuoteTest testId="2e8b7z32-4cz9-65zc-z7d1-6z743e10de5" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "392b4406-945c-4e79-8985-c5de7ff3f5d7",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "e0769612-e86d-49e3-acbd-5d3246f32213",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "af90d294-186d-4ce4-aa29-5a6ca13478a6",
        node: <QuoteTest testId="3f9c8z43-5dz0-66zd-z8e2-7z854f21ef6" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "db0d76df-3b71-485a-9013-0a786a9793d3",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "871bbc9c-38a5-479b-9094-3eeaadebc62c",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  x: {
    steps: [
      {
        id: "d6625929-e259-4052-8cb2-98e76ead9983",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "2e405f6c-8d5b-4b72-89b8-4c07c286447d",
        node: <QuoteTest testId="4g0d9x54-6ex1-67xe-x9f3-8x965g32fg7" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "52c7467d-97dd-4be5-9dea-5a5d83529e14",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "f350640a-f2ef-455e-b395-34a35fb40785",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "5e809e20-218c-42a4-934f-4f9ab30b4067",
        node: <QuoteTest testId="5h1e0x65-7fx2-68xf-x0g4-9x076h43gh8" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "ccf0cb65-db5d-4a66-a370-851c2657dfaa",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "229d57de-89e4-4a20-9352-8cca64bef678",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  c: {
    steps: [
      {
        id: "278f1ba0-68f0-48c6-b586-3879e1eb3bae",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "319c46cb-8db3-4847-8e7a-91338ab06870",
        node: <QuoteTest testId="6i2f1c76-8gc3-69ci-c1h5-0c187i54hi9" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "2c1d3176-7d8b-44c6-88f5-b46be59d254c",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "567bb054-d7c4-4f9b-a274-aa71370cc33b",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "1fc6cb5d-0679-4094-934f-4a051dcfbe64",
        node: <QuoteTest testId="7j3g2c87-9hc4-70cj-c2i6-1c298j65ij0" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "98300817-09cb-4c5a-8f79-075d8c148fe7",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "3b90aca8-aaed-4132-b5b8-0343d39bf5dd",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  v: {
    steps: [
      {
        id: "10cfc910-00e3-48f1-988f-d00b4205648e",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "2e954579-281d-40fc-86dd-acc703750333",
        node: <QuoteTest testId="8k4h3v98-0iv5-71vk-v3j7-2v309k76jk1" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "723e6e3d-5ab5-46ec-becd-a90f1f92a1a6",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "8eeb32de-8740-4214-831c-8133302583f1",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "45ef5d4d-37b9-429f-81ee-b8701da42886",
        node: <QuoteTest testId="9l5i4v09-1jv6-72vl-v4k8-3v410l87kl2" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "6e42110a-b18d-47c3-aa9e-2d29c3c815d7",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "39c7cad3-9435-44b8-a71d-aa9bc0d6b459",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  b: {
    steps: [
      {
        id: "ced84790-5cfb-43a9-a768-0b4c4925538a",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "57032307-7d8b-47cb-84eb-ad83f0ae5600",
        node: <QuoteTest testId="0m6j5b10-2kb7-73bm-b5l9-4b521m98lm3" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "c6f99fea-e661-4a4c-9b07-833d53df6179",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "0386f13c-13f0-4268-aec2-74ccd66e48c8",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "745ea351-9f9c-465a-ac98-63d62bf0b8cb",
        node: <QuoteTest testId="1n7k6b21-3lb8-74bn-b6m0-5b632n09mn4" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "b88dd313-ee2f-41af-b19c-a70edbb083f4",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "11d6c8f8-f867-490d-8b9a-038912e2db60",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  n: {
    steps: [
      {
        id: "d17d869d-2567-43d8-96a7-34e9c79bc6ed",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "0d881710-dcc7-4c51-a362-f7d5abba0e46",
        node: <QuoteTest testId="2o8l7n32-4mn9-75no-n7o1-6n743o10no5" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "a17296ab-d37c-4888-a058-d0b674866d8e",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "f7b4aa1b-7b0f-4f8c-ab57-603642a5c997",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "eec30f34-542d-40d0-bc8f-4599b023f91e",
        node: <QuoteTest testId="3p9m8n43-5on0-76np-n8p2-7n854p21op6" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "ed2e94b4-0f97-4e43-ae83-a25cb4aa9265",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "767e79df-149e-4fa2-932c-e423d54f28da",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
  m: {
    steps: [
      {
        id: "532e8cb0-006f-43e3-8f63-55909cb54e94",
        node: <ConceptExplanation />,
        name: "Concept Explanation",
      },
      {
        id: "c9841099-8e3b-41ac-b34b-055f5826bf58",
        node: <QuoteTest testId="4q0n9m54-6pm1-77mq-m9q3-8m965q32pq7" />,
        name: "Quote Test",
        cheer: "Great work in that last typing test.",
      },
      {
        id: "016b93f2-8521-4845-a918-de0dc7e72f13",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "Woah, speedy finders! You're doing great.",
      },
      {
        id: "a409ac6f-e1d5-4010-918a-ad7905af1555",
        node: <ReminderExplanation />,
        name: "Quick Reminder",
      },
      {
        id: "389992eb-b501-443a-bc31-b765492e39bf",
        node: <QuoteTest testId="5r1o0m65-7qm2-78mr-m0r4-9m076r43qr8" />,
        name: "Quote Test",
        cheer: "You're on fire! Keep up the good work.",
      },
      {
        id: "9c55ed6d-381a-4c31-95df-4510fb3790dd",
        node: <TypingGame />,
        name: "Typing Game",
        cheer: "You blasted those asteroids!",
      },
      {
        id: "d24e6197-4b51-40a5-9957-c7a882ddf42d",
        node: <LessonComplete />,
        name: "Lesson Complete",
      },
    ],
  },
};
