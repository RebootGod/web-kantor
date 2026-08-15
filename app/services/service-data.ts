export type Service = {
  slug: string;
  number: string;
  tag: string;
  title: string;
  shortTitle: string;
  copy: string;
  eyebrow: string;
  headline: string;
  description: string;
  coverage: ServiceDetailItem[];
  deliverables: ServiceDetailItem[];
};

export type ServiceDetailIcon =
  | "application"
  | "mobile"
  | "identity"
  | "attack-path"
  | "retest"
  | "risk-report"
  | "technical-evidence"
  | "remediation"
  | "shield-check";

export type ServiceDetailItem = {
  title: string;
  description?: string;
  icon?: ServiceDetailIcon;
  highlight?: boolean;
};

function simpleItems(items: string[]): ServiceDetailItem[] {
  return items.map((title) => ({ title }));
}

export const services: Service[] = [
  {
    slug: "penetration-testing",
    number: "01",
    tag: "OFFENSIVE",
    title: "Penetration Testing",
    shortTitle: "Pentest",
    copy:
      "Attacker-led testing across web applications, APIs, Android apps, and connected mobile ecosystems.",
    eyebrow: "Offensive security assessment",
    headline: "Find the attack paths that create real business risk.",
    description:
      "Our penetration testing combines manual exploitation, business-logic analysis, and technical validation across your application ecosystem. We go beyond isolated findings to show how weaknesses can be chained, what an attacker could achieve, and what your team should fix first.",
    coverage: [
      {
        title: "Web applications and APIs",
        description:
          "Manual and automated testing across public-facing and internal applications, APIs, and supporting services.",
        icon: "application",
      },
      {
        title: "Android applications and local storage",
        description:
          "Assessment of application behavior, device-side controls, sensitive data storage, and reverse-engineering exposure.",
        icon: "mobile",
      },
      {
        title: "Authentication, authorization, and business logic",
        description:
          "Validation of identity flows, privilege boundaries, access controls, and abuse cases unique to your business process.",
        icon: "identity",
      },
      {
        title: "Mobile-to-backend communication and attack paths",
        description:
          "End-to-end testing of trust boundaries between mobile clients, APIs, backend systems, and connected services.",
        icon: "attack-path",
      },
      {
        title: "Retesting after remediation",
        description:
          "Focused validation to confirm reported vulnerabilities are properly remediated and cannot be reproduced.",
        icon: "retest",
        highlight: true,
      },
    ],
    deliverables: [
      {
        title: "Executive risk summary",
        description:
          "High-level overview of key risks, exposure, and business impact.",
        icon: "risk-report",
      },
      {
        title: "Technical findings with reproducible evidence",
        description:
          "Detailed findings with proof-of-concept, screenshots, and step-by-step reproduction.",
        icon: "technical-evidence",
      },
      {
        title: "Attack-path and business-impact analysis",
        description:
          "Realistic attack scenarios mapped to assets and their potential business impact.",
        icon: "attack-path",
      },
      {
        title: "Prioritized remediation guidance",
        description:
          "Actionable recommendations prioritized by risk, effort, and business value.",
        icon: "remediation",
      },
      {
        title: "Tested. Hardened. Production-ready applications.",
        description:
          "Risks validated and remediated—so you can ship with confidence and operate securely.",
        icon: "shield-check",
        highlight: true,
      },
    ],
  },
  {
    slug: "secure-coding-training",
    number: "02",
    tag: "TRAINING",
    title: "Secure Coding Training Platform",
    shortTitle: "Secure Coding Training",
    copy:
      "Hands-on learning that helps developers understand, practice, and prevent vulnerabilities in real code.",
    eyebrow: "Developer security enablement",
    headline: "Turn secure coding knowledge into an engineering habit.",
    description:
      "The Secure Coding Training Platform gives developers practical, scenario-based exercises built around vulnerabilities they encounter in real software. Teams learn how insecure patterns emerge, how exploitation works, and how to implement safer alternatives inside the development workflow.",
    coverage: simpleItems([
      "Hands-on vulnerable code labs",
      "Language and framework-relevant learning paths",
      "OWASP and application-security fundamentals",
      "Role-based progress and competency tracking",
      "Training programs aligned with engineering priorities",
    ]),
    deliverables: simpleItems([
      "Structured developer learning paths",
      "Interactive remediation exercises",
      "Team progress and completion visibility",
      "Security competency measurement",
      "Program recommendations for continuous improvement",
    ]),
  },
  {
    slug: "cybersecurity-consulting",
    number: "03",
    tag: "CONSULTING",
    title: "Cybersecurity Consulting",
    shortTitle: "Cybersecurity Consulting",
    copy:
      "Practical guidance for ISO/IEC 27001, ISO/IEC 27701, and applicable Indonesian cybersecurity and privacy regulations.",
    eyebrow: "Governance, risk, and compliance",
    headline: "Turn security and privacy requirements into an actionable program.",
    description:
      "Our cybersecurity consulting helps organizations understand their current security and privacy posture, identify control gaps, and build a realistic roadmap toward stronger governance and audit readiness. Recommendations are tailored to business priorities, ISO/IEC 27001, ISO/IEC 27701, and applicable Indonesian regulatory requirements.",
    coverage: simpleItems([
      "ISO/IEC 27001 ISMS readiness and implementation",
      "ISO/IEC 27701 privacy information management",
      "Security and privacy control gap assessments",
      "Alignment with applicable Indonesian regulations",
      "Policy, governance, and audit preparation",
    ]),
    deliverables: simpleItems([
      "Current-state and gap assessment",
      "Risk-based compliance roadmap",
      "Control and policy recommendations",
      "Evidence and audit-readiness guidance",
      "Implementation priorities and advisory support",
    ]),
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
