"use client";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { H1, Button, Input, Label } from "@/design-lib";

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
        window.location.href = "/dashboard"; // Use window.location.href instead of router because it rerenders the entire tree. This time with the user data available to all components.
      })
      .catch((err) => {
        console.error(err);
        alert("There was an error registering. Please try again.");
      });
  }
  return (
    <div>
      <H1>Welcome to KeyCoach!</H1>
      <div>
        <Link href="/login">Already have an account? Sign in</Link>
      </div>
      <form onSubmit={Register}>
        <div className="pt-5">
          <Label htmlFor="first-name">First Name</Label>
          <Input
            type="text"
            id="first-name"
            placeholder="John"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="pt-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input type="text" id="last-name" placeholder="Doe" autoComplete="family-name" required />
        </div>
        <div className="pt-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="pt-2 pb-5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
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
