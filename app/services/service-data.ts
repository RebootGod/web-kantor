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
  coverage: string[];
  deliverables: string[];
};

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
      "Web applications and APIs",
      "Android applications and local storage",
      "Authentication, authorization, and business logic",
      "Mobile-to-backend communication and attack paths",
      "Retesting after remediation",
    ],
    deliverables: [
      "Executive risk summary",
      "Technical findings with reproducible evidence",
      "Attack-path and business-impact analysis",
      "Prioritized remediation guidance",
      "Remediation validation report",
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
    coverage: [
      "Hands-on vulnerable code labs",
      "Language and framework-relevant learning paths",
      "OWASP and application-security fundamentals",
      "Role-based progress and competency tracking",
      "Training programs aligned with engineering priorities",
    ],
    deliverables: [
      "Structured developer learning paths",
      "Interactive remediation exercises",
      "Team progress and completion visibility",
      "Security competency measurement",
      "Program recommendations for continuous improvement",
    ],
  },
  {
    slug: "static-application-security-testing",
    number: "03",
    tag: "SAST",
    title: "Static Application Security Testing",
    shortTitle: "SAST",
    copy:
      "Source-code analysis and security automation that identify vulnerable patterns earlier in delivery.",
    eyebrow: "Source-code security",
    headline: "Detect vulnerable code before it reaches production.",
    description:
      "Our SAST service helps teams introduce reliable source-code security checks without overwhelming developers with noise. We combine tooling, rule tuning, triage, and engineering context so findings are relevant, actionable, and suitable for integration into the software delivery lifecycle.",
    coverage: [
      "Source-code scanning and vulnerability discovery",
      "Custom rule and policy configuration",
      "False-positive reduction and finding triage",
      "CI/CD pipeline integration",
      "Developer remediation support",
    ],
    deliverables: [
      "Validated source-code findings",
      "Risk-based remediation priorities",
      "Tooling and pipeline configuration guidance",
      "Rule-tuning recommendations",
      "Security automation improvement roadmap",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
