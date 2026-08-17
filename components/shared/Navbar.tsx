"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/lib/auth";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/upload", label: "Upload" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
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
              className={active ? "font-medium text-seq-600" : "text-ink-secondary hover:text-ink-primary"}
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
