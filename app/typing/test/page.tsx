import Link from "next/link";
import { H1, H3, Button } from "@/design-lib";

export default function Test() {
  return (
    <div>
      <H1>Typing Test</H1>
      <br />
      <H3>Select your test:</H3>
      <div style={{ display: "flex", gap: "10px" }}>
        {[...Array(6).keys()].map((i) => (
          <Link key={i + 1} href={`/typing/test/${i + 1}`}>
            <Button>Take Test {i + 1}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
