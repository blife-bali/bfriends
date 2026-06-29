import type { MockTreatment } from "@/mock/treatments";
import styles from "./Section.module.css";

interface AboutSectionProps {
  treatment: Pick<MockTreatment, "name" | "hero_headline" | "about_body">;
}

export default function AboutSection({ treatment }: AboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="treatment-about-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>About {treatment.name}</p>
        <h2 id="treatment-about-title" className={styles.title}>
          {treatment.hero_headline}
        </h2>
        <p className={styles.body}>{treatment.about_body}</p>
      </div>
    </section>
  );
}
