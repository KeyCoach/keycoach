// app/lesson/[lessonId]/page.tsx
import { LessonFlow } from "./lesson-flow";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const { lessonId } = await params;

  return (
    <div className="">
      <LessonFlow lessonId={lessonId} />
    </div>
  );
}
