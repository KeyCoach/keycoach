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
};

