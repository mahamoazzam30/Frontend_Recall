"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { FlashcardCard } from "@/components/flashcards/FlashcardCard";
import { QuizProgressBar } from "@/components/quiz/QuizProgressBar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useFlashcardSession, useReviewFlashcard } from "@/hooks/useFlashcards";
import { RecallRating } from "@/lib/types";

export default function FlashcardSessionPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const searchParams = useSearchParams();
  const conceptIds = searchParams.getAll("concept");
  const router = useRouter();

  const { data: session, isLoading } = useFlashcardSession(courseId, conceptIds.length ? conceptIds : undefined);
  const reviewFlashcard = useReviewFlashcard(courseId);

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (isLoading) return <LoadingSpinner label="Building your flashcard deck…" />;
  if (!session || session.cards.length === 0) {
    return <p className="text-sm text-ink-muted">No flashcards available for this course yet.</p>;
  }

  const card = session.cards[index];
  const isLast = index === session.cards.length - 1;

  async function handleRate(recall: RecallRating) {
    await reviewFlashcard.mutateAsync({ question_id: card.id, recall });
    setRevealed(false);
    if (isLast) {
      router.push(`/courses/${courseId}`);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-primary">Flashcards</h1>
        <p className="mt-0.5 text-sm text-ink-muted">Flip each card, then rate how well you remembered it.</p>
      </div>

      <QuizProgressBar current={index + 1} total={session.cards.length} />

      <FlashcardCard
        card={card}
        revealed={revealed}
        onReveal={() => setRevealed(true)}
        onRate={handleRate}
        disabled={reviewFlashcard.isPending}
      />
    </div>
  );
}
