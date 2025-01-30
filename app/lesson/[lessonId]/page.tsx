import Link from "next/link";
import { H1 } from "@/components";

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
