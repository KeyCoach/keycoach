import { Link } from "@/components/link";
import Image from "next/image";
import { LoginButton, LogoutButton } from "./nav-buttons";
import { AuthenticateUser } from "@/utils/authenticate-user";

export async function Navbar() {
  const user = await AuthenticateUser();
  return (
    <nav
      style={{ height: "4.5rem" }}
      className="top-0 z-50 w-full bg-slate-50 py-1 shadow-md shadow-slate-300 dark:bg-slate-900 dark:shadow-slate-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="relative flex flex-shrink-0 items-center pl-4">
            <div className="absolute left-[-50] h-14 w-14 overflow-hidden">
              <Image
                src="/img/Mascot3.svg"
                alt="KeyCoach Mascot"
                fill
                className="translate-y-[5%] scale-[1.5] object-cover"
                sizes="48px"
                priority
              />
            </div>
            <Link href="/" linkVariant="navbar-link-home">
              KeyCoach
            </Link>
          </div>

          <div className="hidden space-x-10 md:flex">
            <Link href="/dashboard" linkVariant="navbar-link">
              Dashboard
            </Link>

            <Link href="/privacy" linkVariant="navbar-link">
              Our Privacy Pledge
            </Link>
            <Link href="/lesson" linkVariant="navbar-link">
              Lessons
            </Link>
            <Link href="/typing/test" linkVariant="navbar-link">
              Take a Test
            </Link>

            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
