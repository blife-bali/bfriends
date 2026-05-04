"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.css";
import type { NewsItem } from "@/lib/news-data";
import { trackEvent } from "@/lib/gtag";

export interface NewsCardProps {
  item: NewsItem;
  landscape?: boolean;
  hideDescription?: boolean;
}

export default function NewsCard({
  item,
  landscape = false,
  hideDescription = false,
}: NewsCardProps) {
  const href = `/community/news/${item.slug}`;

  const content = (
    <>
      <div className={styles.imageWrap}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.categoryTag}>{item.ecosystem} News</span>
        <h3 className={styles.title}>{item.name}</h3>
        {!hideDescription && <p className={styles.description}>{item.text}</p>}
        <time className={styles.date}>{item.timestamp}</time>
        {item.author && <span className={styles.author}>{item.author}</span>}
      </div>
    </>
  );

  return (
    <article className={`${styles.card} ${landscape ? styles.landscape : ""}`}>
      <Link
        href={href}
        className={styles.link}
        onClick={() => trackEvent('card_click', { card_type: 'news', slug: item.slug })}
      >
        {content}
      </Link>
    </article>
  );
}
