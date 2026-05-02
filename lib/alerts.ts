export interface Alert {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  severity: "critical" | "high" | "medium";
  weekOf: string;
  learnMoreHref: string;
}

// Add new alerts here — newest first.
// Example entry:
// {
//   id: "may-2026-gaming-refund",
//   title: "Fake Game Refund Texts Surge on Roblox",
//   description: "A new wave of SMS messages impersonating Roblox Support is offering fake refunds to collect login credentials.",
//   category: "Gaming Scams",
//   categoryColor: "#00c853",
//   severity: "high",
//   weekOf: "Week of May 5, 2026",
//   learnMoreHref: "/guide",
// },

export const ALERTS: Alert[] = [];
