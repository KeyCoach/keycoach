"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Link } from "@/components/link";

export function LogoutButton() {
  function removeCookie(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    Cookies.remove("token");
    window.location.href = "/login"; // Use window.location.href because it rerenders the entire tree.
  }

  return (
    <Link
      href="#"
      onClick={removeCookie}
      linkVariant="navbar-link"
      className="transition-all duration-150 ease-in-out hover:underline"
    >
      Logout
    </Link>
  );
}

const dontRedirect = ["login", "register", "forgot"];

export function LoginButton() {
  const router = useRouter();
  function GoToLogin(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    let url = "/login" + window.location.search;

    const redirect = window.location.pathname;
    if (!dontRedirect.some((badUrl) => redirect.includes(badUrl))) {
      url = `/login?redirect=${redirect}`;
    }
    router.push(url);
  }

  return (
    <Link
      className="no-underline transition-all duration-150 ease-in-out hover:underline"
      href="#"
      linkVariant="navbar-link"
      onClick={GoToLogin}
    >
      Login
    </Link>
  );
}
