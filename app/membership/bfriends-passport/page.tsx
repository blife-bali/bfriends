import PageHeader from "@/components/PageHeader/PageHeader";
import { Check } from "lucide-react";
import styles from "./BfriendsPassport.module.css";

const PAGE_HEADER = {
  title: "The Passport",
  subtitle: "Your key to the entire BFriends ecosystem. No boundaries, just flow.",
  image: "/images/hero-test.png",
};

const FEATURES = [
  "Unlimited access to Flow (Fitness)",
  "Priority booking for Integrate & Enhance",
  "Exclusive access to Dare events",
  "Global lounge access",
];

export default function BFriendsPassportPage() {
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
