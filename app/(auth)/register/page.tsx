"use client";
import axios from "axios";
import { Link } from "@/components/link";
import Cookies from "js-cookie";
import { Button, H1, LoadingOverlay, TextInput } from "@/components";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function HandleRegister(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (formData.get("password") !== formData.get("confirm-password")) {
      setError("Passwords do not match");
      return;
    }

    const body = {
      fname: formData.get("first-name") as string,
      lname: formData.get("last-name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const passwordError = HasPasswordError(body.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    axios
      .post("/api/register", body)
      .then((res) => {
        Cookies.set("token", res.data.token);
        window.location.href = "/dashboard"; // Use window.location.href instead of router because it rerenders the entire tree. This time with the user data available to all components.
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError("Invalid email or password.");
        } else if (err.response.status === 409) {
          setError("An account with that email already exists. Please sign in.");
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
      <LoadingOverlay show={loading} message="Registering..." />
      <div className="mx-auto w-full max-w-lg p-1 text-slate-900 dark:text-slate-50">
        <div className="rounded-xl bg-slate-50 p-8 shadow dark:bg-slate-800">
          <H1 className="mb-3 text-slate-900 dark:text-slate-50">Welcome to KeyCoach!</H1>
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            <Link
              href="/login"
              className="text-cerulean-600 hover:underline dark:text-cerulean-400"
            >
              Already have an account? Sign in
            </Link>
          </div>

          <form onSubmit={HandleRegister}>
            <div className="mb-4">
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
            <div className="mb-4">
              <TextInput
                label="Last Name"
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Doe"
                autoComplete="family-name"
                required
              />
            </div>
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
                autoComplete="new-password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                required
              />
            </div>
            <div className="mb-4">
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

            <div className="flex justify-end space-x-4">
              <Button colorTheme="cerulean">Register</Button>
            </div>
            {error && <p className="mt-3 text-red-600 dark:text-red-400">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

function HasPasswordError(password: string) {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  // if (!/[a-z]/.test(password)) {
  //   return "Password must contain at least one lowercase letter.";
  // }
  // if (!/[A-Z]/.test(password)) {
  //   return "Password must contain at least one uppercase letter.";
  // }
  // if (!/[0-9]/.test(password)) {
  //   return "Password must contain at least one number.";
  // }
  return "";
}
