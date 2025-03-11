"use client";
import axios from "@/app/axios-client";
import { Link } from "@/components/link";
import { H1, TextInput, Button, LoadingOverlay, TextInputWithAddon } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/app/user-context";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Login() {
  const params = useSearchParams();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

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
        const redirect = params.get("redirect");
        setUser(res.data.user);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
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
    <div className="h-page w-full bg-slate-50 pt-20 dark:bg-slate-950">
      <LoadingOverlay show={loading} message="Logging you in..." />
      <div className="mx-auto w-full max-w-lg bg-slate-50 p-1 text-slate-900 dark:text-slate-50">
        <div className="rounded-xl bg-white p-8 shadow dark:bg-slate-800">
          <H1 className="mb-3 text-slate-900 dark:text-slate-50">Welcome Back!</H1>

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
                autoFocus
              />
            </div>

            <div className="mb-4">
              <TextInputWithAddon
                label="Password"
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                addon={passwordVisible ? <Eye /> : <EyeSlash />}
                addonPosition="right"
                addonOnClickAction={() => setPasswordVisible((prev) => !prev)}
                addonClassName="cursor-pointer"
              />
            </div>

            {/* <div className="mb-6 text-slate-600 dark:text-slate-400">
            </div> */}

            <div className="flex justify-between items-center space-x-4">
              <Link href="/register" className="!text-cerulean-600 dark:!text-cerulean-400">
                New to KeyCoach? Sign Up.
              </Link>
              <Button colorTheme="cerulean">Log In</Button>
            </div>
            {error && <p className="mt-3 text-red-600 dark:text-red-400">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
