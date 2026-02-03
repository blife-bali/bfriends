"use client";

import styles from "./Section.module.css";
import { eventData } from "@/lib/event-data";
import { newsData } from "@/lib/news-data";
import EventCard from "@/components/EventCard/EventCard";
import NewsCard from "@/components/NewsCard/NewsCard";

export default function Section() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>News & Events</p>
          <h2 className={styles.heading}>
            Stay <em>Connected</em>
          </h2>
        </div>

        <div className={styles.list}>
          {eventData.map((item) => (
            <EventCard key={item.id} item={item} />
          ))}
          {newsData.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
