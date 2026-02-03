"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.css";
import { NewsItem } from "@/lib/news-data";
import { ArrowUpRightIcon } from "lucide-react";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.tagsRow}>
          <span className={styles.tag}>News</span>
          <span className={styles.tag}>{item.ecosystem}</span>
        </div>
        <div className={styles.textBlock}>
          <time className={styles.date}>{item.date}</time>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </div>
        <span className={styles.button}>
          Read more
          <ArrowUpRightIcon size={20} className={styles.buttonIcon} />
        </span>
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
