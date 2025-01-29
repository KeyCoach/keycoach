import Link from "next/link";
import { H1 } from "@/components/headers";
import { GetAttemptById } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { type Attempt } from "@/app/lib/types";

export default async function TestResult({ params }: { params: Promise<{ attemptId: string }> }) {
  const user = await AuthenticateUser();
  const email = user?.email || null;
  const attemptId = (await params).attemptId;

  const attempt = await GetAttemptById(attemptId, email);
  return (
    <div>
      <H1>Typing Feedback</H1>

      <div>
        <Link href="/dashboard">Back to User Dashboard</Link>
      </div>
      <div>
        <Link href="/typing/test">Take another test</Link>
      </div>

      {attempt ? <Attempt attempt={attempt} /> : <p>No test found</p>}
    </div>
  );
}

function Attempt({ attempt }: { attempt: Attempt }) {
  return (
    <div>
      <p>Attempt Id: {attempt.id}</p>
      <p>Accuracy: {attempt.accuracy}</p>
      <p>WPM: {attempt.wpm}</p>
      <p>Finger Accuracy: {attempt.fingerAccuracy}</p>
      <p>Mistakes: {attempt.mistakesCount}</p>
      <p>Duration: {attempt.duration} ms</p>
      <p>Date: {new Date(attempt.date).toLocaleString()}</p>
      <p>Test:</p>
      <div className="ps-4">
        <p>Test Id: {attempt.test.id}</p>
        <p>Author: {attempt.test.author}</p>
        <p>Difficulty: {attempt.test.difficulty}</p>
        <p>Char Count: {attempt.test.charCount}</p>
        <p>Word Count: {attempt.test.wordCount}</p>
        <p>Text: {attempt.test.textBody}</p>
      </div>
      {attempt.keyStrokes && (
        <div>
          <p>Key Strokes</p>
          <ul>
            {attempt.keyStrokes.map((stroke) => (
              <li key={stroke.time}>
                {stroke.correctFinger} {stroke.pressedFinger} {stroke.correctLetter}{" "}
                {stroke.pressedLetter} {stroke.modelConfidence}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
