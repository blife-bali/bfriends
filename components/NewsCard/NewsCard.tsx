"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.css";
import type { NewsItem } from "@/lib/news-data";

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
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      <Link href={href} className={styles.link}>
        {content}
      </Link>
    </article>
  );
}
