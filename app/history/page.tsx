import { H1 } from "@/components/headers";

export default function History() {
  return (
    <div>
      <H1>User History</H1>
      <ul className="pl-8 list-disc">
        <li>tests taken</li>
        <li>lessons completed</li>
        <li>accuracy scores</li>
        <li>etc.</li>
      </ul>
    </div>
  );
}
