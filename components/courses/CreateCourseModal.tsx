"use client";

import { useState } from "react";

import { COLOR_TAG_ACCENT, COLOR_TAGS } from "@/lib/colorTags";
import { ColorTag } from "@/lib/types";

export function CreateCourseModal({
  onCreate,
  onClose,
  isCreating,
}: {
  onCreate: (name: string, colorTag: ColorTag) => void;
  onClose: () => void;
  isCreating: boolean;
}) {
  const [name, setName] = useState("");
  const [colorTag, setColorTag] = useState<ColorTag>(COLOR_TAGS[0]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), colorTag);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-lg bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">New course</h2>

        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded border p-2 text-sm"
          placeholder="e.g. Data Structures"
          autoFocus
        />

        <label className="mb-2 block text-sm font-medium">Color</label>
        <div className="mb-5 flex flex-wrap gap-2">
          {COLOR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setColorTag(tag)}
              className={`h-7 w-7 rounded-full ${COLOR_TAG_ACCENT[tag]} ${
                colorTag === tag ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
              aria-label={tag}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating || !name.trim()}
            className="rounded bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isCreating ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
