"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./IntegratedSelf.module.css";

const KICKER = "The Connection";
const HEADLINE = "Internal Health, External Radiance.";
const BODY =
  "True beauty is a signal of health. By combining 'The Friend Flow' workouts with clinical skin imaging and restorative nutrition, we bridge the gap between how you perform and how you look.";
const IMAGE_SRC = "/images/hero-test.png";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function IntegratedSelf() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.section} aria-label="The integrated self">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <Image
              src={IMAGE_SRC}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.image}
            />
          </motion.div>
          <div className={styles.textCol}>
            <motion.p
              className={styles.eyebrow}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {KICKER}
            </motion.p>
            <motion.h2
              className={styles.heading}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {HEADLINE}
            </motion.h2>
            <motion.p
              className={styles.body}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {BODY}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
