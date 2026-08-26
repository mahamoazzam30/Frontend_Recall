import { ColorTag } from "./types";

export const COLOR_TAGS: ColorTag[] = ["blue", "green", "purple", "pink", "orange", "teal", "red", "indigo"];

export const COLOR_TAG_ACCENT: Record<ColorTag, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  orange: "bg-orange-500",
  teal: "bg-teal-500",
  red: "bg-red-500",
  indigo: "bg-indigo-500",
};

export const COLOR_TAG_RING: Record<ColorTag, string> = {
  blue: "stroke-blue-500",
  green: "stroke-green-500",
  purple: "stroke-purple-500",
  pink: "stroke-pink-500",
  orange: "stroke-orange-500",
  teal: "stroke-teal-500",
  red: "stroke-red-500",
  indigo: "stroke-indigo-500",
};

export const COLOR_TAG_BADGE: Record<ColorTag, string> = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
  orange: "bg-orange-100 text-orange-800",
  teal: "bg-teal-100 text-teal-800",
  red: "bg-red-100 text-red-800",
  indigo: "bg-indigo-100 text-indigo-800",
};
