"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./EventCard.module.css";
import type { EventItem } from "@/lib/event-data";

export interface EventCardProps {
  item: EventItem;
}

export default function EventCard({ item }: EventCardProps) {
  const href = `/community/event/${item.slug}`;

  const content = (
    <>
      <div className={styles.imageWrap}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.categoryTag}>{item.ecosystem} Events</span>
        <h3 className={styles.title}>{item.name}</h3>
        <p className={styles.description}>{item.text}</p>
        <time className={styles.date}>{item.date} · {item.time}</time>
      </div>
    </>
  );

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.link}>
        {content}
      </Link>
    </article>
  );
}
