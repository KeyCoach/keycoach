import { Button } from "@/components/button";
import { Link } from "@/components/link";

// app/lesson/[lessonId]/QuoteTest.tsx
export function LessonComplete() {
  return (
    <>
      <Link href="/lesson">
        <Button>Back to Lesson Dashboard</Button>
      </Link>
    </>
  );
}
