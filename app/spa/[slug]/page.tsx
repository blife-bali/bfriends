import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader/PageHeader";
import { AboutServicesSection } from "@/components/AboutServicesSection";
import SpaSessionsSection from "./SpaSessionsSection";
import { getPublicPrograms } from "@/lib/cms";
import { getSpaPageData, getSpaSlugs } from "@/lib/spa";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getSpaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getSpaPageData(slug);
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

export default async function SpaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, allPrograms] = await Promise.all([
    getSpaPageData(slug),
    getPublicPrograms(),
  ]);
  if (!data) notFound();

  const { config, sessions_group } = data;
  const sessionCount = sessions_group.reduce((n, g) => n + (g.sessions?.length ?? 0), 0);
  const carouselPrograms = allPrograms.map((program) => ({
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
          <SpaSessionsSection
            sessionGroups={sessions_group}
            ariaLabel={config.sessions_title}
          />
        )}
        {carouselPrograms.length > 0 && (
          <AboutServicesSection programs={carouselPrograms} />
        )}
      </main>
    </>
  );
}
