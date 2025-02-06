import { LessonFlow } from "./lesson-flow";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
  const { lessonId } = params;

  return (
    <div className="">
      <LessonFlow lessonId={lessonId} />
    </div>
  );
}
