"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { logout } from "@/lib/auth";

const links = [
  { href: "/upload", label: "Upload" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between border-b p-4">
      <Link href="/dashboard" className="text-lg font-bold">
        Recall
      </Link>
      <div className="flex items-center gap-4 text-sm">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
        <button onClick={handleLogout} className="text-gray-500 hover:underline">
          Log out
        </button>
      </div>
    </nav>
  );
}
