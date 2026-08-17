import type { Metadata } from "next";
import {
  generateServiceMetadata,
  generateServiceStaticParams,
  ServiceDetailPage,
  type ServiceDetailPageProps,
} from "@/app/services/frontend";

export function generateStaticParams() {
  return generateServiceStaticParams();
}

export function generateMetadata(
  props: ServiceDetailPageProps,
): Promise<Metadata> {
  return generateServiceMetadata(props);
}

export default ServiceDetailPage;
