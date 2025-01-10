import Link from "next/link";
import { H1 } from "@/components/headers";

export default async function TestResult({ params }: { params: Promise<{ testId: string }> }) {
  const testId = (await params).testId;
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
