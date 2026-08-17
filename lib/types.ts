export type SourceType = "pdf" | "md" | "txt";
export type MaterialStatus = "processing" | "ready" | "needs_review" | "failed";
export type QuestionType = "mcq" | "cloze" | "short_answer";

export interface User {
  id: string;
  email: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Material {
  id: string;
  subject_id: string;
  filename: string;
  source_type: SourceType;
  status: MaterialStatus;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  choices: string[] | null;
  concept_id: string;
  chunk_id: string;
}

export interface QuizSession {
  questions: Question[];
}

export interface Attempt {
  id: string;
  question_id: string;
  student_answer: string;
  score: number | null;
  feedback: string | null;
  source_passage: string | null;
  source_page_ref: string | null;
}

export interface Contest {
  id: string;
  attempt_id: string;
  status: "open" | "resolved";
  student_note: string;
  resolution_note: string | null;
}

export interface MasteryEntry {
  concept_id: string;
  concept_name: string;
  accuracy_ema: number;
  repetitions: number;
}

export interface DueTodayEntry {
  concept_id: string;
  concept_name: string;
  due_at: string;
}

export interface Streak {
  current_streak_days: number;
  longest_streak_days: number;
}

export interface HistoryPoint {
  date: string;
  concept_id: string;
  concept_name: string;
  accuracy: number;
}
