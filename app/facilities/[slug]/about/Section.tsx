import type { MockFacility } from "@/mock/facilities";
import styles from "./Section.module.css";

interface AboutSectionProps {
  facility: Pick<MockFacility, "name" | "hero_headline" | "about_body">;
}

export default function AboutSection({ facility }: AboutSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="facility-about-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>About {facility.name}</p>
        <h2 id="facility-about-title" className={styles.title}>
          {facility.hero_headline}
        </h2>
        <p className={styles.body}>{facility.about_body}</p>
      </div>
    </section>
  );
}
