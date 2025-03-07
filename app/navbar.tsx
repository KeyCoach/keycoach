"use client";
import { Link } from "@/components/link";
import Image from "next/image";
import { LoginButton, LogoutButton } from "./nav-buttons";
import { useUser } from "./user-context";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { user } = useUser();
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <nav
      style={{ height: "4.5rem" }}
      className={`top-0 z-50 w-full py-1 shadow-slate-300 ${
        isHomePage
          ? "bg-cerulean-800 dark:bg-cerulean-800"
          : "bg-slate-50 shadow-md shadow-slate-600 dark:bg-slate-950"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rest of your navigation content */}
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center pl-4">
            <div className="relative flex h-16 w-16 justify-center overflow-hidden">
              <Image
                src="/img/Mascot3.svg"
                className="absolute object-center"
                alt="KeyCoach Mascot"
                sizes="48px"
                fill
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

            <Link href="/typing/test" linkVariant="navbar-link">
              Take a Test
            </Link>

            <Link href="/type-invader" linkVariant="navbar-link">
              Type Invaders
            </Link>

            <Link href="/lesson" linkVariant="navbar-link">
              Lessons
            </Link>

            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
