"use client";
import Cookies from "js-cookie";
import Link from "next/link";

// This has to be in its own file because its a clint component in a server component.
export default function Logout() {
  function removeCookie() {
    Cookies.remove("token");
    window.location.href = "/login"; // Use window.location.href because it rerenders the entire tree.
  }

  return (
    <Link href="/login" onClick={removeCookie}>
      Logout
    </Link>
  );
}
