import { Button } from "@/components";

export default function QuickActions() {
  return (
    <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 gap-3">
        <Button colorTheme="cerulean" className="w-full" href="/typing/test">
          Take a Test
        </Button>
        <Button colorTheme="green" className="w-full" href="/lesson">
          Continue Learning
        </Button>
        <Button colorTheme="amber" className="w-full" href="/history">
          View History
        </Button>
      </div>
    </div>
  );
}
