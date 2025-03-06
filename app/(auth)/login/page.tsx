"use client";
import axios from "axios";
import { Link } from "@/components/link";
import Cookies from "js-cookie";
import { H1, TextInput, Button, LoadingOverlay, Modal } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function HandleLogin(e: any) {
    e.preventDefault();
    console.log("Logging in...");
    const formData = new FormData(e.target);

    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    setLoading(true);

    axios
      .post("/api/login", body)
      .then((res) => {
        console.log(res.data);
        Cookies.set("token", res.data.token);
        const redirect = params.get("redirect");

        if (redirect) {
          window.location.href = redirect;
        } else {
          window.location.href = "/dashboard"; // Use window.location.href instead of router because it rerenders the entire tree. This time with the user data available to all components.
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("Invalid email or password.");
        } else if (err.response.status === 422) {
          setError("Please enter an email and password.");
        } else if (err.response.status >= 500) {
          setError("It's not you, it's us. Please try again later.");
        } else {
          setError("An unknown error occurred. Please try again.");
          console.error(err);
        }

        setLoading(false);
      });
  }

  return (
    <div className="h-page w-full bg-white pt-20 dark:bg-slate-950">
      <LoadingOverlay show={loading} message="Logging you in..." />
      <div className="mx-auto w-full max-w-lg p-1 text-slate-900 dark:text-slate-50">
        <div className="rounded-xl bg-slate-50 p-8 shadow dark:bg-slate-800">
          <H1 className="mb-3 text-slate-900 dark:text-slate-50">Welcome Back!</H1>
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            <Link
              href="/register"
              className="text-cerulean-600 hover:underline dark:text-cerulean-400"
            >
              New to KeyCoach? Sign Up.
            </Link>
          </div>

          <form onSubmit={HandleLogin}>
            <div className="mb-4">
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
            <div className="mb-4">
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

            <div className="flex justify-end space-x-4">
              <Button colorTheme="cerulean">Log In</Button>
            </div>
            {error && <p className="mt-3 text-red-600 dark:text-red-400">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
