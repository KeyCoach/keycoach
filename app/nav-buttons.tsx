"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  function removeCookie(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    Cookies.remove("token");
    window.location.href = "/login"; // Use window.location.href because it rerenders the entire tree.
  }

  return (
    <Link href="#" onClick={removeCookie}>
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
    <Link href="#" onClick={GoToLogin}>
      Login
    </Link>
  );
}
