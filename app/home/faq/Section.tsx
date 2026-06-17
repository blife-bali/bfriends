"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./Section.module.css";

type FaqItem = { id: number | string; question: string; answer: string };

export default function Section({ faqs = [] }: { faqs?: FaqItem[] }) {
  const [openId, setOpenId] = useState<number | string | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 className={styles.heading}>Frequently Asked Questions</h2>
          <p className={styles.sub}>
            Find answers to common questions about our programmes, treatments,
            membership options, and booking process.
          </p>
          <Button href="/faq" color="var(--color-blue-100)" className={styles.faqButton}>
            See All FAQs
          </Button>
        </div>

        <div className={styles.items}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className={styles.item}>
                <button
                  type="button"
                  className={styles.question}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <ChevronDown
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </button>
                <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}>
                  <div className={styles.answerInner}>
                    <p className={styles.answerText}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {faqs.length === 0 && (
            <p className={styles.empty}>No FAQs available at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
}
