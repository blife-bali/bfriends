import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import { getTreatmentBySlug, getTreatmentSlugs } from "@/lib/treatments";
import { treatmentNameInline } from "@/mock/treatments";
import { Section as AboutSection } from "./about";
import { Section as SpecsSection } from "./specs";
import { Section as CtaSection } from "./cta";

export async function generateStaticParams() {
  return getTreatmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) return {};

  return {
    title: treatment.seo_title,
    description: treatment.seo_description,
    openGraph: {
      title: treatment.seo_title,
      description: treatment.seo_description,
      images: treatment.image ? [{ url: treatment.image }] : [],
    },
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  return (
    <>
      <PageHeader
        variant="programs"
        eyebrow={treatmentNameInline(treatment)}
        title={treatment.hero_headline}
        image={treatment.image}
        showBookNowButton={false}
      />
      <main>
        <AboutSection treatment={treatment} />
        <SpecsSection treatment={treatment} />
        <CtaSection cta={treatment.cta} image={treatment.image} />
      </main>
    </>
  );
}
