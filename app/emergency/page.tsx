import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import EmergencyScenarios from "@/components/EmergencyScenarios";

export const metadata = {
  title: "Been Scammed? — Project Vigil",
  description:
    "Just been scammed? Do these four steps first, then jump to your situation. Real Singapore reporting links, tap-to-call hotlines, and exactly what to do right now.",
};

const LINK_CLASS =
  "font-semibold text-white underline decoration-white/40 underline-offset-2 transition hover:decoration-white";

// The four universal steps — copy taken word-for-word from the help-page doc.
const UNIVERSAL_STEPS: { lead: string; body: React.ReactNode }[] = [
  {
    lead: "Freeze your money.",
    body: (
      <>
        If you sent money or shared bank/login details, open your banking app and hit the kill
        switch / “lock accounts” button. Every Singapore bank has one by law, and it stops them
        taking more instantly. Can’t find it? Call the number on the back of your card.
      </>
    ),
  },
  {
    lead: "Screenshot everything, then block them.",
    body: (
      <>
        Save the messages, usernames, numbers and any transaction references before you cut contact.
        Never pay more — even if they promise your money back or start threatening you. That’s just a
        second scam.
      </>
    ),
  },
  {
    lead: "Report it.",
    body: (
      <>
        File a police report at the SPF e-services portal (
        <a href="https://www.police.gov.sg/iwitness" target="_blank" rel="noreferrer" className={LINK_CLASS}>
          police.gov.sg
        </a>
        ), and call the ScamShield Helpline on{" "}
        <a href="tel:1799" className={LINK_CLASS}>
          1799
        </a>{" "}
        (free, 24/7) if you’re unsure what to do. Calling 1799 isn’t the same as a police report — do
        both. In immediate danger, call{" "}
        <a href="tel:999" className={LINK_CLASS}>
          999
        </a>
        .
      </>
    ),
  },
  {
    lead: "Tell someone you trust.",
    body: (
      <>
        A parent, teacher or counsellor. People skip this out of embarrassment, but telling someone
        early is how you stop it snowballing. You’re the victim, not the one in trouble.
      </>
    ),
  },
];

export default function EmergencyPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="relative overflow-hidden bg-grid">
          <div
            className="orb orb-drift absolute -top-24 left-0 h-96 w-96 opacity-[0.20]"
            style={{ backgroundColor: "#ff1744" }}
          />
          <div
            className="orb orb-drift absolute right-0 top-20 h-72 w-72 opacity-[0.10]"
            style={{ backgroundColor: "#ff6d00", animationDelay: "5s" }}
          />

          <div className="page-frame page-frame-narrow relative z-10">
            <PageIntro
              eyebrow="Emergency"
              title={
                <>
                  Been Scammed?
                  <br />
                  <span className="gradient-text-red">Do this now.</span>
                </>
              }
              description="Take a breath. If you’ve been scammed, you’re not in trouble and it’s not your fault — scammers are good at this, that’s the whole point. What matters now is acting fast. Do the first four steps, then jump to your situation below."
              align="center"
            />

            {/* Universal steps — always visible, time-critical */}
            <div className="mb-12">
              <h2 className="section-title mb-6 text-center">
                Do these first — they apply to almost any scam
              </h2>
              <ol className="space-y-3">
                {UNIVERSAL_STEPS.map((step, i) => (
                  <li
                    key={step.lead}
                    className="entrance-stagger flex gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5"
                    style={{ ["--stagger-delay" as string]: `${i * 70}ms` }}
                  >
                    <span className="gradient-text-red text-3xl font-black leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-relaxed text-white/75">
                      <span className="font-black text-white">{step.lead}</span> {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Scenario triage — tap to expand */}
            <div className="mb-10">
              <h2 className="section-title mb-2 text-center">Now — what happened to you?</h2>
              <p className="section-copy mx-auto mb-6 max-w-xl text-center text-sm">
                Tap your situation for the exact next steps.
              </p>
              <EmergencyScenarios />
            </div>

            {/* Catch-all */}
            <div className="mx-auto mb-12 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center">
              <p className="text-[15px] leading-relaxed text-white/75">
                Not even sure it’s a scam? Call{" "}
                <a href="tel:1799" className={LINK_CLASS}>
                  1799
                </a>{" "}
                before you do anything.
              </p>
            </div>

            {/* Bridge back to the guide */}
            <div className="premium-panel premium-panel-info p-6 text-center sm:p-8">
              <h2 className="section-title mb-2">Want to spot them earlier?</h2>
              <p className="section-copy mx-auto mb-5 max-w-xl text-sm">
                The Educational Guide breaks down how each of these scams works before it reaches
                you — the red flags, the psychology, and real cases.
              </p>
              <Link href="/guide" className="btn-red px-7 py-3">
                Read the Educational Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
