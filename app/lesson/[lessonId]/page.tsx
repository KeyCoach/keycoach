// app/lesson/[lessonId]/page.tsx
import { LessonFlow } from "./lesson-flow";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const lessonId = params.lessonId;

  return (
    <div className="">
      <LessonFlow lessonId={lessonId} />
    </div>
  );
}
