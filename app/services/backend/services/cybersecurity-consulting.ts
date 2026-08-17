import { iconItems, type Service } from "../service-types";

export const cybersecurityConsulting: Service = {
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
  coverage: iconItems([
    ["ISO/IEC 27001 ISMS readiness and implementation", "shield-check"],
    ["ISO/IEC 27701 privacy information management", "privacy"],
    ["Security and privacy control gap assessments", "technical-evidence"],
    ["Alignment with applicable Indonesian regulations", "compliance"],
    ["Policy, governance, and audit preparation", "policy"],
  ]),
  deliverables: iconItems([
    ["Current-state and gap assessment", "technical-evidence"],
    ["Risk-based compliance roadmap", "roadmap"],
    ["Control and policy recommendations", "policy"],
    ["Evidence and audit-readiness guidance", "audit"],
    ["Implementation priorities and advisory support", "advisory"],
  ]),
};
