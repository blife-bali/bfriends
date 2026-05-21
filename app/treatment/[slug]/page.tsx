import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import { AboutServicesSection } from "@/components/AboutServicesSection";
import TreatmentSessionsSection from "./TreatmentSessionsSection";
import { getPublicPrograms } from "@/lib/cms";
import { getTreatmentPageData, getTreatmentSlugs } from "@/lib/treatments";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getTreatmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getTreatmentPageData(slug);
  if (!data) return {};

  const { config } = data;
  return {
    title: config.seo_title,
    description: config.seo_description,
    openGraph: {
      title: config.seo_title,
      description: config.seo_description,
      images: config.header_image ? [{ url: config.header_image }] : [],
    },
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, publicPrograms] = await Promise.all([
    getTreatmentPageData(slug),
    getPublicPrograms(),
  ]);
  if (!data) notFound();

  const { config, sessions_group } = data;
  const sessionCount = sessions_group.reduce((n, g) => n + (g.sessions?.length ?? 0), 0);
  const allPrograms = publicPrograms.map((program) => ({
    name: program.general.name,
    title: program.general.title || program.general.name,
    subheading: program.general.subheading,
    image: program.general.image,
    buttonLabel: program.general.button_label,
    slug: program.general.slug,
  }));

  return (
    <>
      <PageHeader
        variant="programs"
        title={config.title}
        image={config.header_image}
        showBookNowButton
      />
      <main>
        {sessionCount > 0 && (
          <TreatmentSessionsSection
            sessionGroups={sessions_group}
            ariaLabel={config.sessions_title}
          />
        )}
        {allPrograms.length > 0 && <AboutServicesSection programs={allPrograms} />}
      </main>
    </>
  );
}
