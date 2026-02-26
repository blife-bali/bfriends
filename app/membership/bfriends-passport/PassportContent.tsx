"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Key, Briefcase, Users, Gift, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./BfriendsPassport.module.css";

const PHILOSOPHY_COPY =
  "Wellness doesn't happen in isolation. It happens in the flow between work, rest, and movement. The Passport is your seamless entry into the BLife, removing the friction between your ambition and your health.";

const passportBenefits = [
  {
    id: "bfriends",
    title: "BFriends",
    description: "Unlimited Classes (Flow, Nurture, Dare).",
    icon: Key,
  },
  {
    id: "bwork",
    title: "BWork",
    description: "Hot Desk Access & Meeting Room Credits.",
    icon: Briefcase,
  },
  {
    id: "community",
    title: "Community",
    description: "Exclusive Invites to 'The Table' & Workshops.",
    icon: Users,
  },
  {
    id: "perks",
    title: "Perks",
    description: "10% Off Nulook Treatments & BNesta Stays.",
    icon: Gift,
  },
];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function PassportContent() {
  const accessRef = useRef<HTMLElement>(null);
  const accessInView = useInView(accessRef, { once: true, amount: 0.15 });

  return (
    <>
      <section className={styles.philosophy} aria-label="Why Passport">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Why Passport</p>
          <div className={styles.philosophyLayout}>
            <div className={styles.philosophySticky}>
              <h2 className={styles.philosophyHeading}>Why Passport?</h2>
            </div>
            <p className={styles.philosophyText}>{PHILOSOPHY_COPY}</p>
          </div>
        </div>
      </section>

      <section ref={accessRef} className={styles.access} aria-label="Access">
        <div className={styles.container}>
          <p className={styles.eyebrow}>The Access Grid</p>
          <h2 className={styles.accessHeading}>The Access Grid</h2>
          <ul className={styles.accessGrid} role="list">
            {passportBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.li
                  key={benefit.id}
                  className={styles.accessCard}
                  initial={{ opacity: 0, y: 24 }}
                  animate={accessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: EASE,
                  }}
                >
                  <span className={styles.accessCardIcon} aria-hidden>
                    <Icon size={24} strokeWidth={1.5} />
                  </span>
                  <h3 className={styles.accessCardTitle}>{benefit.title}</h3>
                  <p className={styles.accessCardDesc}>{benefit.description}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.cta} aria-label="Apply">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Apply</p>
          <h2 className={styles.ctaHeading}>Join the Inner Circle.</h2>
          <Button
            href="/contact"
            color="var(--color-blue-100)"
            showIcon
          >
            Apply for Passport
          </Button>
        </div>
      </section>
    </>
  );
}
