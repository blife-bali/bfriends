"use client";

import Button from "@/components/ui/Button/Button";
import styles from "./Section.module.css";

export default function Section() {
  return (
    <section className={styles.section}>
      <div className={styles.gridOverlay} aria-hidden />
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Do you have a question?
          <br />
          <em>Find the answer here</em>
        </h2>
        <Button
          href="/faq"
          color="var(--color-blue-100)"
          showIcon
          className={styles.faqButton}
        >
          FAQs
        </Button>
      </div>
    </section>
  );
}
