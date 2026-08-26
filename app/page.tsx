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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:py-32">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-brand-500/5 to-brand-600/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center animate-fade-in">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-700 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              AI-assisted spaced repetition
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-ink-primary sm:text-6xl lg:text-7xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">Recall</span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 max-w-2xl mx-auto text-xl text-ink-secondary sm:text-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Upload your notes, get quizzed on what you actually studied, and let spaced repetition tell you what to review next.
          </p>

          {/* CTA Buttons */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/register" className="btn-primary px-8 py-3 text-base shadow-glow hover:shadow-strong">
              Get started
            </Link>
            <Link href="/login" className="btn-secondary px-8 py-3 text-base">
              Log in
            </Link>
          </div>

          {/* Trust badge */}
          <p className="text-sm text-ink-muted animate-slide-up" style={{ animationDelay: '0.5s' }}>
            Free to start • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-ink-primary sm:text-4xl">
            Studying isn't the problem. <span className="gradient-text">Forgetting is.</span>
          </h2>
          <p className="text-lg text-ink-secondary leading-relaxed">
            Most study tools stop at flashcards. Recall goes further: it reads the material you upload, 
            writes quiz questions from it, grades your answers, and uses a spaced repetition scheduler 
            to decide exactly what you should review and when — so nothing you've already learned 
            quietly slips away before the exam.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-ink-primary sm:text-4xl">
              Everything you need to <span className="gradient-text">remember more</span>
            </h2>
            <p className="text-lg text-ink-secondary">
              Powerful features designed to make your study sessions more effective
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, index) => (
              <div 
                key={f.title} 
                className="card-elevated group flex flex-col gap-4 p-6 hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-600/10 text-brand-600 group-hover:from-brand-500/20 group-hover:to-brand-600/20 transition-all">
                  <f.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-ink-primary">{f.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="px-6 py-16 sm:px-8 lg:py-24 bg-gradient-to-b from-transparent to-brand-50/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-ink-primary sm:text-4xl">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-lg text-ink-secondary">
              Three simple steps to transform your studying
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((s, index) => (
              <div key={s.step} className="relative text-center animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
                {/* Step number */}
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white text-xl font-bold shadow-glow">
                  {s.step}
                </div>
                
                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-ink-primary">{s.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{s.body}</p>

                {/* Connector line (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-brand-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-brand-200/50 bg-gradient-to-br from-brand-50 to-brand-100/50 p-8 sm:p-12 lg:p-16 shadow-glow">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-brand-300/20 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-brand-400/20 blur-2xl" />
            </div>

            <div className="relative text-center">
              <h2 className="mb-4 text-3xl font-bold text-ink-primary sm:text-4xl">
                Ready to actually <span className="gradient-text">remember</span> what you study?
              </h2>
              <p className="mb-8 max-w-lg mx-auto text-lg text-ink-secondary">
                Create an account, upload your first set of notes, and get quizzed in minutes.
              </p>
              <Link href="/register" className="btn-primary px-8 py-3 text-base shadow-glow hover:shadow-strong">
                Create your account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 sm:px-8 border-t border-border-light">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-ink-muted">
            Recall • AI-assisted spaced repetition study app
          </p>
        </div>
      </footer>
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
