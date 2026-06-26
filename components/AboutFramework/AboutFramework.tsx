import styles from "./AboutFramework.module.css";

type Pillar = {
  name: string;
  body: string;
};

const DEFAULT_PILLARS: Pillar[] = [
  {
    name: "Feel Better",
    body: "Support recovery, balance, and overall wellbeing.",
  },
  {
    name: "Move Better",
    body: "Build strength, mobility, and resilience through purposeful movement.",
  },
  {
    name: "Look Better",
    body: "Enhance confidence through personalized beauty and self-care experiences.",
  },
  {
    name: "Live Better",
    body: "Develop sustainable habits that support long-term wellness.",
  },
];

export interface AboutFrameworkProps {
  eyebrow?: string;
  heading?: string;
  sub?: string;
  pillars?: Pillar[];
}

export default function AboutFramework({
  eyebrow = "Wellness",
  heading = "Wellness Designed Around Your Goals",
  sub = "Every programme, services and recommendations at BFriends is designed to support one or more dimensions of wellbeing.",
  pillars = DEFAULT_PILLARS,
}: AboutFrameworkProps) {
  return (
    <section className={styles.section} aria-label="Wellness framework">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <div className={styles.headerGrid}>
            <h2 className={styles.title}>{heading}</h2>
            <p className={styles.lead}>{sub}</p>
          </div>
        </header>

        <ol className={styles.pillars}>
          {pillars.map((pillar, index) => (
            <li key={pillar.name} className={styles.pillar}>
              <span className={styles.pillarIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.pillarBody}>
                <h3 className={styles.pillarName}>{pillar.name}</h3>
                <p className={styles.pillarText}>{pillar.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
