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
    <div className="flex max-w-sm flex-col gap-4">
      <h1 className={`text-2xl font-bold ${SECTION_ACCENT.profile}`}>Profile</h1>
      <div className="card flex flex-col gap-3 p-5">
        {isLoading ? (
          <p className="text-sm text-ink-muted">Loading…</p>
        ) : (
          <p className="text-sm text-ink-secondary">
            Signed in as <span className="font-medium text-ink-primary">{user?.email}</span>
          </p>
        )}
        <button onClick={handleLogout} className="btn-secondary self-start">
          Log out
        </button>
      </div>
    </div>
  );
}
