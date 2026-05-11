import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getNewsBySlug, getNews } from "@/lib/cms";

export const dynamic = "force-dynamic";
import NewsCard from "@/components/NewsCard/NewsCard";
import ShareBlock from "@/components/ShareBlock/ShareBlock";
import styles from "./Article.module.css";

export async function generateStaticParams() {
  const news = await getNews();
  return (news as any[]).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return {};

  const title = (news as any).seo_title || `${(news as any).name} | BFriends`;
  const description =
    (news as any).seo_description ||
    (news as any).text?.replace(/\n/g, " ").slice(0, 160) ||
    `Read ${(news as any).name} on BFriends.`;

  return {
    title,
    description,
    openGraph: { title, description, images: (news as any).image ? [{ url: (news as any).image }] : [] },
  };
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) notFound();

  const n = news as any;
  const paragraphs = n.text
    .split(/\n\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  const allNews = await getNews();
  const others = (allNews as any[]).filter((item) => String(item.id) !== String(n.id)).slice(0, 3);
  const path = `/community/news/${n.slug}`;

  return (
    <main className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>{n.name}</h1>
        <div className={styles.tags}>
          <span className={styles.tag}>{n.ecosystem} News</span>
        </div>
        {n.image && (
          <div className={styles.heroImageWrap}>
            <Image
              src={n.image}
              alt={n.name}
              fill
              className={styles.heroImage}
              sizes="(max-width: 768px) 100vw, min(90vw, 900px)"
              priority
            />
          </div>
        )}
      </header>

      <article className={styles.container}>
        <div className={styles.contentLayout}>
          <aside className={styles.metaColumn}>
            <p className={styles.metaItem}>
              By <strong>{n.author}</strong>
            </p>
            <p className={styles.metaItem}>{n.timestamp}</p>
          </aside>
          <div className={styles.body}>
            {paragraphs.map((p: string, i: number) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.shareWrap}>
          <ShareBlock path={path} title={n.name} />
        </div>

        <div className={styles.backBlock}>
          <Link href="/community/journal" className={styles.backLink}>
            ← Back to BFriends Journal
          </Link>
        </div>

        {others.length > 0 && (
          <section className={styles.othersSection} aria-label="Other articles">
            <h2 className={styles.othersTitle}>Other articles</h2>
            <div className={styles.othersGrid}>
              {others.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
