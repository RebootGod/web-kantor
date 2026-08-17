export type ServiceDetailIcon =
  | "application"
  | "mobile"
  | "identity"
  | "attack-path"
  | "network"
  | "retest"
  | "risk-report"
  | "technical-evidence"
  | "remediation"
  | "shield-check"
  | "code-lab"
  | "code-path"
  | "learning"
  | "progress"
  | "competency"
  | "roadmap"
  | "privacy"
  | "compliance"
  | "policy"
  | "audit"
  | "advisory";

export type ServiceDetailItem = {
  title: string;
  description?: string;
  icon?: ServiceDetailIcon;
  highlight?: boolean;
};

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

export function iconItems(
  items: Array<[title: string, icon: ServiceDetailIcon]>,
): ServiceDetailItem[] {
  return items.map(([title, icon]) => ({ title, icon }));
}
