"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Key, Briefcase, Users, Gift, Heart, Star, Shield, Sparkles, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import styles from "./BfriendsPassport.module.css";

const ICON_MAP: Record<string, any> = { Key, Briefcase, Users, Gift, Heart, Star, Shield, Sparkles };

const DEFAULT_PHILOSOPHY_COPY =
  "Wellness doesn't happen in isolation. It happens in the fitness rhythm between work, rest, and movement. The Passport is your seamless entry into the BLife, removing the friction between your ambition and your health.";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type BenefitItem = {
  id?: number | string;
  title: string;
  description: string;
  icon_name?: string;
};

export default function PassportContent({
  philosophyCopy = DEFAULT_PHILOSOPHY_COPY,
  benefits = [],
}: {
  philosophyCopy?: string;
  benefits?: BenefitItem[];
}) {
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
            <p className={styles.philosophyText}>{philosophyCopy}</p>
          </div>
        </div>
      </section>

      <section ref={accessRef} className={styles.access} aria-label="Access">
        <div className={styles.container}>
          <p className={styles.eyebrow}>The Access Grid</p>
          <h2 className={styles.accessHeading}>The Access Grid</h2>
          <ul className={styles.accessGrid} role="list">
            {benefits.map((benefit, i) => {
              const Icon = ICON_MAP[benefit.icon_name || "Key"] || Key;
              return (
                <motion.li
                  key={benefit.id ?? benefit.title}
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
          >
            Apply for Passport
          </Button>
        </div>
      </section>
    </>
  );
}