"use client";
import axios from "axios";
import { Link } from "@/components/link";
import { Button, H1, LoadingOverlay, TextInput, TextInputWithAddon } from "@/components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/user-context";
import { HasPasswordError } from "@/utils/has-password-error";
import { Eye, EyeSlash } from "react-bootstrap-icons";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
        setUser(res.data.user);
        router.push("/dashboard");
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

  function TogglePasswordVisibility(id: string) {
    const passwordField = document.getElementById(id) as HTMLInputElement;
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  }

  return (
    <div className="h-page w-full bg-white pt-20 dark:bg-slate-950">
      <LoadingOverlay show={loading} message="Registering..." />
      <div className="mx-auto w-full max-w-lg p-1 text-slate-900 dark:text-slate-50">
        <div className="rounded-xl bg-slate-50 p-8 shadow dark:bg-slate-800">
          <H1 className="mb-3 text-slate-900 dark:text-slate-50">Welcome to KeyCoach!</H1>
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            <Link href="/login" className="text-cerulean-600 underline dark:text-cerulean-400">
              Already have an account? Sign in.
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
                autoFocus
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
              <TextInputWithAddon
                label="Password"
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                addon={passwordVisible ? <Eye /> : <EyeSlash />}
                addonPosition="right"
                addonOnClickAction={() => setPasswordVisible((prev) => !prev)}
                addonClassName="cursor-pointer"
              />
            </div>
            <div className="mb-4">
              <TextInputWithAddon
                label="Confirm Password"
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                autoComplete="new-password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                required
                addon={confirmPasswordVisible ? <Eye /> : <EyeSlash />}
                addonPosition="right"
                addonOnClickAction={() => setConfirmPasswordVisible((prev) => !prev)}
                addonClassName="cursor-pointer"
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
