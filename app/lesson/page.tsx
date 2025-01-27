import Link from "next/link";
import { H1 } from "@/components";

const lessons = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];

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
        <Link className="dark:text-slate-50 text-slate-950" href="/dashboard">To User Dashboard</Link>
      </div>
      {/* for lesson in lesson create a link to that lesson */}
      {lessons.map((lesson) => (
        <div key={lesson}>
          <Link className="dark:text-slate-50 text-slate-950" href={`/lesson/${lesson}`}>Take Lesson {lesson.toUpperCase()}</Link>
        </div>
      ))}
    </div>
  );
}
