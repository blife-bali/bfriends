import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import { getFacilityBySlug, getFacilitySlugs } from "@/lib/facilities";
import FacilityContent from "./FacilityContent";

export async function generateStaticParams() {
  return getFacilitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const facility = getFacilityBySlug(slug);
  if (!facility) return {};

  return {
    title: facility.seo_title,
    description: facility.seo_description,
    openGraph: {
      title: facility.seo_title,
      description: facility.seo_description,
      images: facility.image ? [{ url: facility.image }] : [],
    },
  };
}

export default async function FacilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = getFacilityBySlug(slug);
  if (!facility) notFound();

  return (
    <>
      <PageHeader
        variant="programs"
        title={facility.hero_headline}
        image={facility.image}
        showBookNowButton
      />
      <main>
        <FacilityContent facility={facility} />
      </main>
    </>
  );
}
