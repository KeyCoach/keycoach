import Link from "next/link";
import { H1 } from "@/components/headers";

export default function Test() {
  return (
    <div>
      <H1>Typing Test</H1>
      <div>
        <Link href="/typing/result/1">Get Test Feedback</Link>
      </div>
    </div>
  );
}
