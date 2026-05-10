import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublicProgramBySlug, getPublicPrograms, getPublicProgramSlugs } from "@/lib/cms";

export const dynamic = "force-dynamic";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProgramContent from "./ProgramContent";

export async function generateStaticParams() {
  const slugs = await getPublicProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getPublicProgramBySlug(slug);
  if (!program) return {};

  const title = program.seo.seo_title || `${program.general.name} | BFriends`;
  const description = program.seo.seo_description || program.intro.sub;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: program.general.image ? [{ url: program.general.image }] : [],
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [program, programs] = await Promise.all([
    getPublicProgramBySlug(slug),
    getPublicPrograms(),
  ]);
  if (!program) notFound();

  const headerImage = program.general.image ?? "/images/hero-test.png";

  return (
    <>
      <PageHeader
        variant="programs"
        title={program.general.name}
        image={headerImage}
        showBookNowButton={program.general.book_now_button}
      />
      <main>
        <ProgramContent program={program} programs={programs} />
      </main>
    </>
  );
}
