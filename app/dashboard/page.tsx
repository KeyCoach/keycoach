import Link from "next/link";
import { H1 } from "@/design-lib";

export default async function Dashboard() {
  return (
    <div>
      <H1>User Dashboard</H1>
      <ul className="pl-8 list-disc">
        <li>navigate to lessons</li>
        <li>see last test</li>
        <li>account settings?</li>
        <li>take a test</li>
        <li>navigate to lesson and test history</li>
      </ul>
      <div>
        <Link href="/lesson">To Lesson Dashboard</Link>
      </div>
      <div>
        <Link href="/typing/test">Take Typing Test</Link>
      </div>
      <div>
        <Link href="/typing/result">See Test and Lesson History</Link>
      </div>
    </div>
  );
}
