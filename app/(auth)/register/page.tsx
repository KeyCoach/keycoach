"use client";
import { H1 } from "@/components/headers";
import Button from "@/components/button";
import Input from "@/components/input";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Register() {
  async function Register(e: any) {
    e.preventDefault();
    const firstName = e.target["first-name"].value;
    const lastName = e.target["last-name"].value;
    const email = e.target["email"].value;
    const password = e.target["password"].value;

    axios
      .post("/api/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        Cookies.set("token", res.data.token);
        window.location.href = "/dashboard"; // Use window.location.href because it rerenders the entire tree. This time, it will rerender with the user logged in.
      });
  }
  return (
    <div>
      <H1>Welcome to KeyCoach!</H1>
      <div>
        <Link href="/login">Already have an account? Sign in.</Link>
      </div>
      <form onSubmit={Register}>
        <div className="pt-5">
          <Input
            label="First Name"
            inputType="text"
            inputId="first-name"
            placeholder="John"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="py-3">
          <Input
            label="Last Name"
            inputType="text"
            inputId="last-name"
            placeholder="Doe"
            autoComplete="family-name"
            required
          />
        </div>
        <div className="py-3">
          <Input
            label="Email"
            inputType="email"
            inputId="email"
            placeholder="example@email.com"
            autoComplete="email"
            required
          />
        </div>
        <div className="pb-5">
          <Input
            label="Password"
            inputType="password"
            inputId="password"
            autoComplete="new-password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            required
          />
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
}
