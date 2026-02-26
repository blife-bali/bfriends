"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./EventCard.module.css";
import type { EventItem } from "@/lib/event-data";

export interface EventCardProps {
  item: EventItem;
}

export default function EventCard({ item }: EventCardProps) {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.categoryTag}>{item.ecosystem} Events</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <time className={styles.date}>{item.date}</time>
      </div>
    </>
  );

  return (
    <article className={styles.card}>
      {item.href ? (
        <Link href={item.href} className={styles.link}>
          {content}
        </Link>
      ) : (
        <div className={styles.link}>{content}</div>
      )}
    </article>
  );
}
