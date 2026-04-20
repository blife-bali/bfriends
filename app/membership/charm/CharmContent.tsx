"use client";

import styles from "./Charm.module.css";

const DEFAULT_TIERS = [
  { id: "spark", name: "Spark", tagline: "The Introduction.", credits: 3, bonus: "Perfect for a weekend reset.", is_popular: false },
  { id: "glow", name: "Glow", tagline: "The Ritual.", credits: 10, bonus: "Save 15% vs Drop-in. For consistent maintenance.", is_popular: true },
  { id: "radiance", name: "Radiance", tagline: "The Transformation.", credits: 25, bonus: "Save 20% vs Drop-in. For a complete overhaul.", is_popular: false },
];

const DEFAULT_USAGE = [
  { service: "Skin Imaging", credits: 1 },
  { service: "Group Class (Flow, Nurture)", credits: 1 },
  { service: "K-Glow Facial", credits: 2 },
  { service: "Private Pilates", credits: 2 },
  { service: "Manual Physiotherapy (45 min)", credits: 2 },
  { service: "Advanced Laser Session", credits: 3 },
  { service: "Full Body Recovery Package", credits: 4 },
];

export default function CharmContent({ tiers = DEFAULT_TIERS, usageItems = DEFAULT_USAGE }: { tiers?: any[]; usageItems?: any[] }) {
  return (
    <>
      <section className={styles.concept} aria-label="The Concept">
        <div className={styles.container}>
          <p className={styles.eyebrow}>The Concept</p>
          <h2 className={styles.conceptHeading}>{CONCEPT_HEADING}</h2>
          <p className={styles.conceptCopy}>{CONCEPT_COPY}</p>
        </div>
      </section>

      <section className={styles.tiers} aria-label="Credit Tiers">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Credit Tiers</p>
          <h2 className={styles.tiersHeading}>The Tiers</h2>
          <div className={styles.tiersGrid}>
            {tiers.map((tier) => (
              <article
                key={tier.id ?? tier.name}
                className={`${styles.tierCard} ${(tier.is_popular || tier.popular) ? styles.tierCardPopular : ""}`}
              >
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierTagline}>{tier.tagline}</p>
                <p className={styles.tierCredits}>{tier.credits}</p>
                <p className={styles.tierCreditsLabel}>Credits</p>
                {tier.bonus && (
                  <p className={styles.tierBonus}>{tier.bonus}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.usage} aria-label="What can I use credits for?">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Usage</p>
          <h2 className={styles.usageHeading}>What can I use credits for?</h2>
          <ul className={styles.usageList} role="list">
            {usageItems.map((item) => (
              <li key={item.service} className={styles.usageItem}>
                <span className={styles.usageService}>{item.service}</span>
                <span className={styles.usageCredits}>
                  {item.credits} Credit{item.credits !== 1 ? "s" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
