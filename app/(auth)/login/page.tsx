"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import axios from "axios";
import Link from "next/link";
import { H1 } from "@/components/headers";
import Cookies from "js-cookie";

export default function Login() {
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
        window.location.href = "/dashboard";
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
          <Input
            label="Email"
            inputType="email"
            inputId="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="pt-3 pb-5">
          <Input
            label="Password"
            inputType="password"
            autoComplete="current-password"
            inputId="password"
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
