"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Manifesto.module.css";

const HEADLINE = "We Don't Build a New You. We Return You to Your Best Self.";
const BODY =
  "The industry sells transformation as a departure. We see it as a return. BFriends is built on the belief that your best self isn't something to invent—it's something to recover.";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const words = HEADLINE.split(" ");

  return (
    <section ref={ref} className={styles.section} aria-label="The manifesto">
      <div className={styles.container}>
        <div className={styles.statement}>
          <p className={styles.eyebrow}>The Manifesto</p>
          <h2 className={styles.headline}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                className={styles.headlineLine}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className={styles.body}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: words.length * 0.04 + 0.1,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {BODY}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
