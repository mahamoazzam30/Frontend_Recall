import { Navbar } from "@/components/shared/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl p-6">{children}</div>
    </div>
  );
}
