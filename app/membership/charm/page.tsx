import PageHeader from "@/components/PageHeader/PageHeader";
import { Check } from "lucide-react";
import styles from "./Charm.module.css";

const PAGE_HEADER = {
  title: "The Charm",
  subtitle: "Curated access designed for your specific lifestyle rhythm.",
  image: "/images/hero-test.png",
};

const FEATURES = [
  "Credit-based class bookings",
  "Flexible usage for Café & Recovery",
  "Member rates for Beauty & Therapy",
  "Community event invites",
];

export default function CharmPage() {
  return (
    <>
      <PageHeader
        title={PAGE_HEADER.title}
        subtitle={PAGE_HEADER.subtitle}
        image={PAGE_HEADER.image}
      />
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.subtext}>{PAGE_HEADER.subtitle}</p>
          <ul className={styles.featureList} role="list">
            {FEATURES.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <Check className={styles.check} aria-hidden />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
