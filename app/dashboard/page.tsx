import { Link } from "@/components/link";
import { H1 } from "@/components";
import { AuthenticateUser } from "@/utils/authenticate-user";

export default async function Dashboard() {
  const user = await AuthenticateUser();
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <H1>User Dashboard</H1>
      <ul className="list-disc pl-8">
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
        <Link href="/history">See Test and Lesson History</Link>
      </div>

      {user && (
        <div>
          <p>User Data</p>
          <ul className="list-disc pl-8">
            <li>Email: {user.email}</li>
            <li>Id: {user.id}</li>
            <li>First Name: {user.fname}</li>
            <li>Last Name: {user.lname}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
