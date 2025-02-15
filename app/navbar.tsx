import Link from "next/link";
import Image from "next/image";
import { LoginButton, LogoutButton } from "./nav-buttons";
import { AuthenticateUser } from "@/utils/authenticate-user";

export async function Navbar() {
  const user = await AuthenticateUser();
  return (
    <nav className="bg-white dark:bg-slate-950 shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center pl-4 relative">
          <div className="absolute left-[-50] w-12 h-12 rounded-full overflow-hidden">
          <Image
                src="/img/Mascot.jpg"
                alt="KeyCoach Mascot"
                fill
                className="object-cover scale-100 object-center"
                sizes="48px"
                priority
              />
            </div>
            <Link href="/" className="text-slate-900 dark:text-slate-50 no-underline text-2xl font-bold hover:underline">
              KeyCoach
            </Link>
          </div>

          <div className="hidden md:flex space-x-10">
            <Link href="/dashboard" className="text-slate-900 dark:text-slate-50 no-underline hover:underline">
              Dashboard
            </Link>
            <Link href="/lesson" className="text-slate-900 dark:text-slate-50 no-underline hover:underline">
              Lessons
            </Link>
            <Link href="/typing/test" className="text-slate-900 dark:text-slate-50 no-underline hover:underline">
              Take a Test
            </Link>
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}