import Link from "next/link";
import { H1 } from "@/design-lib";

export default async function TestResult({ params }: { params: Promise<{ attemptId: string }> }) {
  const testId = (await params).attemptId;
  return (
    <div>
      <H1>Typing Feedback</H1>
      <div>id: {testId}</div>
      <div>
        <Link href="/dashboard">Back to User Dashboard</Link>
      </div>
      <div>
        <Link href="/typing/test">Take another test</Link>
      </div>
    </div>
  );
}
