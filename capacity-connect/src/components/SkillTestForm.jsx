import { useState } from "react";
import { questions, gradeAnswers } from "../data/qualificationTest.js";

export default function SkillTestForm({ onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function handleSubmit() {
    const score = gradeAnswers(answers);
    setSubmitted(true);
    onSubmit(score);
  }

  if (submitted) return null;

  return (
    <div className="flex flex-col gap-5">
      <p className="rounded-md bg-amber/10 px-3.5 py-3 text-xs leading-relaxed text-ink">
        {questions.length} questions on your subject area. This score is what
        the admin reviews alongside your documents — pass mark is 70%.
      </p>
      {questions.map((q, i) => (
        <fieldset key={q.id}>
          <legend className="text-sm font-medium text-ink">
            {i + 1}. {q.prompt}
          </legend>
          <div className="mt-2 flex flex-col gap-1.5">
            {q.options.map((opt, oi) => (
              <label
                key={oi}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-line px-3 py-2 text-sm has-[:checked]:border-teal has-[:checked]:bg-teal/5"
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === oi}
                  onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button
        type="button"
        disabled={!allAnswered}
        onClick={handleSubmit}
        className="rounded-md bg-ink py-3 text-sm text-mist disabled:opacity-40"
      >
        Submit test &amp; continue
      </button>
    </div>
  );
}
