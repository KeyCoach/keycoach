import Link from "next/link";
import { H1 } from "@/components/headers";

export default function LessonDashboard() {
  return (
    <div>
      <H1>Lesson Dashboard</H1>
      <ul className="pl-8 list-disc">
        <li>view lesson progress</li>
        <li>recommended next lesson</li>
        <li>all lessons</li>
      </ul>
      <div>
        <Link href="/dashboard">To User Dashboard</Link>
      </div>
      {[...Array(10).keys()].map((i) => (
        <div key={i}>
          <Link href={`/lesson/${i}`}>Take Lesson {i + 1}</Link>
        </div>
      ))}
    </div>
  );
}
