"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./BLifeEcosystem.module.css";

const ECOSYSTEM_ITEMS = [
  {
    id: "bnesta",
    label: "01 / BNesta",
    desc: "Sanctuary. Private villas designed for quiet living and the restoration of personal rhythm.",
    url: "https://bnesta.id",
  },
  {
    id: "blive",
    label: "02 / BLive",
    desc: "Connection. Long-stay environments where daily routine meets shared community.",
    url: "https://blive.id",
  },
  {
    id: "bwork",
    label: "03 / BWork",
    desc: "Focus. Calm, curated atmospheres crafted for creativity and deep work.",
    url: "https://bwork.id",
  },
  {
    id: "bfriends",
    label: "04 / BFriends",
    desc: "Vitality. The heartbeat of movement, recovery, and daily wellness.",
    url: "https://bfriends.id",
  },
  {
    id: "alam",
    label: "05 / Alam Kulkul",
    desc: "Heritage. A retreat rooted in the wisdom of Balinese nature and culture.",
    url: "https://alamkulkul.com",
  },
  {
    id: "nulook",
    label: "06 / Nulook",
    desc: "Precision. Aesthetic science approached with medical responsibility and care.",
    url: "https://nulook.co.id",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BLifeEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className={styles.section} aria-label="The BLife ecosystem">
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>The Ecosystem</p>
          <h2 className={styles.headerTitle}>Distinct Roles. One Rhythm.</h2>
        </motion.header>
        <ul className={styles.list}>
          {ECOSYSTEM_ITEMS.map((item, i) => (
            <motion.li
              key={item.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{
                duration: 0.5,
                delay: 0.06 + i * 0.06,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
                title="Visit"
              >
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.itemDesc}>{item.desc}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
