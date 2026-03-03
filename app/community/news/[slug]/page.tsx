import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsData, getNewsBySlug } from "@/lib/news-data";
import NewsCard from "@/components/NewsCard/NewsCard";
import ShareBlock from "@/components/ShareBlock/ShareBlock";
import styles from "./Article.module.css";

export function generateStaticParams() {
  return newsData.map((n) => ({ slug: n.slug }));
}

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);
  if (!news) notFound();

  const paragraphs = news.text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const others = newsData.filter((n) => n.id !== news.id).slice(0, 3);
  const path = `/community/news/${news.slug}`;

  return (
    <main className={styles.section}>
      {/* Custom header: title + tags + hero image */}
      <header className={styles.header}>
        <h1 className={styles.title}>{news.name}</h1>
        <div className={styles.tags}>
          <span className={styles.tag}>{news.ecosystem} News</span>
        </div>
        {news.image && (
          <div className={styles.heroImageWrap}>
            <Image
              src={news.image}
              alt={news.name}
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
              By <strong>{news.author}</strong>
            </p>
            <p className={styles.metaItem}>{news.timestamp}</p>
          </aside>
          <div className={styles.body}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.shareWrap}>
          <ShareBlock path={path} title={news.name} />
        </div>

        <div className={styles.backBlock}>
          <Link href="/community/blife-ecosystem-news" className={styles.backLink}>
            ← Back to BLife Ecosystem News
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
