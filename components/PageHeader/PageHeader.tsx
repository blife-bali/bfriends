"use client";

import styles from "./PageHeader.module.css";

export type PageHeaderVariant = "image" | "noImage";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  /** When provided, header uses image variant (full-height hero). When omitted, uses noImage variant (60vh, no background). */
  image?: string;
  /** Optional: force variant. If not set, variant is inferred from presence of `image`. */
  variant?: PageHeaderVariant;
}

export default function PageHeader({ title, subtitle, breadcrumb, image, variant }: PageHeaderProps) {
  const useImage = variant === "image" || (variant !== "noImage" && image);
  const sectionClass = useImage ? styles.pageHeader : `${styles.pageHeader} ${styles.pageHeaderNoImage}`;

  return (
    <section className={sectionClass}>
      {useImage && image && (
        <>
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden
          />
          <div className={styles.overlay} aria-hidden />
        </>
      )}
      <div className={`${styles.content} ${!useImage ? styles.contentNoImage : ""}`}>
        {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
