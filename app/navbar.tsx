import Link from "next/link";
import { LoginButton, LogoutButton } from "./nav-buttons";
import { AuthenticateUser } from "@/utils/authenticate-user";

export async function Navbar() {
  const user = await AuthenticateUser();
  return (
    <nav className="dark:bg-slate-950 dark:text-slate-50 bg-slate-50 text-slate-950 shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="dark:text-slate-50 text-slate-950">
              KeyCoach
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link className="dark:text-slate-50 text-slate-950" href="/dashboard">
              Dashboard
            </Link>
            <Link className="dark:text-slate-50 text-slate-950" href="/lesson">
              Lessons
            </Link>
            <Link className="dark:text-slate-50 text-slate-950" href="/typing/test">
              Take a Test
            </Link>
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
