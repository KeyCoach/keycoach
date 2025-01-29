"use client";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button, H1, TextInput } from "@/components";

export default function Register() {
  async function Register(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get("password") !== formData.get("confirm-password")) {
      alert("Passwords do not match");
      return;
    }

    const body = {
      fname: formData.get("first-name"),
      lname: formData.get("last-name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("/api/register", body)
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
          <TextInput
            label="First Name"
            type="text"
            id="first-name"
            name="first-name"
            placeholder="John"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="pt-2">
          <TextInput
            label="Last Name"
            type="text"
            id="last-name"
            placeholder="Doe"
            autoComplete="family-name"
            required
          />
        </div>
        <div className="pt-2">
          <TextInput
            label="Email"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="example@email.com"
            required
          />
        </div>
        <div className="pt-2">
          <TextInput
            label="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            required
          />
        </div>
        <div className="pt-2 pb-5">
          <TextInput
            label="Confirm Password"
            type="password"
            id="confirm-password"
            name="confirm-password"
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
