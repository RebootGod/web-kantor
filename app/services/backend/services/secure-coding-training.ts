import { iconItems, type Service } from "../service-types";

export const secureCodingTraining: Service = {
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
  coverage: iconItems([
    ["Hands-on vulnerable code labs", "code-lab"],
    ["Language and framework-relevant learning paths", "code-path"],
    ["OWASP and application-security fundamentals", "shield-check"],
    ["Role-based progress and competency tracking", "progress"],
    ["Training programs aligned with engineering priorities", "learning"],
  ]),
  deliverables: iconItems([
    ["Structured developer learning paths", "learning"],
    ["Interactive remediation exercises", "remediation"],
    ["Team progress and completion visibility", "progress"],
    ["Security competency measurement", "competency"],
    ["Program recommendations for continuous improvement", "roadmap"],
  ]),
};
