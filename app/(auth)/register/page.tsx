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
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-8">
      <h1 className="text-center text-2xl font-bold text-ink-primary">
        <span className="bg-gradient-to-r from-seq-600 to-seq-400 bg-clip-text text-transparent">Recall</span>
      </h1>
      <div className="card flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold text-seq-700">Sign up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          <button type="submit" disabled={registerMutation.isPending} className="btn-primary">
            {registerMutation.isPending ? "Creating account…" : "Sign up"}
          </button>
          {registerMutation.isError && (
            <p className="text-sm text-status-critical">
              {registerMutation.error instanceof ApiError ? registerMutation.error.message : "Sign up failed"}
            </p>
          )}
        </form>
      </div>
      <p className="text-center text-sm text-ink-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-seq-600 hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
