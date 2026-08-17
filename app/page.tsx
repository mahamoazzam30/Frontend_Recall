import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">Recall</h1>
      <p className="max-w-md text-gray-600">
        Upload your notes, get quizzed on what you actually studied, and let spaced
        repetition tell you what to review next.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="rounded bg-black px-4 py-2 text-white">
          Log in
        </Link>
        <Link href="/register" className="rounded border border-black px-4 py-2">
          Sign up
        </Link>
      </div>
    </main>
  );
}
