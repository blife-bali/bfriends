"use client";

import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image: string;
}

export default function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <section className={styles.pageHeader}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className={styles.overlay} aria-hidden />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
