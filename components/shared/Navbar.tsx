"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/lib/auth";
import { SECTION_ACCENT } from "@/lib/sectionAccent";

const links = [
  { href: "/courses", label: "Courses", color: SECTION_ACCENT.courses },
  { href: "/upload", label: "Upload", color: SECTION_ACCENT.upload },
  { href: "/quiz", label: "Quiz", color: SECTION_ACCENT.quiz },
  { href: "/dashboard", label: "Dashboard", color: SECTION_ACCENT.dashboard },
  { href: "/profile", label: "Profile", color: SECTION_ACCENT.profile },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border-light/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/courses" className="text-xl font-bold text-ink-primary hover-lift">
            <span className="gradient-text">Recall</span>
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active 
                      ? "bg-brand-50 text-brand-700" 
                      : "text-ink-secondary hover:bg-surface-page hover:text-ink-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button 
              onClick={handleLogout} 
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-ink-secondary hover:bg-surface-page hover:text-ink-primary transition-all"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
