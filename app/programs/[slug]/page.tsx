import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { programsData } from "@/lib/programs-data";
import { getProgramBySlug, getProgramSlugs } from "@/lib/cms";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProgramContent from "./ProgramContent";

export async function generateStaticParams() {
  const slugs = await getProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};

  const title = program.seo_title || `${program.name} | BFriends`;
  const description =
    program.seo_description ||
    program.philosophy ||
    program.title ||
    `Discover the ${program.name} program at BFriends.`;

  return {
    title,
    description,
    openGraph: { title, description, images: program.image ? [{ url: program.image }] : [] },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const headerImage = program.image ?? "/images/hero-test.png";
  const breadcrumb = program.breadcrumb ?? `Programs / ${program.name}`;

  return (
    <>
      <PageHeader
        breadcrumb={breadcrumb}
        title={program.name}
        image={headerImage}
      />
      <main>
        <ProgramContent program={program} />
      </main>
    </>
  );
}
