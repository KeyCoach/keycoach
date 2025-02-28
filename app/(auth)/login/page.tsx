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
    <div className="min-h-screen w-full pt-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-md w-full text-slate-900 dark:text-slate-50 p-1">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 shadow">
          <H1 className="mb-3 text-slate-900 dark:text-slate-50">Welcome Back!</H1>
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            <Link href="/register" className="text-cerulean-600 dark:text-cerulean-400 hover:underline">New to KeyCoach? Sign Up.</Link>
          </div>
          
          <form onSubmit={LogIn}>
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
            <div className="mb-6">
              <Link href="/forgot" className="text-cerulean-600 dark:text-cerulean-400 hover:underline">Forgot Password?</Link>
            </div>
            <div className="flex justify-end space-x-4">
              {/* TODO: logic for back button */}
              <Button>Back</Button>
              <Button colorTheme="cerulean">Log In</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
