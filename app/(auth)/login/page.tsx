"use client";
import axios from "axios";
import { Link } from "@/components/link";
import Cookies from "js-cookie";
import { H1, TextInput, Button } from "@/components";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const params = useSearchParams();

  async function LogIn(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("/api/login", body)
      .then((res) => {
        Cookies.set("token", res.data.token);
        const redirect = params.get("redirect");

        if (redirect) {
          window.location.href = redirect;
        } else {
          window.location.href = "/dashboard"; // Use window.location.href instead of router because it rerenders the entire tree. This time with the user data available to all components.
        }
      })
      .catch((err) => {
        alert("There was an error logging in. Please try again.");
        console.error(err);
      });
  }

  return (
    <div>
      <H1 className="">Welcome Back!</H1>
      <div className="mt-1">
        <Link href="/register">New to KeyCoach? Sign Up.</Link>
      </div>
      <form onSubmit={LogIn}>
        <div className="mt-5">
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
        <div className="mt-3">
          <TextInput
            label="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
            required
          />
        </div>
        <div className="mt-3">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
        <div className="mt-3 flex w-full justify-end">
          {/* TODO: logic for back button */}
          <Button className="mr-4">Back</Button>
          <Button>Log In</Button>
        </div>
      </form>
    </div>
  );
}
