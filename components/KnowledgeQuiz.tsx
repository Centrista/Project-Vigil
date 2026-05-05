"use client";

import { useState } from "react";
import Link from "next/link";

interface Question {
  n: number;
  tag: string;
  scenario: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    n: 1,
    tag: "Voice Cloning",
    scenario:
      "Your mom calls in a panic saying she needs $200 wired immediately. The voice sounds exactly like her — same tone, same accent, same way she says your name.",
    options: [
      "Send it. It sounds exactly like her.",
      "Hang up and call her back on her normal number.",
      "Ask a question only she would know, then decide.",
      "Hang up, call her back, AND ask a personal verification question.",
    ],
    correct: 3,
    explanation:
      "AI can clone a voice from 30 seconds of audio found on social media. Your ear alone is not reliable evidence. The gold standard: hang up, call back on a known number, and verify with a personal question.",
  },
  {
    n: 2,
    tag: "AI Phishing",
    scenario:
      "An email arrives with your real name, your school, and your teacher's name. It asks you to click a link to verify your student account. Zero typos. Looks completely official.",
    options: [
      "Click the link — the personal details prove it's legitimate.",
      "Hover over the link to inspect the actual URL before anything else.",
      "Reply to the email and ask if it's real.",
      "Forward it to a friend to check.",
    ],
    correct: 1,
    explanation:
      "AI scrapes your name, school, and teacher from public social media in seconds. Personal details in an email prove nothing. Always hover to inspect the actual destination URL — a legitimate school email will never send you to an external domain.",
  },
  {
    n: 3,
    tag: "Deepfake Interview",
    scenario:
      "A job on Instagram DMs you $25/hr remote work. During the video interview the face on screen looks slightly off around the edges. They ask for your SSN for 'tax forms' before your first day.",
    options: [
      "Provide it — tax forms are normal and you need the job.",
      "Give a fake SSN to test if they check it.",
      "End the call immediately — no real employer asks for your SSN before hiring.",
      "Ask them to send the forms by email instead.",
    ],
    correct: 2,
    explanation:
      "No legitimate employer collects your SSN before you're actually hired and onboarded. The slightly-off face is a deepfake tell — AI-generated video struggles with hair edges and peripheral movement. End the call and report the job listing.",
  },
  {
    n: 4,
    tag: "Romance Bot",
    scenario:
      "You've been messaging someone on Instagram for 3 weeks. Great conversations every day. They suddenly have an emergency and ask for a $50 gift card. You've never done a live video call.",
    options: [
      "Send the gift card — you've built real trust over 3 weeks.",
      "Offer to send cash instead of a gift card.",
      "Ask why they haven't video called in 3 weeks, then insist on one before anything.",
      "Block them — anyone asking for gift cards is automatically a scam.",
    ],
    correct: 2,
    explanation:
      "AI romance bots can maintain engaging conversations for weeks but cannot do real-time, unscripted video calls. Always ask for a spontaneous live video before sending anything. The avoidance of video after weeks of texting is the primary tell.",
  },
  {
    n: 5,
    tag: "AI Robocall",
    scenario:
      "A caller says they're from your bank. Your account was compromised and they need you to confirm your card number to re-secure it. They already know your name and the last 4 digits of your card.",
    options: [
      "Confirm your card number — they clearly already have your information.",
      "Ask for their employee ID number first.",
      "Hang up immediately and call the number on the back of your physical card.",
      "Ask them to send a confirmation email while you stay on the line.",
    ],
    correct: 2,
    explanation:
      "Your name and last 4 card digits are widely available in data breaches — knowing them proves nothing. Real banks never ask you to confirm your full card number over an inbound call. Hang up. Call the number on the back of your card directly.",
  },
];

const PROFILES = [
  {
    min: 5,
    level: "Digital Defender",
    color: "#00d4ff",
    desc: "You think before you act. You understand how AI weaponizes urgency. Keep this mindset — and teach someone else.",
  },
  {
    min: 3,
    level: "Cautious Clicker",
    color: "#ffa700",
    desc: "Your instincts are mostly right but AI's best attacks still have angles on you. Study the ones you missed.",
  },
  {
    min: 0,
    level: "Easy Target",
    color: "#ff1744",
    desc: "The AI scams that fooled you work because they exploit real emotions. Now you know how — that's the first defense.",
  },
];

