import Image from "next/image";
import Button from "@/components/ui/Button/Button";
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

const DEFAULT_IMAGE = "/images/Integrate/DDK09585.webp";

export interface AboutFrameworkProps {
  eyebrow?: string;
  heading?: string;
  sub?: string;
  pillars?: Pillar[];
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
}

export default function AboutFramework({
  eyebrow = "Feel. Move. Look. Live.",
  heading = "Wellness Designed Around Your Goals",
  sub = "Every programme, service, and recommendation at BFriends is designed to support one or more dimensions of wellbeing.",
  pillars = DEFAULT_PILLARS,
  ctaLabel = "Explore Programmes",
  ctaHref = "/programs",
  image = DEFAULT_IMAGE,
}: AboutFrameworkProps) {
  return (
    <section className={styles.section} aria-label="Feel. Move. Look. Live.">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.header}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h2 className={styles.heading}>{heading}</h2>
              <p className={styles.sub}>{sub}</p>
            </div>

            <ol className={styles.pillars}>
              {pillars.map((pillar, index) => (
                <li key={pillar.name} className={styles.pillar}>
                  <div className={styles.pillarTop}>
                    <span className={styles.pillarIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={styles.pillarName}>{pillar.name}</h3>
                  </div>
                  <p className={styles.pillarText}>{pillar.body}</p>
                </li>
              ))}
            </ol>

            <div className={styles.ctaRow}>
              <Button
                variant="border"
                href={ctaHref}
                color="var(--color-blue-100)"
                className={styles.cta}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <Image
            src={image}
            alt=""
            fill
            className={styles.image}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
