import type { Metadata } from "next";
import FAQItem from "./faq-item";
import styles from "./page.module.css";
import { getFaqs } from "@/lib/cms";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQs | BFriends",
    description: "Frequently asked questions about BFriends programs, location, booking, and wellness ecosystem.",
  };
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Support</p>
          <h1 className={styles.title}>Curious about how BFriends works?</h1>
          <p className={styles.intro}>
            From assessments and personalized programs to facilities and memberships, here are answers to the questions we hear most often.
          </p>
        </header>

        <section className={styles.list} aria-label="Frequently asked questions list">
          {faqs.map((item: any, index: number) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
