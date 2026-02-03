"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.css";
import { NewsItem } from "@/lib/news-data";
import { ArrowUpRightIcon, CalendarFold, User } from "lucide-react";
import Button from "@/components/ui/Button/Button";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <div className={styles.imageTagOverlay}>
          <div className={styles.tagsRow}>
            <span className={styles.tag}>News</span>
            <span className={styles.tag}>{item.ecosystem}</span>
          </div>
        </div>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div className={styles.content}>
      
        <div className={styles.textBlock}>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <CalendarFold size={14} className={styles.infoIcon} />
              <time className={styles.infoText}>{item.date}</time>
            </div>
            <div className={styles.infoItem}>
              <User size={14} className={styles.infoIcon} />
              <span className={styles.infoText}>{item.author}</span>
            </div>
          </div>
          <h3 className={styles.title}>{item.title}</h3>
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="border" icon={<ArrowUpRightIcon size={20} />}>
          Read more
        </Button>
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
