import type { Metadata } from "next";
import {
  generateServiceMetadata,
  generateServiceStaticParams,
  ServiceDetailPage,
  type ServiceDetailPageProps,
} from "@/features/services/frontend/service-detail-page";

export function generateStaticParams() {
  return generateServiceStaticParams();
}

export function generateMetadata(
  props: ServiceDetailPageProps,
): Promise<Metadata> {
  return generateServiceMetadata(props);
}

export default ServiceDetailPage;
