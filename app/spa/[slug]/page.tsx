import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader/PageHeader";
import SpaSessionsSection from "./SpaSessionsSection";
import { getSpaPageData, getSpaSlugs } from "@/lib/spa";
import styles from "./SpaCrossLinks.module.css";

export const dynamic = "force-dynamic";

const SPA_CROSS_LINKS: Record<string, { label: string; href: string }[]> = {
  spa: [
    { label: "Explore Facials", href: "/spa/facials" },
    { label: "Explore Hair Care", href: "/spa/hair" },
    { label: "Explore Nail Care", href: "/spa/nails" },
  ],
  facials: [
    { label: "Explore Spa Treatment", href: "/spa/spa" },
    { label: "Explore Hair Care", href: "/spa/hair" },
    { label: "Explore Nail Care", href: "/spa/nails" },
  ],
  hair: [
    { label: "Explore Spa Treatment", href: "/spa/spa" },
    { label: "Explore Facials", href: "/spa/facials" },
    { label: "Explore Nail Care", href: "/spa/nails" },
  ],
  nails: [
    { label: "Explore Spa Treatment", href: "/spa/spa" },
    { label: "Explore Facials", href: "/spa/facials" },
    { label: "Explore Hair Care", href: "/spa/hair" },
  ],
};

export async function generateStaticParams() {
  const slugs = await getSpaSlugs();
  return slugs.map((slug) => ({ slug }));
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
  const data = await getSpaPageData(slug);
  if (!data) notFound();

  const { config, sessions_group } = data;
  const sessionCount = sessions_group.reduce((n, g) => n + (g.sessions?.length ?? 0), 0);
  const crossLinks = SPA_CROSS_LINKS[slug] ?? [];

  return (
    <>
      <PageHeader
        variant="programs"
        title={config.title}
        subtitle={config.subtitle}
        image={config.header_image}
      />
      <main>
        {sessionCount > 0 && (
          <SpaSessionsSection
            sessionGroups={sessions_group}
            ariaLabel={config.sessions_title}
          />
        )}
        {crossLinks.length > 0 && (
          <section className={styles.crossLinks} aria-label="Explore other services">
            <div className={styles.crossLinksInner}>
              <p className={styles.crossLinksLabel}>Explore Other Services</p>
              <div className={styles.crossLinksButtons}>
                {crossLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.crossLinkBtn}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
