"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import EcosystemCard from "./EcosystemCard";
import styles from "./BLifeEcosystem.module.css";

interface EcosystemItem {
  id: number | string;
  name: string;
  description: string;
  image?: string | null;
  url?: string | null;
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

const ECOSYSTEM_LINK_BY_NAME: Array<{ match: RegExp; href?: string }> = [
  { match: /^bwork$/, href: "https://bwork.id" },
  { match: /^bnesta$/, href: "https://bnesta.id" },
  { match: /^blive$/, href: "https://blive.id" },
  { match: /^bfriends$/, href: undefined },
  { match: /^bwellness$/, href: "https://instagram.com/bwellness" },
  { match: /^nulook$/, href: "https://nulook.co.id" },
  { match: /^alamk?ulkul$/, href: "https://alamkulkul.com" },
];

function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getMappedImage(name: string) {
  const matched = ECOSYSTEM_IMAGE_BY_NAME.find((entry) => entry.match.test(name));
  return matched?.image;
}

function getMappedHref(name: string) {
  const matched = ECOSYSTEM_LINK_BY_NAME.find((entry) => entry.match.test(name));
  return matched?.href;
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
          
          <h2 className={styles.headerTitle}>BLife Destinations</h2>
          <p className={styles.headerSub}>
            Designed around different rhythms of life, BLife offers a collection of spaces that support work, rest,
            wellness, and meaningful connection in Bali. From focused coworking environments and restorative stays to
            movement-based wellness and community-driven experiences, each destination is created with its own purpose
            while staying connected through one shared philosophy: helping people live better, slower, and more
            intentionally.
          </p>
          <p className={styles.headerSub}>
            More than standalone spaces, BLife is building an ecosystem for continuous care, where daily routines,
            recovery, movement, connection, and personal growth naturally flow across each destination. Rooted in the
            balance between productivity and restoration, BLife combines thoughtful design, local culture, and
            everyday wellness to create experiences that support a more sustainable way of living.
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
              const normalizedName = normalizeName(item.name);
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
                    href={getMappedHref(normalizedName)}
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
