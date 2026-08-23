import Link from "next/link";

const FEATURES = [
  {
    title: "Upload your materials",
    body: "Drop in notes, slides, or PDFs. Recall breaks them into chunks so quizzes and chat stay grounded in what you actually studied.",
    icon: UploadIcon,
  },
  {
    title: "AI-generated quizzes",
    body: "Multiple-choice, cloze, and short-answer questions pulled straight from your own materials — never generic trivia.",
    icon: QuizIcon,
  },
  {
    title: "Instant, honest grading",
    body: "Short answers get graded by an LLM with real feedback, not just right/wrong, so you know exactly what to fix.",
    icon: GradeIcon,
  },
  {
    title: "Spaced repetition scheduling",
    body: "A scheduler tracks every concept you've seen and resurfaces it right before you'd forget it — no guesswork about what to review.",
    icon: ClockIcon,
  },
  {
    title: "Weak spot tracking",
    body: "See exactly which concepts keep tripping you up, with one-tap practice sessions targeted at just those gaps.",
    icon: TargetIcon,
  },
  {
    title: "Exam prep mode",
    body: "Set your exam date and get a day-by-day countdown plan that leans harder into your weak spots as the date gets closer.",
    icon: CalendarIcon,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Upload",
    body: "Add your notes or course materials to a subject. Recall reads and indexes them in the background.",
  },
  {
    step: "02",
    title: "Get quizzed",
    body: "Start a quiz session and answer questions generated from your own content — or ask the course chat a question directly.",
  },
  {
    step: "03",
    title: "Review smarter",
    body: "Recall schedules your next review automatically and flags the concepts that need more attention.",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 px-6 py-16 text-center sm:px-8">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 pt-8">
        <span className="rounded-full border border-seq-500/20 bg-seq-500/10 px-3 py-1 text-xs font-medium text-seq-650">
          AI-assisted spaced repetition
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-ink-primary sm:text-6xl">
          <span className="bg-gradient-to-r from-seq-600 to-seq-400 bg-clip-text text-transparent">Recall</span>
        </h1>
        <p className="max-w-lg text-lg text-ink-secondary">
          Upload your notes, get quizzed on what you actually studied, and let spaced
          repetition tell you what to review next.
        </p>
        <div className="flex gap-3">
          <Link href="/register" className="btn-primary px-6 py-2.5">
            Get started
          </Link>
          <Link href="/login" className="btn-secondary px-6 py-2.5">
            Log in
          </Link>
        </div>
        <p className="text-xs text-ink-muted">Free to start &middot; no credit card required</p>
      </section>

      {/* About */}
      <section className="flex max-w-2xl flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold text-ink-primary">Studying isn't the problem. Forgetting is.</h2>
        <p className="text-ink-secondary">
          Most study tools stop at flashcards. Recall goes further: it reads the material you
          upload, writes quiz questions from it, grades your answers, and uses a spaced
          repetition scheduler to decide exactly what you should review and when — so nothing
          you've already learned quietly slips away before the exam.
        </p>
      </section>

      {/* Features */}
      <section className="flex w-full max-w-5xl flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold text-ink-primary">What you get</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card flex flex-col items-start gap-3 p-5 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-seq-500/10 text-seq-600">
                <f.icon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-ink-primary">{f.title}</p>
              <p className="text-sm text-ink-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="flex w-full max-w-4xl flex-col items-center gap-8">
        <h2 className="text-2xl font-semibold text-ink-primary">How it works</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="flex flex-col items-center gap-2 text-center">
              <span className="text-sm font-bold text-seq-500">{s.step}</span>
              <p className="text-sm font-semibold text-ink-primary">{s.title}</p>
              <p className="text-sm text-ink-secondary">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="flex flex-col items-center gap-4 rounded-2xl border border-ink-primary/10 bg-surface-card px-8 py-12 shadow-sm shadow-ink-primary/5">
        <h2 className="text-2xl font-semibold text-ink-primary">Ready to actually remember what you study?</h2>
        <p className="max-w-md text-sm text-ink-secondary">
          Create an account, upload your first set of notes, and get quizzed in minutes.
        </p>
        <Link href="/register" className="btn-primary px-6 py-2.5">
          Create your account
        </Link>
      </section>

      <footer className="pb-4 text-xs text-ink-muted">Recall &middot; AI-assisted spaced repetition study app</footer>
    </main>
  );
}

type IconProps = { className?: string };

function UploadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function QuizIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 9a3 3 0 1 1 4 2.8c-.7.3-1 1-1 1.7v.5" />
      <path d="M12 17h.01" />
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </svg>
  );
}

function GradeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function TargetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
    </svg>
  );
}
