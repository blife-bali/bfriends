"use client";

import styles from "./Intro.module.css";

const CONTENT_BLOCKS = [
  {
    title: "Data-Driven Assessment",
    body: "Gain valuable insights into your body's current condition through a comprehensive wellness assessment.",
  },
  {
    title: "Personalised Recommendations",
    body: "Receive tailored guidance based on your individual needs, goals, and lifestyle.",
  },
  {
    title: "Expert-Led Support",
    body: "Work alongside experienced wellness professionals who help you navigate every stage of your journey.",
  },
];

const DEFAULT_HEADLINE = "Feeling tired, out of balance, or stuck in a routine?";

export interface IntroProps {
  headline?: string;
  body?: string;
  showBlocks?: boolean;
}

export default function Intro({
  headline = DEFAULT_HEADLINE,
  showBlocks = false,
}: IntroProps) {
  return (
    <section className={`${styles.intro} ${styles.introTextOnly}`}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.heading}>{headline}</h2>
            {/* <p className={styles.description}>{body}</p> */}
            {/* {showCta && (
              <Button
                href="/about"
                className={styles.button}
                color="var(--color-blue-100)"
              >
                About Us
              </Button>
            )} */}
          </div>
        </div>

        {showBlocks && (
          <div className={styles.contentBlocks}>
            {CONTENT_BLOCKS.map((block, i) => (
              <div key={block.title} className={styles.contentBlock}>
                <span className={styles.contentBlockNumber}>0{i + 1}</span>
                <h3 className={styles.contentBlockTitle}>{block.title}</h3>
                <p className={styles.contentBlockBody}>{block.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
