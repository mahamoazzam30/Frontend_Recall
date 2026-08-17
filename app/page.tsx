import Link from "next/link";

const FEATURES = [
  { title: "Courses", body: "Every subject in one place — materials, quizzes, and progress together." },
  { title: "Exam prep mode", body: "Set a date and get a day-by-day plan that leans into your weak spots." },
  { title: "Weak spot tracking", body: "See exactly what to review next, with a note on what keeps tripping you up." },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-14 p-8 text-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl font-bold tracking-tight text-ink-primary">
          <span className="bg-gradient-to-r from-seq-600 to-seq-400 bg-clip-text text-transparent">Recall</span>
        </h1>
        <p className="max-w-md text-ink-secondary">
          Upload your notes, get quizzed on what you actually studied, and let spaced
          repetition tell you what to review next.
        </p>
        <div className="flex gap-3">
          <Link href="/login" className="btn-primary px-6 py-2.5">
            Log in
          </Link>
          <Link href="/register" className="btn-secondary px-6 py-2.5">
            Sign up
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="card max-w-[220px] p-4 text-left">
            <p className="mb-1 text-sm font-semibold text-ink-primary">{f.title}</p>
            <p className="text-xs text-ink-secondary">{f.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
