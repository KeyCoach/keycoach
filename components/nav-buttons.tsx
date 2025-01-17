"use client";
import Cookies from "js-cookie";
import Link from "next/link";

export function LogoutButton() {
  function removeCookie() {
    Cookies.remove("token");
    window.location.href = "/login"; // Use window.location.href because it rerenders the entire tree.
  }

  return (
    <Link href="#" onClick={removeCookie}>
      Logout
    </Link>
  );
}

export function LoginButton() {
  const location = window.location.pathname;
  return <Link href={`/login?returnurl=${location}`}>Login</Link>;
}