export default function KnowledgeQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );

  const select = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  const answered = answers.filter((a) => a !== null).length;
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;
  const allDone = answered === QUESTIONS.length;

  const profile = PROFILES.find((p) => score >= p.min)!;

  const optionStyle = (
    qIdx: number,
    optIdx: number
  ): string => {
    const userAnswer = answers[qIdx];
    const correct = QUESTIONS[qIdx].correct;

    if (userAnswer === null) return "option-default";
    if (optIdx === correct) return "option-correct";
    if (optIdx === userAnswer && userAnswer !== correct) return "option-wrong";
    return "option-neutral";
  };

  return (
    <div>
      {/* Progress header */}
      <div className="flex items-center justify-between mb-3">
        <span className="mono-label text-xs font-bold uppercase tracking-widest text-white/40">
          {answered} / {QUESTIONS.length} answered
        </span>
        {answered > 0 && (
          <span className="mono-label text-sm font-black tabular-nums" style={{ color: score / answered >= 0.6 ? "#00d4ff" : "#ff1744" }}>
            {score} correct
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-10" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-1 rounded-full"
          style={{
            width: `${(answered / QUESTIONS.length) * 100}%`,
            background: "linear-gradient(90deg, #ff1744, #ff6363)",
            transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: answered > 0 ? "0 0 10px rgba(255,23,68,0.5)" : "none",
          }}
        />
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          const isAnswered = userAnswer !== null;
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.n}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #1e2438, #1a1f2e)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Question header */}
              <div
                className="flex items-center gap-3 px-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: "#ff1744", color: "#fff" }}
                >
                  {q.n}
                </div>
                <span className="mono-label text-xs font-bold uppercase tracking-widest text-white/40">
                  {q.tag}
                </span>
                {isAnswered && (
                  <span
                    className="ml-auto mono-label text-xs font-black"
                    style={{ color: isCorrect ? "#22c55e" : "#ff1744" }}
                  >
                    {isCorrect ? "✓ CORRECT" : "✗ WRONG"}
                  </span>
                )}
              </div>

              {/* Scenario + options */}
              <div className="px-6 py-5">
                <p className="text-[15px] text-white/85 leading-relaxed mb-5">
                  {q.scenario}
                </p>

                <div className="space-y-2.5">
                  {q.options.map((opt, optIdx) => {
                    const cls = optionStyle(qIdx, optIdx);
                    const isThisCorrect = optIdx === q.correct;
                    const isThisWrong =
                      optIdx === userAnswer && userAnswer !== q.correct;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => select(qIdx, optIdx)}
                        className={`w-full text-left flex items-start gap-3.5 px-4 py-3.5 rounded-xl ${cls}`}
                      >
                        {/* Radio dot */}
                        <div
                          className="w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center"
                          style={{
                            borderColor: isAnswered
                              ? isThisCorrect
                                ? "#22c55e"
                                : isThisWrong
                                ? "#ff1744"
                                : "rgba(255,255,255,0.12)"
                              : "rgba(255,255,255,0.25)",
                            background: isThisCorrect && isAnswered
                              ? "rgba(34,197,94,0.15)"
                              : "transparent",
                          }}
                        >
                          {isAnswered && isThisCorrect && (
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="#22c55e" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                            </svg>
                          )}
                          {isAnswered && isThisWrong && (
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="#ff1744" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l6 6M9 3l-6 6" />
                            </svg>
                          )}
                        </div>

                        <span
                          className="text-sm leading-snug"
                          style={{
                            color: isAnswered
                              ? isThisCorrect
                                ? "#86efac"
                                : isThisWrong
                                ? "#fca5a5"
                                : "rgba(255,255,255,0.3)"
                              : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div
                    className="explain-in mt-4 px-4 py-3.5 rounded-xl"
                    style={{
                      background: isCorrect
                        ? "rgba(34,197,94,0.06)"
                        : "rgba(255,23,68,0.06)",
                      border: `1px solid ${isCorrect ? "rgba(34,197,94,0.2)" : "rgba(255,23,68,0.18)"}`,
                    }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span
                        className="font-bold"
                        style={{ color: isCorrect ? "#86efac" : "#fca5a5" }}
                      >
                        {isCorrect ? "Why this is right: " : "Why the correct answer works: "}
                      </span>
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final score card */}
      {allDone && (
        <div
          className="result-pop mt-10 rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${profile.color}30` }}
        >
          <div
            className="px-8 py-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${profile.color}10 0%, rgba(26,31,46,0) 60%)`,
            }}
          >
            <div
              className="mx-auto mb-5 h-1.5 w-24 rounded-full"
              style={{ background: `linear-gradient(90deg, ${profile.color}, rgba(255,255,255,0.14))` }}
            />
            <div
              className="mono-label text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: profile.color }}
            >
              Your Result
            </div>
            <h2 className="text-3xl font-black text-white mb-1">{profile.level}</h2>
            <div
              className="mono-label text-lg font-black tabular-nums mb-4"
              style={{ color: profile.color }}
            >
              {score} / {QUESTIONS.length}
            </div>
            <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed mb-7">
              {profile.desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/risk-quiz" className="btn-red inline-flex items-center gap-2 px-7 py-3 text-sm rounded-xl">
                Take the Full Quiz
              </Link>
              <Link href="/guide" className="btn-ghost inline-flex items-center gap-2 px-7 py-3 text-sm rounded-xl">
                Study the Attacks →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
