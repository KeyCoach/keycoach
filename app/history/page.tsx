import { type User as TUser } from "@/app/lib/types";
import { H1 } from "@/components";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/utils/authenticate-user";

export default async function Results() {
  const user = await AuthenticateUser();
  return (
    <div>
      <H1>Test History</H1>
      {user ? <History user={user} /> : <p>Log in to see your test history</p>}
    </div>
  );
}

async function History({ user }: { user: TUser }) {
  const attempts = await GetAttemptsByEmail(user.email);
  if (!attempts) {
    return <p>No test history</p>;
  }
  return (
    <div>
      {attempts.length === 0 && <p>No test history</p>}
      {attempts.map((attempt) => (
        <div key={attempt.id}>
          <p>Attempt Id: {attempt.id}</p>
          <p>Test Id: {attempt.testId}</p>
          <p>Accuracy: {attempt.accuracy}</p>
          <p>WPM: {attempt.wpm}</p>
          <p>Finger Accuracy: {attempt.fingerAccuracy}</p>
          <p>Mistakes: {attempt.mistakesCount}</p>
          <p>Duration: {attempt.duration} ms</p>
          <p>Date: {new Date(attempt.date).toLocaleString()}</p>
          <p>Test:</p>
          <div className="ps-4">
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
      ))}
    </div>
  );
}
