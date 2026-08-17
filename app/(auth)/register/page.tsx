"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { api, ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: () => api.post("/auth/register", { email, password }),
    onSuccess: () => router.push("/login"),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    registerMutation.mutate();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Sign up</h1>
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
          minLength={8}
          required
        />
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {registerMutation.isPending ? "Creating account…" : "Sign up"}
        </button>
        {registerMutation.isError && (
          <p className="text-sm text-red-600">
            {registerMutation.error instanceof ApiError ? registerMutation.error.message : "Sign up failed"}
          </p>
        )}
      </form>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
