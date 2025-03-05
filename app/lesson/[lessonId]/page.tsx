import { LessonContextProvider } from "./lesson-context";
import { LessonFlow } from "./lesson-flow";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;

  return (
    <div className="">
      <LessonContextProvider lessonId={lessonId}>
        <LessonFlow />
      </LessonContextProvider>
    </div>
  );
}
