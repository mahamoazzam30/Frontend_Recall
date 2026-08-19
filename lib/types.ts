export type SourceType = "pdf" | "md" | "txt";
export type MaterialStatus = "processing" | "ready" | "needs_review" | "failed";
export type QuestionType = "mcq" | "cloze" | "short_answer";
export type ColorTag = "blue" | "green" | "purple" | "pink" | "orange" | "teal" | "red" | "indigo";
export type ExamPlanStatus = "active" | "completed" | "cancelled";

export interface User {
  id: string;
  email: string;
}

export interface Course {
  id: string;
  name: string;
  color_tag: ColorTag | null;
  created_at: string;
}

export interface CourseListItem extends Course {
  mastery_pct: number;
  due_count: number;
}

export interface Module {
  id: string;
  course_id: string;
  name: string;
  order_index: number;
}

export interface Material {
  id: string;
  course_id: string;
  module_id: string | null;
  filename: string;
  source_type: SourceType;
  status: MaterialStatus;
}

export interface CourseDetail {
  course: Course;
  modules: Module[];
  materials: Material[];
  mastery_pct: number;
  due_count: number;
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

export interface CourseDashboard {
  mastery: MasteryEntry[];
  due_today: DueTodayEntry[];
  current_streak_days: number;
  longest_streak_days: number;
}

export interface ExamPlan {
  id: string;
  course_id: string;
  exam_date: string;
  status: ExamPlanStatus;
  days_left: number;
  readiness_pct: number;
  today_target_concept_ids: string[];
}

export interface ChatSource {
  content: string;
  page_ref: string | null;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
}

export interface Topic {
  id: string;
  name: string;
}

export interface WeakSpot {
  concept_id: string;
  concept_name: string;
  mastery_pct: number;
  error_note: string | null;
  last_reviewed_at: string | null;
}
