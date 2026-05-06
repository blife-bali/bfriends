import styles from "./JournalPageHeader.module.css";

export type JournalPageHeaderKind = "events" | "news";

export type JournalFeaturedItem = {
  slug: string;
  name: string;
  text?: string | null;
  image?: string | null;
  ecosystem?: string | null;
  date?: string | null;
  time?: string | null;
  timestamp?: string | null;
};

const HERO_COPY: Record<
  JournalPageHeaderKind,
  { title: string; description: string }
> = {
  events: {
    title: "Event and Workshop",
    description:
      "Workshop, gatherings, wellness sessions, and shared experiences within the BFriends community",
  },
  news: {
    title: "The Bfriends Journal",
    description:
      "A collection of stories, rituals, movement, and meaningful experiences from the BFriends Community",
  },
};

export type JournalPageHeaderProps = {
  kind: JournalPageHeaderKind;
  /** Latest entry image for hero background when present. */
  featured: JournalFeaturedItem | null;
  /** When there is no featured image, often from CMS page header. */
  headerImage?: string | null;
  fallbackImage?: string;
  /** Override title from CMS page header. */
  overrideTitle?: string | null;
  /** Override description from CMS page header. */
  overrideDescription?: string | null;
};

export default function JournalPageHeader({
  kind,
  featured,
  headerImage,
  fallbackImage = "/images/hero-test.webp",
  overrideTitle,
  overrideDescription,
}: JournalPageHeaderProps) {
  const bgImage = featured?.image?.trim() || headerImage?.trim() || fallbackImage;
  const fallback = HERO_COPY[kind];
  const title = overrideTitle?.trim() || fallback.title;
  const description = overrideDescription?.trim() || fallback.description;

  return (
    <section className={styles.hero}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}
