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
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-surface-page via-brand-50/30 to-surface-page">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-accent-blue-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-accent-emerald-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-brand-500/5 via-brand-600/5 to-brand-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        <div className="text-center mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Link href="/" className="inline-block mb-6 group">
            <div className="relative">
              <h1 className="text-5xl font-bold tracking-tight gradient-text group-hover:scale-105 transition-transform">
                Recall
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-brand-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
          <p className="text-lg text-ink-secondary">Create your account and start your learning journey today.</p>
        </div>
        
        <div className="card-elevated p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-ink-primary mb-2">Sign up</h2>
            <p className="text-sm text-ink-muted">Enter your details to create your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-ink-primary mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-ink-primary mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-xs text-ink-muted mt-1">Must be at least 8 characters</p>
            </div>
            
            <button 
              type="submit" 
              disabled={registerMutation.isPending} 
              className="btn-primary w-full py-3 shadow-glow hover:shadow-strong hover-lift animate-slide-up"
              style={{ animationDelay: '0.5s' }}
            >
              {registerMutation.isPending ? "Creating account…" : "Sign up"}
            </button>
            
            {registerMutation.isError && (
              <div className="p-4 rounded-xl bg-accent-rose-50 border border-accent-rose-200 animate-fade-in">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent-rose-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-accent-rose-600 font-medium">
                    {registerMutation.error instanceof ApiError ? registerMutation.error.message : "Sign up failed"}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <p className="text-center text-ink-secondary mt-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
