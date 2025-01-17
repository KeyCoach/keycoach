import Link from "next/link";
import User from "@/app/user";
import { LoginButton, LogoutButton } from "./nav-buttons";

export default async function Navbar() {
  const { loggedIn } = await User();
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">KeyCoach</Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/lesson">Lessons</Link>
            <Link href="/typing/test">Take a Test</Link>
            {loggedIn ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
