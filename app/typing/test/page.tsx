import Link from "next/link";
import { H1, H3, Button } from "@/design-lib";

export default function Test() {
  return (
    <div>
      <H1>Typing Test</H1>
      <br />
      <H3>Select your test:</H3>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link href="/typing/test/1">
          <Button>Take Test 1</Button>
        </Link>
        <Link href="/typing/test/2">
          <Button>Take Test 2</Button>
        </Link>
        <Link href="/typing/test/3">
          <Button>Take Test 3</Button>
        </Link>
        <Link href="/typing/test/4">
          <Button>Take Test 4</Button>
        </Link>
      </div>
      {/* <br />
      <br />
      {/* <div>
        <Link href="/typing/result/1">Get Test Feedback</Link>
      </div> */}
    </div>
  );
}
