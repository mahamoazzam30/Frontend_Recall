"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { api, ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => api.post("/auth/login", { email, password }),
    onSuccess: () => router.push("/dashboard"),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    loginMutation.mutate();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in…" : "Log in"}
        </button>
        {loginMutation.isError && (
          <p className="text-sm text-red-600">
            {loginMutation.error instanceof ApiError ? loginMutation.error.message : "Login failed"}
          </p>
        )}
      </form>
      <p className="text-sm text-gray-600">
        No account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
