import PageIntro from "@/components/PageIntro";

export const metadata = {
  title: "Emergency Guide — Project Vigil",
  description: "Got hit by an AI scam? Follow these steps immediately.",
};

const RESPONSE_LANES = [
  {
    title: "Stop the conversation",
    body: "Cut contact, pause payments, and move away from the number, account, or link the attacker is pushing.",
  },
  {
    title: "Secure the accounts",
    body: "Reset passwords, review recovery methods, and lock down any service touched by the scam.",
  },
  {
    title: "Save the evidence",
    body: "Keep screenshots, usernames, call logs, and payment details so you can report clearly and fast.",
  },
];

export default function EmergencyPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="page-section">
        <div className="page-frame page-frame-narrow">
          <PageIntro
            eyebrow="Emergency"
            title="Emergency Guide"
            description="Think you just got hit by an AI scam? Step-by-step actions to lock down your accounts right now."
            align="center"
            stats={[
              { label: "Move fast", tone: "danger" },
              { label: "Keep evidence", tone: "default" },
              { label: "Lock down accounts", tone: "warm" },
            ]}
          />

          <div className="premium-panel premium-panel-danger p-6 sm:p-8">
            <div className="eyebrow-row">
              <span className="premium-dot" />
              <span className="mono-label text-[11px] uppercase tracking-[0.24em] text-[#ff9ab1]">
                Response Preview
              </span>
            </div>
            <h2 className="section-title mb-3">Use this page when your gut says the pressure is real.</h2>
            <p className="section-copy max-w-2xl">
              The full response workflow is still expanding, but the structure is already pointed at the right order of operations: stop the attacker, secure the accounts, and keep the evidence.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {RESPONSE_LANES.map((lane, index) => (
                <div key={lane.title} className="rounded-[22px] border border-white/10 bg-black/10 p-5">
                  <div className="mono-label mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#ff9ab1]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-2 text-lg font-black text-white">{lane.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
