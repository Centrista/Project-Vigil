import UtilityPageTemplate from "@/components/UtilityPageTemplate";

export const metadata = {
  title: "Spot the Fake — Project Vigil",
  description: "Can you tell AI-generated content from real? Interactive deepfake and phishing detection training.",
};

export default function SimulatorPage() {
  return (
    <UtilityPageTemplate
      eyebrow="AI Detection Simulator"
      title="Spot the Fake"
      description="Real vs. AI-generated voices, messages, and faces. Train your instincts before scammers test them."
      previewTitle="Interactive detection drills are on deck."
      previewBody="This training space is being shaped into a premium practice lab where each drill teaches the tells behind fake audio, fake video, and fake urgency."
      bullets={[
        "Voice, message, and deepfake practice rounds with instant feedback.",
        "Scenario-based scoring so you can see where your instinct breaks.",
        "Clear jump-off paths into the guide and quiz after every drill.",
      ]}
      accentTone="info"
    />
  );
}
