import PillarCard from "./pillar-card/PillarCard";
import styles from "./ThreePillars.module.css";
import type { AboutPillar } from "@/lib/supabase-content";

export default function ThreePillars({ pillars }: { pillars: AboutPillar[] }) {
  return (
    <section className={styles.section} aria-label="Explore BFriends">
      <div className={styles.grid}>
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.id}
            image={pillar.image}
            imageAlt={pillar.imageAlt}
            title={pillar.title}
            description={pillar.description}
            buttonLabel={pillar.buttonLabel}
            href={pillar.href}
          />
        ))}
      </div>
    </section>
  );
}
