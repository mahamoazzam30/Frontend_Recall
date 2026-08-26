"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { logout } from "@/lib/auth";
import { SECTION_ACCENT } from "@/lib/sectionAccent";
import { User } from "@/lib/types";

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading } = useQuery({ queryKey: ["me"], queryFn: () => api.get<User>("/auth/me") });

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in max-w-2xl">
      <div>
        <h1 className={`text-4xl font-black text-ink-primary ${SECTION_ACCENT.profile}`}>Profile</h1>
        <p className="text-ink-secondary mt-2 text-lg">Manage your account settings and preferences</p>
      </div>

      <div className="card-elevated p-8 animate-slide-up">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-ink-primary mb-2">Account Information</h2>
            <p className="text-ink-secondary text-base">Your account details and current status</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-ink-secondary">Loading profile information…</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-surface-page border border-border-light">
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Email Address</p>
              <p className="text-ink-primary font-medium">{user?.email}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-surface-page border border-border-light">
              <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-success"></span>
                <p className="text-ink-primary font-medium">Active</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border-light">
              <button 
                onClick={handleLogout} 
                className="btn-secondary w-full"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
