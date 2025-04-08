import { Link } from "@/components/link";
import { Button } from "@/components";

interface LessonTableRowProps {
  lesson: string;
  link: string;
}

export function LessonTableRow({ lesson, link }: LessonTableRowProps) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
      <td className="px-6 py-4 text-left">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 font-bold text-amber-800 dark:bg-amber-800 dark:text-amber-100">
          {lesson.toUpperCase()}
        </span>
      </td>
      <td className="w-full px-6 py-4 text-left text-sm text-slate-700 dark:text-slate-300">
        Learn essential typing skills about the {lesson.toUpperCase()} key
      </td>
      <td className="px-6 py-4 text-right text-sm">
        <Link href={link} className="">
          <Button colorTheme="cerulean">
            <span>Start Lesson</span>
          </Button>
        </Link>
      </td>
    </tr>
  );
}

