export const LANDING_NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
];

export const LANDING_FEATURES = [
  {
    eyebrow: "AI context",
    title: "Explain any file with source-aware answers",
    description:
      "Ask plain-English questions about code, architecture, or business rules and get grounded answers tied to the actual repo.",
  },
  {
    eyebrow: "History",
    title: "Trace PRs, commits, and ownership instantly",
    description:
      "See who changed what, why it changed, and which decisions shaped the system without digging through multiple tools.",
  },
  {
    eyebrow: "Search",
    title: "Find code by intent, not just by filename",
    description:
      "Search for behaviors, patterns, and modules semantically so new developers can move from question to answer in minutes.",
  },
];

export const LANDING_WORKFLOW = [
  {
    step: "01",
    title: "Connect your repository",
    description:
      "Import the repo once and let Repo Insights build context across code, commits, and pull requests.",
  },
  {
    step: "02",
    title: "Ask questions in natural language",
    description:
      "Search flows, inspect file relationships, and understand risky code paths without manually reconstructing context.",
  },
  {
    step: "03",
    title: "Move into the product workspace",
    description:
      "Once you sign in, your dashboard becomes the home for teams, billing, settings, and everything else we add later.",
  },
];

export const LANDING_PRICING = [
  {
    name: "Starter",
    price: "Free",
    description: "For individuals exploring their first repositories.",
    features: ["3 repositories", "100 AI answers / month", "Basic commit context"],
  },
  {
    name: "Pro",
    price: "$29",
    description: "For developers working across multiple active codebases.",
    features: ["Unlimited repositories", "Chat with codebase", "Full PR and ownership history"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams that need security, controls, and support.",
    features: ["SSO and audit support", "Custom onboarding", "Dedicated success channel"],
  },
];
