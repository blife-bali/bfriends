import { notFound } from "next/navigation";
import { programsData } from "@/lib/programs-data";
import { programSlugs } from "@/lib/program-slugs";
import Image from "next/image";
import Link from "next/link";

export function generateStaticParams() {
  return programSlugs.map((slug) => ({ slug }));
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programsData.find(
    (p) => p.name.toLowerCase() === slug
  );
  if (!program) notFound();

  return (
    <main style={{ padding: "8rem 2rem 4rem", maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p
          className="font-display font-display--italic"
          style={{ color: "var(--color-cream-100)", fontSize: "0.9rem", marginBottom: "0.5rem" }}
        >
          {program.eyebrow}
        </p>
        <h1
          className="font-display font-display--bold"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-blue-100)", marginBottom: "0.75rem" }}
        >
          {program.name}
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-blue-80)", lineHeight: 1.6 }}>
          {program.title}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", color: "var(--color-blue-60)", fontSize: "0.95rem", marginTop: "0.5rem" }}>
          {program.subheading}
        </p>
      </div>
      {program.image && (
        <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "8px", overflow: "hidden", marginBottom: "2rem" }}>
          <Image
            src={program.image}
            alt={program.name}
            fill
            sizes="(max-width: 960px) 100vw, 960px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          textTransform: "uppercase",
          color: "var(--color-cream-100)",
          textDecoration: "none",
        }}
      >
        ← Back to programs
      </Link>
    </main>
  );
}
