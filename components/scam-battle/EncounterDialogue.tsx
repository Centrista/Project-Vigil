"use client";

import { useEffect, useState } from "react";

const CHARS_PER_SEC = 60;

export default function EncounterDialogue({
  scammerMessage,
  coachingFeedback,
}: {
  scammerMessage: string;
  coachingFeedback?: string;
}) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    if (!scammerMessage) return;
    let cancelled = false;
    const start = Date.now();
    const tick = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const chars = Math.min(
        scammerMessage.length,
        Math.floor((elapsed / 1000) * CHARS_PER_SEC),
      );
      setShown(scammerMessage.slice(0, chars));
      if (chars < scammerMessage.length) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [scammerMessage]);

  return (
    <div className="sb-dialogue">
      {coachingFeedback ? (
        <div className="sb-dialogue-coach">
          <span className="mono-label sb-dialogue-coach-label">COACH</span>
          <p>{coachingFeedback}</p>
        </div>
      ) : null}
      <div className="sb-dialogue-box">
        <p className="sb-dialogue-text">
          {shown}
          {shown.length < scammerMessage.length ? (
            <span className="sb-dialogue-caret" />
          ) : null}
        </p>
      </div>
    </div>
  );
}
