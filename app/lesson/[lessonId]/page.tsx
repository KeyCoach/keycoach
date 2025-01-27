import { LessonSteps } from "./lesson-steps";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const lessonId = params.lessonId;

  return (
    <div>
      <h1>Typing Lesson</h1>
      <div>Lesson ID: {lessonId}</div>
      {/* Pass lessonId to the client-side component */}
      <LessonSteps lessonId={lessonId} />
    </div>
  );
}
