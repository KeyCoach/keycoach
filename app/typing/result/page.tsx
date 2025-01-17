import { type User as TUser } from "@/app/lib/types";
import User from "@/app/user";
import { H1 } from "@/design-lib";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";

export default async function Results() {
  const user = await User();
  return (
    <div>
      <H1>Test History</H1>
      {user.user ? <History user={user.user} /> : <p>Log in to see your test history</p>}
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
      {attempts.map((test) => (
        <div key={test.id}>
          <div>Date: {new Date(test.timeStamp).toLocaleDateString()}</div>
          <div>WPM: {test.wpm}</div>
          <div>Accuracy: {test.accuracy}</div>
          <br />
        </div>
      ))}
    </div>
  );
}
