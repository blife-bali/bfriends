"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import EcosystemCard from "./EcosystemCard";
import { getEcosystemHref, normalizeEcosystemName } from "@/lib/site-ecosystem-links";
import styles from "./BLifeEcosystem.module.css";

interface EcosystemItem {
  id: number | string;
  name: string;
  description: string;
  image?: string | null;
  url?: string | null;
  pillar?: string | null;
  button_label?: string | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ECOSYSTEM_IMAGE_BY_NAME: Array<{ match: RegExp; image: string }> = [
  { match: /^bwork$/, image: "/ecosystem/bwork.webp" },
  { match: /^blive$/, image: "/ecosystem/blive.webp" },
  { match: /^bnesta$/, image: "/ecosystem/bnesta.jpg" },
  { match: /^bfriends$/, image: "/ecosystem/bfriends.webp" },
  { match: /^bwellness$/, image: "/ecosystem/bwellness.png" },
  { match: /^nulook$/, image: "/ecosystem/nulook.webp" },
  { match: /^alamk?ulkul$/, image: "/ecosystem/alamkulkul.jpg" },
];

const ECOSYSTEM_PILLAR_BY_NAME: Array<{ match: RegExp; pillar: string }> = [
  { match: /^bwork$/, pillar: "Work" },
  { match: /^blive$/, pillar: "Stay" },
  { match: /^bnesta$/, pillar: "Stay" },
  { match: /^bfriends$/, pillar: "Wellness" },
  { match: /^bwellness$/, pillar: "Medical Wellness" },
  { match: /^nulook$/, pillar: "Care" },
  { match: /^alamk?ulkul$/, pillar: "Stay" },
];

const ECOSYSTEM_CTA_BY_NAME: Array<{ match: RegExp; label: string }> = [
  { match: /^bwork$/, label: "Visit BWork" },
  { match: /^blive$/, label: "Visit BLive" },
  { match: /^bnesta$/, label: "Visit BNesta" },
  { match: /^bfriends$/, label: "Visit BFriends" },
  { match: /^bwellness$/, label: "Visit BWellness" },
  { match: /^nulook$/, label: "Visit NuLook" },
  { match: /^alamk?ulkul$/, label: "Visit Alam Kulkul" },
];

function getMappedImage(name: string) {
  const matched = ECOSYSTEM_IMAGE_BY_NAME.find((entry) => entry.match.test(name));
  return matched?.image;
}

function getMappedPillar(name: string) {
  const matched = ECOSYSTEM_PILLAR_BY_NAME.find((entry) => entry.match.test(name));
  return matched?.pillar;
}

function getMappedCta(name: string) {
  const matched = ECOSYSTEM_CTA_BY_NAME.find((entry) => entry.match.test(name));
  return matched?.label ?? "Visit";
}

export default function BLifeEcosystem({ items = [] }: { items?: EcosystemItem[] }) {
  const list = items;
  const ref = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 1);
    setCanScrollNext(el.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [list.length, updateArrows]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = carouselRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.carouselItem}`));
    if (!cards.length) return;

    const scrollLeft = el.scrollLeft;
    const currentIndex = cards.reduce((closestIdx, card, idx) => {
      const currentDistance = Math.abs(cards[closestIdx].offsetLeft - scrollLeft);
      const nextDistance = Math.abs(card.offsetLeft - scrollLeft);
      return nextDistance < currentDistance ? idx : closestIdx;
    }, 0);

    const nextIndex = Math.min(Math.max(currentIndex + dir, 0), cards.length - 1);
    el.scrollTo({ left: cards[nextIndex].offsetLeft, behavior: "smooth" });
  };

  if (list.length === 0) return null;

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
          
          <h2 className={styles.headerTitle}>Part Of A Larger Wellness Ecosystem</h2>
          <p className={styles.headerSub}>
            BFriends is part of Daewoong&apos;s growing ecosystem in Bali, connecting wellness, hospitality, living, work,
            and lifestyle experiences into one interconnected journey designed to support better living.
          </p>
        </motion.header>
        <div className={styles.controls}>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonLeft}`}
            aria-label="Previous"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollPrev}
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowButtonRight}`}
            aria-label="Next"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollNext}
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className={styles.carousel} ref={carouselRef}>
          <div className={styles.carouselTrack}>
            {list.map((item, i) => {
              const normalizedName = normalizeEcosystemName(item.name);
              const card = (
                <motion.div
                  key={item.id}
                  className={styles.carouselItem}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={fadeUp}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 + i * 0.06,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  <EcosystemCard
                    image={
                      item.image ||
                      getMappedImage(normalizedName) ||
                      "/images/Integrate/DDK09558.webp"
                    }
                    title={item.name}
                    description={item.description}
                    href={getEcosystemHref(item.name, item.url)}
                    pillar={item.pillar || getMappedPillar(normalizedName) || undefined}
                    buttonLabel={item.button_label || getMappedCta(normalizedName)}
                  />
                </motion.div>
              );

              return card;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
