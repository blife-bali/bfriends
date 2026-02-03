"use client";

import styles from "./Section.module.css";
import { eventData } from "@/lib/event-data";
import { newsData } from "@/lib/news-data";
import EventCard from "@/components/EventCard/EventCard";
import NewsCard from "@/components/NewsCard/NewsCard";
import Button from "@/components/ui/Button/Button";
import { ArrowUpRightIcon } from "lucide-react";

type Item = { type: "event" | "news"; index: number };

export default function Section() {
  // Interleave events and news by index
  const allItems: Item[] = [];

  // Find max index
  const maxIndex = Math.max(
    ...eventData.map((e) => e.index),
    ...newsData.map((n) => n.index)
  );

  // Interleave items
  for (let i = 1; i <= maxIndex; i++) {
    const event = eventData.find((e) => e.index === i);
    const news = newsData.find((n) => n.index === i);

    if (event) allItems.push({ type: "event", index: i });
    if (news) allItems.push({ type: "news", index: i });
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            News & Events <em>Accross BLife Ecosystem</em>
          </h2>
        </div>

        <div className={styles.list}>
          {allItems.map((item) =>
            item.type === "event" ? (
              <EventCard
                key={`event-${item.index}`}
                item={eventData.find((e) => e.index === item.index)!}
              />
            ) : (
              <NewsCard
                key={`news-${item.index}`}
                item={newsData.find((n) => n.index === item.index)!}
              />
            )
          )}
        </div>

        <div className={styles.moreButtonWrapper}>
          <Button variant="border" color='var(--color-green)' icon={<ArrowUpRightIcon size={20} />}>
            More news and events
          </Button>
        </div>
      </div>
    </section>
  );
}
