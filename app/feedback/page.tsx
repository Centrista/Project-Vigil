import UtilityPageTemplate from "@/components/UtilityPageTemplate";

export const metadata = {
  title: "Feedback — Project Vigil",
  description: "Share feedback or report something you think we should know.",
};

export default function FeedbackPage() {
  return (
    <UtilityPageTemplate
      eyebrow="Feedback"
      title="Feedback"
      description="Suggestions, bug reports, or anything else — we want to hear it."
      previewTitle="A better feedback loop is coming."
      previewBody="The feedback space is being prepared to accept product notes, bug reports, and trust signals from users without making the process feel heavy or formal."
      bullets={[
        "Fast reporting for broken flows or confusing guidance.",
        "A cleaner route for product suggestions and missing scam coverage.",
        "Structured triage so urgent issues stand out from general notes.",
      ]}
      primaryHref="/trending-scams"
      primaryLabel="Browse Trending Scams"
      secondaryHref="/guide"
      secondaryLabel="Open the Guide"
      accentTone="info"
    />
  );
}
