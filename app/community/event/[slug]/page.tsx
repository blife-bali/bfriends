import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { eventData } from "@/lib/event-data";
import { getEventBySlug, getEvents } from "@/lib/cms";
import EventCard from "@/components/EventCard/EventCard";
import ShareBlock from "@/components/ShareBlock/ShareBlock";
import styles from "./Article.module.css";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e: any) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const title = event.seo_title || `${event.name} | BFriends`;
  const description =
    event.seo_description ||
    event.text?.replace(/\n/g, " ").slice(0, 160) ||
    `Join ${event.name} at BFriends.`;

  return {
    title,
    description,
    openGraph: { title, description, images: event.image ? [{ url: event.image }] : [] },
  };
}

export default async function EventSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const paragraphs = event.text
    .split(/\n\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  const allEvents = await getEvents();
  const others = allEvents.filter((e: any) => String(e.id) !== String(event.id)).slice(0, 3);
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
            {paragraphs.map((p: string, i: number) => (
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
