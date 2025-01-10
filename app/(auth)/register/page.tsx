"use client";
import { H1 } from "@/components/headers";
import Button from "@/components/button";
import Input from "@/components/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  async function Register(e: any) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    axios
      .post("/api/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/dashboard");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.error("Email and password are required");
        }
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
            label="Name"
            inputType="text"
            inputId="name"
            placeholder="john"
            autoComplete="name"
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
