"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { logout } from "@/lib/auth";
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
      <h1 className="text-2xl font-bold">Profile</h1>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <p className="text-sm">
          Signed in as <span className="font-medium">{user?.email}</span>
        </p>
      )}
      <button onClick={handleLogout} className="self-start rounded border px-4 py-2 text-sm">
        Log out
      </button>
    </div>
  );
}
