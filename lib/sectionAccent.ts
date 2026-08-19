/**
 * Single source of truth for the app's five top-level section colors.
 * Used by the Navbar and by each section's own page heading so the two
 * always match, instead of every file picking its own shade.
 */
export const SECTION_ACCENT = {
  courses: "text-sky-600",
  upload: "text-teal-600",
  quiz: "text-rose-600",
  dashboard: "text-amber-600",
  profile: "text-emerald-600",
} as const;

export type SectionKey = keyof typeof SECTION_ACCENT;
