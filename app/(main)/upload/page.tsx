"use client";

import { useState } from "react";

import { FileDropzone } from "@/components/upload/FileDropzone";
import { MaterialStatusList } from "@/components/upload/MaterialStatusList";
import { useCreateSubject, useMaterialsForSubject, useSubjects, useUploadMaterial } from "@/hooks/useMaterials";

export default function UploadPage() {
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const createSubject = useCreateSubject();
  const uploadMaterial = useUploadMaterial();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const { data: materials } = useMaterialsForSubject(selectedSubjectId || null);

  async function handleFilesSelected(files: File[]) {
    if (!selectedSubjectId) return;
    for (const file of files) {
      await uploadMaterial.mutateAsync({ file, subjectId: selectedSubjectId });
    }
  }

  async function handleCreateSubject() {
    if (!newSubjectName.trim()) return;
    const subject = await createSubject.mutateAsync(newSubjectName.trim());
    setSelectedSubjectId(subject.id);
    setNewSubjectName("");
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Upload materials</h1>

      <section className="flex flex-col gap-2">
        <label className="text-sm font-medium">Subject</label>
        <div className="flex gap-2">
          <select
            className="rounded border p-2"
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            disabled={subjectsLoading}
          >
            <option value="">Select a subject…</option>
            {subjects?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            className="rounded border p-2"
            placeholder="New subject name"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
          />
          <button onClick={handleCreateSubject} className="rounded bg-black px-3 py-2 text-sm text-white">
            Create
          </button>
        </div>
      </section>

      <section>
        {selectedSubjectId ? (
          <FileDropzone onFilesSelected={handleFilesSelected} />
        ) : (
          <p className="text-sm text-gray-500">Select or create a subject before uploading.</p>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Materials</h2>
        <MaterialStatusList materials={materials ?? []} />
      </section>
    </div>
  );
}
