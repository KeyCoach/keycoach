import Link from "next/link";
import { H1 } from "@/components";

export default function Home() {
  return (
    <div>
      <H1>Keycoach Home Page</H1>
      <div>
        <Link href="/login">Log In</Link> or <Link href="/register">Register</Link>
      </div>
      <div>
        <Link href="/typing/test">Take a Typing Test</Link>
      </div>
      <div>
        <Link href="/lesson">Do a Lesson</Link>
      </div>
    </div>
  );
}
