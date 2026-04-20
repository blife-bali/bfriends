"use client";

import Button from "@/components/ui/Button/Button";
import WhyCard from "./WhyCard";
import styles from "./WhyBFriends.module.css";
import { whyBFriendsData } from "@/lib/whybfriends-data";

export default function WhyBFriends({ cards = whyBFriendsData }: { cards?: any[] }) {
  const leftColumnCards = cards.filter((_, i) => [0, 2, 4].includes(i));
  const rightColumnCards = cards.filter((_, i) => [3, 4].includes(i));

  return (
    <section className={styles.section}>
      <div className={styles.mainContainer}>
        {/* Left Container - Sticky */}
        <div className={styles.leftContainer}>
          <p className={styles.eyebrow}>Core Philosophy</p>
          <h2 className={styles.title}>Why <em>BFriends</em>?</h2>
          <p className={styles.subheading}>
            Real progress doesn’t come from pressure. It comes from understanding what you need and
            responding with care. Like a good friend, we support you through every phase of your
            journey.
          </p>
          
        </div>

        {/* Cards Container */}
        <div className={styles.cardsWrapper}>
          <div className={styles.cardsContainer}>
            {/* Left Grid */}
            <div className={styles.cardsGrid}>
              {leftColumnCards.map((card) => (
                <WhyCard
                  key={card.id}
                  image={card.image}
                  title={card.point}
                  subheading={card.subpoint}
                />
              ))}
            </div>

            {/* Right Grid */}
            <div className={`${styles.cardsGrid} ${styles.cardsGridRight}`}>
              {rightColumnCards.map((card) => (
                <WhyCard
                  key={card.id}
                  image={card.image}
                  title={card.point}
                  subheading={card.subpoint}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
