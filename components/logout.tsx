"use client";

import Cookies from "js-cookie";
import Link from "next/link";

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
