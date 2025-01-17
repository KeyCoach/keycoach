"use client";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { H1, Button, Input, Label } from "@/design-lib";
import { useSearchParams } from "next/navigation";

const dontRedirect = ["login", "register", "forgot"];

export default function Login() {
  const params = useSearchParams();
  async function LogIn(e: any) {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;

    axios
      .post("/api/login", {
        email,
        password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token);
        const returnurl = params.get("returnurl");
        if (returnurl && !dontRedirect.some((badUrl) => returnurl.includes(badUrl))) {
          window.location.href = returnurl;
        } else {
          window.location.href = "/dashboard"; // Use window.location.href instead of router because it rerenders the entire tree. This time with the user data available to all components.
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.error("Email and password are required");
        }
      });
  }
  return (
    <div>
      <H1>Welcome Back!</H1>
      <div>
        <Link href="/register">New to KeyCoach? Sign Up.</Link>
      </div>
      <form onSubmit={LogIn}>
        <div className="pt-5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="pt-3 pb-5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            required
          />
        </div>
        <div>
          <Link href="/forgot">Forgot Password?</Link>
        </div>
        <Button>Log In</Button>
      </form>
    </div>
  );
}
