import UtilityPageTemplate from "@/components/UtilityPageTemplate";

export const metadata = {
  title: "Submit an AI Scam — Project Vigil",
  description: "Encountered an AI scam? Report it anonymously to help us map new attack patterns.",
};

export default function SubmitScamPage() {
  return (
    <UtilityPageTemplate
      eyebrow="Report an AI Scam"
      title={
        <>
          Report an <span className="gradient-text-cyan">AI Scam</span>
        </>
      }
      description="Encountered a voice clone, deepfake, AI phishing, or romance bot? Submit it anonymously. Every report helps map new AI attack patterns."
      previewTitle="Anonymous reporting is being built next."
      previewBody="This submission flow is being designed to make reporting fast, private, and structured enough to spot new scam patterns without exposing the person reporting them."
      bullets={[
        "Anonymous intake for new scam variants and suspicious messages.",
        "Fields tailored to voice clones, deepfakes, phishing, and romance bots.",
        "A cleaner bridge between user reports and the alerts/trending pipeline.",
      ]}
      primaryHref="/alerts"
      primaryLabel="View Scam Alerts"
      secondaryHref="/feedback"
      secondaryLabel="Send Feedback"
      accentTone="info"
    />
  );
}
