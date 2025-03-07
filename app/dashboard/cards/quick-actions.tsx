import { Button } from "@/components";
import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 gap-3">
        <Link className="w-full text-slate-50 no-underline" href="/typing/test">
          <Button colorTheme="cerulean" className="w-full">
            Take a Test
          </Button>
        </Link>
        <Link className="w-full text-slate-50 no-underline" href="/lesson">
          <Button colorTheme="green" className="w-full">
            Continue Learning
          </Button>
        </Link>
        <Link className="w-full text-slate-50 no-underline" href="/history">
          <Button colorTheme="amber" className="w-full">
            View History
          </Button>
        </Link>
      </div>
    </div>
  );
}
