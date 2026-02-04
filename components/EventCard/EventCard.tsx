"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./EventCard.module.css";
import { EventItem } from "@/lib/event-data";
import { ArrowUpRightIcon, CalendarFold, Clock2 } from "lucide-react";
import Button from "@/components/ui/Button/Button";

interface EventCardProps {
  item: EventItem;
}

export default function EventCard({ item }: EventCardProps) {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <div className={styles.imageTagOverlay}>
          <div className={styles.tagsRow}>
            <span className={styles.tag}>Event</span>
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
            {item.time && (
              <div className={styles.infoItem}>
                <Clock2 size={14} className={styles.infoIcon} />
                <span className={styles.infoText}>{item.time}</span>
              </div>
            )}
          </div>
          <h3 className={styles.title}>{item.title}</h3>
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>
      
      <div className={styles.buttonWrapper}>
          <Button variant="primary" icon={<ArrowUpRightIcon size={20} />}>
            Read More
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
