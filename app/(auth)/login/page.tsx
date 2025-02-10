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
      <H1>Welcome Back!</H1>
      <div>
        <Link href="/register">New to KeyCoach? Sign Up.</Link>
      </div>
      <form onSubmit={LogIn}>
        <div className="pt-5">
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
        <div className="pb-5 pt-3">
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
        <div>
          <Link href="/forgot">Forgot Password?</Link>
        </div>
        <Button>Log In</Button>
      </form>
    </div>
  );
}
