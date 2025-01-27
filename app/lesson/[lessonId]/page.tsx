// app/lesson/[lessonId]/page.tsx
import { LessonFlow } from "./lesson-flow";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const lessonId = params.lessonId;

  return (
    <div>
      <h1>Typing Lesson</h1>
      <div>Lesson ID: {lessonId}</div>
      <LessonFlow />
    </div>
  );
}
