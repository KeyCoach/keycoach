import Link from "next/link";
import { H1 } from "@/components/headers";

export default function Home() {
  return (
    <div>
      <H1>Keycoach Home Page</H1>
      <div>
        <Link href="/register">Register</Link>
      </div>
      <div>
        <Link href="/typing/test">Take a Typing Test</Link>
      </div>
    </div>
  );
}
