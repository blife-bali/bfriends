"use client";

import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import WhyCard from "./WhyCard";
import styles from "./WhyBFriends.module.css";
import { whyBFriendsData } from "@/lib/whybfriends-data";

export default function WhyBFriends() {
  // Split data into two columns (3 cards each)
  const leftColumnCards = whyBFriendsData.slice(0, 3);
  const rightColumnCards = whyBFriendsData.slice(3, 6);

  return (
    <section className={styles.section}>
      <div className={styles.mainContainer}>
        {/* Left Container - Sticky */}
        <div className={styles.leftContainer}>
          <p className={styles.eyebrow}>Why BFriends</p>
          <h2 className={styles.title}>Why <em>BFriends</em>?</h2>
          <p className={styles.subheading}>
            Discover meaningful connections with people who truly get you. 
            BFriends brings together like-minded individuals for authentic relationships.
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
