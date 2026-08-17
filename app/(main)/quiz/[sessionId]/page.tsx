"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { ContestGradeButton } from "@/components/quiz/ContestGradeButton";
import { QuestionCardCloze } from "@/components/quiz/QuestionCardCloze";
import { QuestionCardMCQ } from "@/components/quiz/QuestionCardMCQ";
import { QuestionCardShortAnswer } from "@/components/quiz/QuestionCardShortAnswer";
import { QuizProgressBar } from "@/components/quiz/QuizProgressBar";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { useQuizSession, useSubmitAttempt } from "@/hooks/useQuizSession";
import { Attempt } from "@/lib/types";

// The route is `[sessionId]` per the plan's file layout, but a session is
// generated on demand from a subject — so this param is really a subjectId.
export default function QuizSessionPage() {
  const params = useParams<{ sessionId: string }>();
  const subjectId = params.sessionId;
  const router = useRouter();

  const { data: session, isLoading } = useQuizSession(subjectId);
  const submitAttempt = useSubmitAttempt();

  const [index, setIndex] = useState(0);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);

  if (isLoading) return <LoadingSpinner label="Building your session…" />;
  if (!session || session.questions.length === 0) {
    return <p className="text-sm text-gray-500">No questions available for this subject yet.</p>;
  }

  const question = session.questions[index];
  const isLast = index === session.questions.length - 1;

  async function handleAnswer(answer: string) {
    setLastAttempt(null);
    const attempt = await submitAttempt.mutateAsync({ question_id: question.id, student_answer: answer });
    setLastAttempt(attempt);
  }

  function handleNext() {
    setLastAttempt(null);
    if (isLast) {
      router.push("/dashboard");
    } else {
      setIndex((i) => i + 1);
    }
  }

  const isGraded = lastAttempt !== null && lastAttempt.score !== null;
  const isAwaitingGrade = lastAttempt !== null && lastAttempt.score === null && question.type === "short_answer";

  return (
    <div className="flex flex-col gap-6">
      <QuizProgressBar current={index + 1} total={session.questions.length} />

      {!lastAttempt && question.type === "mcq" && (
        <QuestionCardMCQ question={question} onSubmit={handleAnswer} disabled={submitAttempt.isPending} />
      )}
      {!lastAttempt && question.type === "cloze" && (
        <QuestionCardCloze question={question} onSubmit={handleAnswer} disabled={submitAttempt.isPending} />
      )}
      {!lastAttempt && question.type === "short_answer" && (
        <QuestionCardShortAnswer
          question={question}
          onSubmit={handleAnswer}
          disabled={submitAttempt.isPending}
          isGrading={submitAttempt.isPending}
        />
      )}

      {isAwaitingGrade && <LoadingSpinner label="Grading your answer…" />}

      {isGraded && lastAttempt && (
        <div className="flex flex-col gap-3 rounded border p-4">
          <p className="text-lg font-semibold">Score: {Math.round((lastAttempt.score ?? 0) * 100)}%</p>
          <p className="text-sm text-gray-700">{lastAttempt.feedback}</p>
          <div className="flex items-center justify-between">
            <a href={`/review/${lastAttempt.id}`} className="text-sm underline">
              View source
            </a>
            <ContestGradeButton attemptId={lastAttempt.id} />
          </div>
          <button onClick={handleNext} className="self-start rounded bg-black px-4 py-2 text-white">
            {isLast ? "Finish session" : "Next question"}
          </button>
        </div>
      )}
    </div>
  );
}
