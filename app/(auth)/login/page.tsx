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
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-8">
      <h1 className="text-center text-2xl font-bold text-ink-primary">
        <span className="bg-gradient-to-r from-seq-600 to-seq-400 bg-clip-text text-transparent">Recall</span>
      </h1>
      <div className="card flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold text-ink-primary">Log in</h2>
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
            required
          />
          <button type="submit" disabled={loginMutation.isPending} className="btn-primary">
            {loginMutation.isPending ? "Logging in…" : "Log in"}
          </button>
          {loginMutation.isError && (
            <p className="text-sm text-status-critical">
              {loginMutation.error instanceof ApiError ? loginMutation.error.message : "Login failed"}
            </p>
          )}
        </form>
      </div>
      <p className="text-center text-sm text-ink-secondary">
        No account?{" "}
        <Link href="/register" className="font-medium text-seq-600 hover:underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
