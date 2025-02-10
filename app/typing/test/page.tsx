import { Link } from "@/components/link";
import { Button, H1, H3 } from "@/components";
import { GetAllTests } from "@/service-interfaces/dynamo-db";

export default async function Test() {
  const tests = await GetAllTests();
  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-3xl text-center pt-10 text-slate-900 dark:text-slate-50">
        <H1 className="mb-10">Test Your Typing Speed!</H1>
        <H3 className="mb-10 text-lg">
          Test your speed and accuracy using our typing tests. Use your results to see how far a proper typing method could take you! Choose an option below.
        </H3>
        <div className="flex flex-wrap justify-center gap-4">
          {tests.map((test, i) => (
            <Link key={test.id} className="no-underline" href={`/typing/test/${test.id}`}>
              <Button colorTheme="cerulean">Take Test {i + 1}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
