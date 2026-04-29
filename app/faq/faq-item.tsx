import styles from "./faq-item.module.css";
import { Plus } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export default function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  return (
    <details className={styles.item} open={defaultOpen}>
      <summary className={styles.summary}>
        <span className={styles.question}>{question}</span>
        <span className={styles.icon} aria-hidden>
          <Plus size={18} strokeWidth={2} />
        </span>
      </summary>
      <div className={styles.answerWrap}>
        <div className={styles.answerInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </details>
  );
}
