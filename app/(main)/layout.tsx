import { Navbar } from "@/components/shared/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
    </div>
  );
}
