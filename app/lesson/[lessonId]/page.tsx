import Link from "next/link";
import { H1 } from "@/design-lib";

export default async function Test({ params }: { params: Promise<{ lessonId: string }> }) {
  const lessonId = (await params).lessonId;
  return (
    <div>
      <H1>Typing Lesson</H1>
      <div>id: {lessonId}</div>
      <div>
        <Link href="/lesson">Back to Lesson Dashboard</Link>
      </div>
    </div>
  );
}
