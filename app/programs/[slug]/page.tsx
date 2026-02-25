import { notFound } from "next/navigation";
import { programsData } from "@/lib/programs-data";
import { programSlugs } from "@/lib/program-slugs";
import PageHeader from "@/components/PageHeader/PageHeader";
import ProgramContent from "./ProgramContent";

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programsData.find((p) => p.name.toLowerCase() === slug);
  if (!program) notFound();

  const headerImage = program.image ?? "/images/hero-test.png";

  return (
    <>
      <PageHeader
        title={program.name}
        subtitle={program.title}
        image={headerImage}
      />
      <main>
        <ProgramContent program={program} />
      </main>
    </>
  );
}
