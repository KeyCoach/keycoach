import Link from "next/link";
import { Button, H1, H3 } from "@/components";
import { GetAllTests } from "@/service-interfaces/dynamo-db";

export default async function Test() {
  const tests = await GetAllTests();
  return (
    <div>
      <H1>Typing Test</H1>
      <br />
      <H3>Select your test:</H3>
      <div style={{ display: "flex", gap: "10px" }}>
        {tests.map((test, i) => (
          <Link key={test.id} href={`/typing/test/${test.id}`}>
            <Button>Take Test {i + 1}</Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
