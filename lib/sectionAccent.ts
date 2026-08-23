/**
 * Single source of truth for the app's five top-level section colors.
 * Used by the Navbar and by each section's own page heading so the two
 * always match, instead of every file picking its own shade.
 */
export const SECTION_ACCENT = {
  courses: "text-sky-800",
  upload: "text-teal-800",
  quiz: "text-rose-800",
  dashboard: "text-amber-800",
  profile: "text-emerald-800",
} as const;

export type SectionKey = keyof typeof SECTION_ACCENT;
