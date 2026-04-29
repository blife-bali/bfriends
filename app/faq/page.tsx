import type { Metadata } from "next";
import FAQItem from "./faq-item";
import styles from "./page.module.css";

const FAQS = [
  {
    question: "What is BFriends?",
    answer:
      "BFriends is a precision-driven wellness ecosystem in Bali that combines training, recovery, therapy, beauty, and community under one integrated experience.",
  },
  {
    question: "Where is BFriends located?",
    answer:
      "BFriends is located in Kerobokan, Bali. Exact maps, access details, and opening hours are shared through the contact and location channels on our site.",
  },
  {
    question: "Do I need a membership to join programs?",
    answer:
      "You can join selected programs without a full membership, while members receive broader access, preferred slots, and ecosystem pricing across services.",
  },
  {
    question: "How do I book events and workshops?",
    answer:
      "You can explore upcoming sessions from the Community pages and register directly on each event detail page. If a session is full, you can join the waiting list.",
  },
  {
    question: "Can beginners join BFriends programs?",
    answer:
      "Yes. Our team supports every level, from beginners to advanced participants. We help match you with the right track based on your goals and current condition.",
  },
  {
    question: "How can I stay updated on new announcements?",
    answer:
      "Follow the News & Events section for the latest updates across the BLife ecosystem, including launches, collaborations, workshops, and community stories.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQs | BFriends",
    description: "Frequently asked questions about BFriends programs, location, booking, and wellness ecosystem.",
  };
}

export default function FaqPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Support</p>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <p className={styles.intro}>
            Find quick answers about BFriends services, bookings, and what to expect when joining our ecosystem.
          </p>
        </header>

        <section className={styles.list} aria-label="Frequently asked questions list">
          {FAQS.map((item, index) => (
            <FAQItem
              key={item.question}
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
