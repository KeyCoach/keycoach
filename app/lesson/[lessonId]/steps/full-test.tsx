// app/lesson/[lessonId]/FullTest.tsx
export function FullTest({ testType }: { testType: string }) {
  return (
    <div>
      {testType === "1 min" && <div>1 minute test</div>}
      {testType === "3 min" && <div>3 minute test</div>}
    </div>
  );
}
