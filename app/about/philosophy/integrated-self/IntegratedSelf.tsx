"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./IntegratedSelf.module.css";

const DEFAULT_HEADLINE = "Internal Health, External Radiance.";
const DEFAULT_BODY =
  "True beauty is a signal of health. By combining 'The Friend Flow' workouts with clinical skin imaging and restorative nutrition, we bridge the gap between how you perform and how you look.";
const DEFAULT_IMAGE = "/images/connection.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function IntegratedSelf({
  headline = DEFAULT_HEADLINE,
  body = DEFAULT_BODY,
  image = DEFAULT_IMAGE,
}: {
  headline?: string;
  body?: string;
  image?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.section} aria-label="The integrated self">
      <div className={styles.container}>
        <div className={styles.grid}>
          <motion.div
            className={styles.imageCol}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <Image
              src={image || DEFAULT_IMAGE}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              quality={100}
              unoptimized
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
              The Connection
            </motion.p>
            <motion.h2
              className={styles.heading}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {headline}
            </motion.h2>
            <motion.p
              className={styles.body}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {body}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
