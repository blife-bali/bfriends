"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import FacilityAccordionItem from "./FacilityAccordionItem";
import { mockFacilities, mockFacilitiesPage } from "@/mock/facilities";
import styles from "./Section.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function FriendsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.06 });
  const facilities = [...mockFacilities].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section ref={ref} className={styles.section} aria-label="BFriends facilities">
      <div className={styles.container}>
        <div className={styles.split}>
          <motion.aside
            className={styles.introCol}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h2 className={styles.title}>{mockFacilitiesPage.intro_title}</h2>
            <p className={styles.body}>{mockFacilitiesPage.intro_body}</p>
            <Button href="/about/facilities" color="var(--color-blue-100)" className={styles.cta}>
              Explore Facilities
            </Button>
          </motion.aside>

          <motion.div
            className={styles.listCol}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {facilities.map((facility) => (
              <FacilityAccordionItem
                key={facility.id}
                name={facility.name}
                pillarLabel={facility.pillarLabel}
                floor={facility.floor}
                image={facility.image}
                description={facility.sub}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
