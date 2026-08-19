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
    <div className="fixed inset-0 flex items-center justify-center bg-ink-primary/40 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm p-5">
        <h2 className="mb-4 text-lg font-semibold text-ink-primary">New course</h2>

        <label className="mb-1 block text-sm font-medium text-ink-primary">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input mb-4 w-full"
          placeholder="e.g. Data Structures"
          autoFocus
        />

        <label className="mb-2 block text-sm font-medium text-ink-primary">Color</label>
        <div className="mb-5 flex flex-wrap gap-2">
          {COLOR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setColorTag(tag)}
              className={`h-7 w-7 rounded-full transition ${COLOR_TAG_ACCENT[tag]} ${
                colorTag === tag ? "ring-2 ring-offset-2 ring-seq-600" : ""
              }`}
              aria-label={tag}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-ink-secondary hover:bg-ink-primary/5">
            Cancel
          </button>
          <button type="submit" disabled={isCreating || !name.trim()} className="btn-primary">
            {isCreating ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
