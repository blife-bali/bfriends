import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { eventData, getEventBySlug } from "@/lib/event-data";
import EventCard from "@/components/EventCard/EventCard";
import ShareBlock from "@/components/ShareBlock/ShareBlock";
import styles from "./Article.module.css";

export function generateStaticParams() {
  return eventData.map((e) => ({ slug: e.slug }));
}

export default async function EventSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const paragraphs = event.text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const others = eventData.filter((e) => e.id !== event.id).slice(0, 3);
  const path = `/community/event/${event.slug}`;

  return (
    <main className={styles.section}>
      {/* Custom header: title + tags + hero image */}
      <header className={styles.header}>
        <h1 className={styles.title}>{event.name}</h1>
        <div className={styles.tags}>
          <span className={styles.tag}>{event.ecosystem} Events</span>
        </div>
        {event.image && (
          <div className={styles.heroImageWrap}>
            <Image
              src={event.image}
              alt={event.name}
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
              <strong>{event.date}</strong> · {event.time}
            </p>
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
          <ShareBlock path={path} title={event.name} />
        </div>

        <div className={styles.backBlock}>
          <Link href="/community/event-workshop" className={styles.backLink}>
            ← Back to Event & Workshop
          </Link>
        </div>

        {others.length > 0 && (
          <section className={styles.othersSection} aria-label="Other events">
            <h2 className={styles.othersTitle}>Other events</h2>
            <div className={styles.othersGrid}>
              {others.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
