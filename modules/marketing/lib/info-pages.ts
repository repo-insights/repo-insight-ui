export type InfoPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
  ctaLabel: string;
};

export const infoPages: Record<string, InfoPageContent> = {
  about: {
    eyebrow: "Company",
    title: "About Repo Insights",
    description:
      "Repo Insights helps teams understand codebases, history, and ownership faster so onboarding, debugging, and collaboration feel lighter.",
    sections: [
      {
        title: "Why we built it",
        body:
          "Modern teams lose time rebuilding context across source code, pull requests, and commit history. Repo Insights brings those signals together into one place so people can move from question to answer quickly.",
      },
      {
        title: "What we believe",
        body:
          "Great developer tools should reduce anxiety, not add it. We focus on clear context, useful guidance, and workflows that help both new and experienced teammates contribute confidently.",
      },
    ],
    ctaTitle: "Explore the platform",
    ctaDescription: "See how the product experience connects search, AI context, and workspace collaboration.",
    ctaHref: "/#features",
    ctaLabel: "View features",
  },
  team: {
    eyebrow: "Company",
    title: "Our Team",
    description:
      "We are building Repo Insights with a product mindset shaped by engineering reality, collaboration, and long-term maintainability.",
    sections: [
      {
        title: "How we work",
        body:
          "We value clear thinking, careful execution, and kind collaboration. The product reflects the same approach: grounded answers, predictable interfaces, and tools that help people move forward together.",
      },
      {
        title: "Who we build for",
        body:
          "Our focus is on software teams that need faster onboarding, easier debugging, and better visibility across repositories, changes, and ownership.",
      },
    ],
    ctaTitle: "See Repo Insights in action",
    ctaDescription: "Jump back to the landing experience and explore the product story.",
    ctaHref: "/#demo",
    ctaLabel: "View demo",
  },
  diversity: {
    eyebrow: "Company",
    title: "Diversity",
    description:
      "We want the product and the team behind it to support different backgrounds, working styles, and paths into software.",
    sections: [
      {
        title: "Inclusive building",
        body:
          "We think inclusive teams produce stronger products. That means writing clearly, reducing unnecessary complexity, and designing experiences that help more people succeed in technical environments.",
      },
      {
        title: "Accessible collaboration",
        body:
          "From product language to UI behavior, we aim to make Repo Insights more welcoming for people who are onboarding, switching teams, or learning unfamiliar systems.",
      },
    ],
    ctaTitle: "Learn how the product helps new teammates ramp up",
    ctaDescription: "Explore the workflow built for onboarding and day-to-day repo ownership.",
    ctaHref: "/#workflow",
    ctaLabel: "See workflow",
  },
  "network-map": {
    eyebrow: "Company",
    title: "Network Map",
    description:
      "Repo Insights is designed to show how code, people, and changes connect across a repository so teams can make better decisions with less friction.",
    sections: [
      {
        title: "Connected context",
        body:
          "Instead of treating files, pull requests, and commits as separate tools, we think in relationships. That context helps teams understand why systems work the way they do and where risk lives.",
      },
      {
        title: "Shared visibility",
        body:
          "A clearer map of ownership and change history helps teams coordinate better, avoid duplicated effort, and move from investigation to action more quickly.",
      },
    ],
    ctaTitle: "Explore connected repository context",
    ctaDescription: "See how search and history work together on the landing page demo.",
    ctaHref: "/#demo",
    ctaLabel: "Open demo",
  },
  impact: {
    eyebrow: "Company",
    title: "Impact",
    description:
      "We measure impact by how much faster teams can understand systems, reduce context-switching, and support each other across complex codebases.",
    sections: [
      {
        title: "Team velocity",
        body:
          "When developers can trace decisions and ownership without digging through multiple tools, they spend more time solving problems and less time reconstructing history.",
      },
      {
        title: "Confidence at scale",
        body:
          "Better visibility across repositories can improve onboarding, make debugging calmer, and help teams scale without losing shared understanding.",
      },
    ],
    ctaTitle: "See how teams get value from Repo Insights",
    ctaDescription: "Review the key product capabilities built for onboarding, debugging, and daily ownership.",
    ctaHref: "/#features",
    ctaLabel: "Explore capabilities",
  },
  plans: {
    eyebrow: "Getting Started",
    title: "Plans",
    description:
      "Compare plans and choose the level of AI context, collaboration, and repository capacity that fits your team.",
    sections: [
      {
        title: "Flexible growth",
        body:
          "Plans are built to support teams at different stages, from early exploration to broader collaboration and operational maturity.",
      },
      {
        title: "API-backed pricing",
        body:
          "The landing page pricing section is connected to backend plan data so the experience stays current as plan definitions evolve.",
      },
    ],
    ctaTitle: "Compare current pricing",
    ctaDescription: "Jump to the pricing section on the landing page for the live plan list.",
    ctaHref: "/#pricing",
    ctaLabel: "View pricing",
  },
  recommendation: {
    eyebrow: "Getting Started",
    title: "Get a Recommendation",
    description:
      "If you're not sure which plan or workflow fits best, this page helps frame the kinds of teams and use cases Repo Insights supports.",
    sections: [
      {
        title: "For individual developers",
        body:
          "If you're exploring a new codebase, trying to speed up onboarding, or tracing change history more effectively, a lower-tier plan may be the right place to start.",
      },
      {
        title: "For growing teams",
        body:
          "If you need AI context and collaboration features across multiple repositories and contributors, look at the higher-capacity plans in the pricing section.",
      },
    ],
    ctaTitle: "Review plan options",
    ctaDescription: "Use the live pricing section to compare available plans and features.",
    ctaHref: "/#pricing",
    ctaLabel: "Compare plans",
  },
  "request-demo": {
    eyebrow: "Getting Started",
    title: "Request a Demo",
    description:
      "If you want a guided walkthrough of Repo Insights, this page outlines the main areas we can tailor to your team during a demo.",
    sections: [
      {
        title: "What we can show",
        body:
          "A demo can focus on onboarding, debugging, repository search, plan setup, or how workspace collaboration works across your team structure.",
      },
      {
        title: "Who it's for",
        body:
          "This is useful for team leads, engineering managers, platform teams, or anyone evaluating how the product fits their workflow and scale.",
      },
    ],
    ctaTitle: "Start with the interactive product story",
    ctaDescription: "Explore the live demo section while request workflows are being expanded.",
    ctaHref: "/#demo",
    ctaLabel: "Open demo",
  },
  "contact-sales": {
    eyebrow: "Getting Started",
    title: "Contact Sales",
    description:
      "For teams evaluating fit, rollout, or pricing questions, this page provides a starting point before a dedicated sales flow is added.",
    sections: [
      {
        title: "Evaluation support",
        body:
          "We can help teams understand how Repo Insights fits into onboarding, engineering productivity, and repository visibility workflows.",
      },
      {
        title: "Enterprise readiness",
        body:
          "If you're thinking about scale, controls, and operational support, this route is the right place to start before a more formal contact flow is added.",
      },
    ],
    ctaTitle: "Review pricing and platform details",
    ctaDescription: "Use the pricing and feature sections as the fastest way to assess current fit.",
    ctaHref: "/#pricing",
    ctaLabel: "Review pricing",
  },
  "privacy-policy": {
    eyebrow: "Security",
    title: "Privacy Policy",
    description:
      "This page is the product placeholder for privacy information and will expand into a full policy as legal content is finalized.",
    sections: [
      {
        title: "Data handling",
        body:
          "Repo Insights is being designed with clear boundaries around account data, workspace data, and authentication flows so teams can understand what information is used and why.",
      },
      {
        title: "Transparency",
        body:
          "We want privacy content to be practical and readable. As formal policy text is added, this page can become the canonical route linked from the landing page footer.",
      },
    ],
    ctaTitle: "Explore current security and product context",
    ctaDescription: "You can review the rest of the product experience while formal policy pages are completed.",
    ctaHref: "/",
    ctaLabel: "Back to product",
  },
  "terms-and-conditions": {
    eyebrow: "Security",
    title: "Terms and Conditions",
    description:
      "This route is ready to host the product’s formal terms and conditions once the final legal text is prepared.",
    sections: [
      {
        title: "Clear expectations",
        body:
          "Terms should make responsibilities, access boundaries, and product usage expectations easy to understand for both individuals and teams.",
      },
      {
        title: "Ready to expand",
        body:
          "We created this dedicated route now so the footer links can point to a stable destination before the full legal content is added.",
      },
    ],
    ctaTitle: "Continue exploring Repo Insights",
    ctaDescription: "The live product surfaces are already available while formal legal pages are being expanded.",
    ctaHref: "/",
    ctaLabel: "Return home",
  },
  "acceptable-use-policy": {
    eyebrow: "Security",
    title: "Acceptable Use Policy",
    description:
      "This page will hold the product’s acceptable use guidance so teams have a clear, dedicated place to understand usage expectations.",
    sections: [
      {
        title: "Responsible usage",
        body:
          "An acceptable use policy helps define healthy product boundaries and makes expectations clearer for all users and organizations.",
      },
      {
        title: "Operational clarity",
        body:
          "By establishing a stable route now, Repo Insights can evolve footer navigation and legal surfaces without changing link structure later.",
      },
    ],
    ctaTitle: "See how the product is structured today",
    ctaDescription: "Explore the current workspace, pricing, and product story while policy text is expanded.",
    ctaHref: "/",
    ctaLabel: "Explore product",
  },
  docs: {
    eyebrow: "Resources",
    title: "Docs",
    description:
      "This route is ready for product documentation and learning content as the docs experience grows.",
    sections: [
      {
        title: "Getting started content",
        body:
          "Documentation can cover setup, workspace concepts, plans, and how to use search, AI context, and repository history effectively.",
      },
      {
        title: "Team enablement",
        body:
          "A dedicated docs area makes it easier for new teammates and evaluators to learn the product without relying only on demos or support conversations.",
      },
    ],
    ctaTitle: "Start with the product overview",
    ctaDescription: "Until docs expand, the landing page remains the best entry point for understanding the platform.",
    ctaHref: "/",
    ctaLabel: "View overview",
  },
  support: {
    eyebrow: "Resources",
    title: "Support",
    description:
      "This route gives Repo Insights a stable place for product help, support guidance, and future support workflows.",
    sections: [
      {
        title: "Common help paths",
        body:
          "Support content can cover login issues, billing questions, workspace setup, and general product usage as the support system grows.",
      },
      {
        title: "Scalable assistance",
        body:
          "A dedicated support page makes it easier to add FAQs, contact options, and product troubleshooting later without changing the footer structure.",
      },
    ],
    ctaTitle: "Review the product flow first",
    ctaDescription: "Many common questions are answered by the live pricing, demo, and feature sections.",
    ctaHref: "/#features",
    ctaLabel: "Explore features",
  },
  status: {
    eyebrow: "Resources",
    title: "Status",
    description:
      "This page is ready to host product availability and service status details as Repo Insights grows operational visibility features.",
    sections: [
      {
        title: "Operational transparency",
        body:
          "A dedicated status route helps communicate system health, maintenance windows, and platform incidents in a clearer, more trustworthy way.",
      },
      {
        title: "Stable public destination",
        body:
          "By creating the route now, the footer structure is ready for a future live status experience without another navigation refactor.",
      },
    ],
    ctaTitle: "Return to the main experience",
    ctaDescription: "Use the landing page to continue exploring the current product experience.",
    ctaHref: "/",
    ctaLabel: "Go home",
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Us",
    description:
      "This page creates a dedicated route for product contact and gives the footer a stable place to send people for general questions.",
    sections: [
      {
        title: "General inquiries",
        body:
          "Use this page as the future home for team questions, partnership conversations, and product interest that does not fit support or sales exactly.",
      },
      {
        title: "Future-ready structure",
        body:
          "As contact workflows mature, this route can grow into a full contact surface without requiring another change to the landing page footer.",
      },
    ],
    ctaTitle: "Review the product first",
    ctaDescription: "The landing page gives the quickest overview of what Repo Insights does today.",
    ctaHref: "/",
    ctaLabel: "Open home",
  },
  suggestions: {
    eyebrow: "Contact",
    title: "Suggestions",
    description:
      "This page is the dedicated destination for product ideas, feedback, and enhancement requests linked from the footer.",
    sections: [
      {
        title: "Feedback loop",
        body:
          "Suggestions help shape better onboarding, stronger collaboration flows, and clearer product surfaces across the platform.",
      },
      {
        title: "What to share",
        body:
          "Good suggestions include friction points, missing workflows, confusing copy, and ideas that would make the product feel faster or clearer for your team.",
      },
    ],
    ctaTitle: "Explore the current experience",
    ctaDescription: "Spend a few minutes in the product story, then come back with ideas on what would make it even better.",
    ctaHref: "/",
    ctaLabel: "Explore product",
  },
};
