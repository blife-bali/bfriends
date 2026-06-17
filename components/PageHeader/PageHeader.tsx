"use client";

import clsx from "clsx";
import Button from "@/components/ui/Button/Button";
import { BOOK_NOW_URL } from "@/lib/site-contact";
import styles from "./PageHeader.module.css";

export type PageHeaderVariant = "image" | "noImage" | "programs";

type PageHeaderProgramsProps = {
  variant: "programs";
  title: string;
  image?: string;
  showBookNowButton?: boolean;
  subtitle?: never;
  breadcrumb?: never;
};

type PageHeaderDefaultProps = {
  variant?: Exclude<PageHeaderVariant, "programs">;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  image?: string;
  cta?: { label: string; href: string };
};

export type PageHeaderProps = PageHeaderProgramsProps | PageHeaderDefaultProps;

export default function PageHeader(props: PageHeaderProps) {
  const isPrograms = props.variant === "programs";
  const image = props.image;
  const variant = isPrograms ? undefined : props.variant;

  const useImage =
    variant === "noImage"
      ? false
      : isPrograms
        ? Boolean(image)
        : variant === "image" || Boolean(image);

  const sectionClass = clsx(styles.pageHeader, !useImage && styles.pageHeaderNoImage);

  const title = props.title;
  const subtitle = !isPrograms ? props.subtitle : undefined;
  const breadcrumb = !isPrograms ? props.breadcrumb : undefined;
  const cta = !isPrograms ? props.cta : undefined;
  const showBookNowButton = isPrograms ? props.showBookNowButton !== false : false;

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
      <div
        className={clsx(
          styles.content,
          !useImage && styles.contentNoImage,
          isPrograms && styles.contentPrograms
        )}
      >
        {isPrograms ? (
          <>
            <p className={styles.programsEyebrow}>BFriends</p>
            <h1 className={styles.title}>{title}</h1>
            {showBookNowButton && (
              <Button
                href={BOOK_NOW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.programsBookButton}
                color={useImage ? "var(--color-white-100)" : undefined}
              >
                Book Now
              </Button>
            )}
          </>
        ) : (
          <>
            {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {cta && (
              <Button
                href={cta.href}
                color="var(--color-white-100)"
                className={styles.headerCta}
              >
                {cta.label}
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
}