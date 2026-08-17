import type { Service } from "../service-types";

export const penetrationTesting: Service = {
  slug: "penetration-testing",
  number: "01",
  tag: "OFFENSIVE",
  title: "Penetration Testing",
  shortTitle: "Pentest",
  copy:
    "Attacker-led testing across web applications, APIs, mobile applications, networks, and supporting infrastructure.",
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
      title: "Android and iOS Application",
      description:
        "Assessment of mobile application behavior, device-side controls, sensitive data storage, and reverse-engineering exposure across Android and iOS.",
      icon: "mobile",
    },
    {
      title: "Authentication, authorization, and business logic",
      description:
        "Validation of identity flows, privilege boundaries, access controls, and abuse cases unique to your business process.",
      icon: "identity",
    },
    {
      title: "Network and Infrastructure",
      description:
        "Testing of exposed services, network segmentation, infrastructure configuration, and attack paths across connected systems.",
      icon: "network",
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
};
