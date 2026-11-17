import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/app/components/consultant/Navbar";
import Footer from "@/app/components/consultant/Footer";
import { SERVICES, PILLARS } from "@/app/components/consultant/services/ServicesData";
import ServiceReportExperience from "@/app/components/consultant/services/ServiceReportExperience";

export function generateStaticParams() {
  return SERVICES.filter((service) => service.linked).map((service) => ({
    slug: service.href.split("/").filter(Boolean).pop()!,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find(
    (item) => item.href.endsWith(`/${slug}`) && item.linked,
  );

  if (!service) return { title: "Service not found | MindSpace" };

  return {
    title: `${service.title} | MindSpace`,
    description: `${service.title}: ${service.need}. Explore the people it supports, practical use cases, process and deliverables with MindSpace.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find(
    (item) => item.href.endsWith(`/${slug}`) && item.linked,
  );

  if (!service) notFound();

  const pillar = PILLARS.find((item) => item.tag === service.pillar);

  return (
    <>
      <Navbar />
      <ServiceReportExperience service={service} pillar={pillar} />
      <Footer />
    </>
  );
}
