"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/lib/auth";

const links = [
  { href: "/courses", label: "Courses", color: "text-indigo-700" },
  { href: "/upload", label: "Upload", color: "text-teal-700" },
  { href: "/quiz", label: "Quiz", color: "text-purple-700" },
  { href: "/dashboard", label: "Dashboard", color: "text-orange-700" },
  { href: "/profile", label: "Profile", color: "text-pink-700" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-hairline bg-surface-card/80 p-4 backdrop-blur">
      <Link href="/courses" className="text-lg font-bold text-ink-primary">
        <span className="bg-gradient-to-r from-seq-600 to-seq-400 bg-clip-text text-transparent">Recall</span>
      </Link>
      <div className="flex items-center gap-5 text-sm">
        {links.map((link) => {
          const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.color} transition ${active ? "font-semibold" : "opacity-60 hover:opacity-100"}`}
            >
              {link.label}
            </Link>
          );
        })}
        <button onClick={handleLogout} className="text-ink-muted hover:text-ink-primary">
          Log out
        </button>
      </div>
    </nav>
  );
}
