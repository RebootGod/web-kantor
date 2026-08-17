import { cybersecurityConsulting } from "./services/cybersecurity-consulting";
import { penetrationTesting } from "./services/penetration-testing";
import { secureCodingTraining } from "./services/secure-coding-training";

export const services = [
  penetrationTesting,
  secureCodingTraining,
  cybersecurityConsulting,
];

const servicesBySlug = new Map(
  services.map((service) => [service.slug, service] as const),
);

export function getService(slug: string) {
  return servicesBySlug.get(slug);
}
