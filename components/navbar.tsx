import Link from "next/link";
import { LoginButton, LogoutButton } from "./nav-buttons";
import { AuthenticateUser } from "@/utils/authenticate-user";

export default async function Navbar() {
  const user = await AuthenticateUser();
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-black no-underline text-2xl font-bold hover:underline">KeyCoach</Link>
          </div>

          <div className="hidden md:flex space-x-10">
            <Link href="/dashboard" className="text-black no-underline hover:underline">Dashboard</Link>
            <Link href="/lesson" className="text-black no-underline hover:underline">Lessons</Link>
            <Link href="/typing/test" className="text-black no-underline hover:underline">Take a Test</Link>
            {user ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
}
