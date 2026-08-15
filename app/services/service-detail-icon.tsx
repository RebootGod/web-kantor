import type { ServiceDetailIcon as ServiceDetailIconName } from "./service-data";

type ServiceDetailIconProps = {
  name: ServiceDetailIconName;
};

export function ServiceDetailIcon({ name }: ServiceDetailIconProps) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
  };

  switch (name) {
    case "application":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <rect x="6" y="9" width="36" height="30" rx="3" />
          <path d="M6 17h36M12 13h.1M17 13h.1M22 13h.1M14 25h9M14 31h17" />
        </svg>
      );
    case "mobile":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <rect x="14" y="5" width="20" height="38" rx="4" />
          <path d="M20 10h8M21 37h6" />
        </svg>
      );
    case "identity":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <circle cx="24" cy="15" r="7" />
          <path d="M11 39c1.5-8 6-12 13-12s11.5 4 13 12" />
          <rect x="29" y="26" width="13" height="11" rx="2" />
          <path d="M32 26v-2a3.5 3.5 0 0 1 7 0v2" />
        </svg>
      );
    case "attack-path":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <rect x="18" y="5" width="12" height="9" rx="2" />
          <rect x="4" y="34" width="12" height="9" rx="2" />
          <rect x="32" y="34" width="12" height="9" rx="2" />
          <path d="M24 14v10M10 34v-6h28v6M24 24v4" />
        </svg>
      );
    case "retest":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <path d="M38 18A15 15 0 0 0 12 13l-3 4M10 30a15 15 0 0 0 26 5l3-4" />
          <path d="m8 10 1 7 7-1M40 38l-1-7-7 1M18 24l4 4 9-10" />
        </svg>
      );
    case "risk-report":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <path d="M9 5h20l8 8v29H9zM29 5v9h8M16 22h13M16 28h10" />
          <path d="M35 27c2.7 2.2 5.5 2.5 7 2.5v6.2c0 3.8-2.8 6.3-7 7.8-4.2-1.5-7-4-7-7.8v-6.2c1.5 0 4.3-.3 7-2.5Z" />
        </svg>
      );
    case "technical-evidence":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <circle cx="21" cy="21" r="13" />
          <path d="m31 31 11 11M17 17l-4 4 4 4M25 17l4 4-4 4M22 15l-3 12" />
        </svg>
      );
    case "remediation":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <rect x="8" y="5" width="30" height="38" rx="3" />
          <path d="M15 16l2 2 4-5M25 16h7M15 26l2 2 4-5M25 26h7M15 36l2 2 4-5M25 36h4" />
          <circle cx="37" cy="36" r="7" />
          <path d="m34 36 2 2 4-5" />
        </svg>
      );
    case "shield-check":
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true" {...commonProps}>
          <path d="M24 4c5 4 10 5.5 16 6v13c0 10-6 16-16 21C14 39 8 33 8 23V10c6-.5 11-2 16-6Z" />
          <path d="m17 24 5 5 10-11" />
        </svg>
      );
  }
}
