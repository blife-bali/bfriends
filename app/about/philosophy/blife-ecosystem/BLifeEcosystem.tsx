"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
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
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  const updateArrows = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateArrows();
    emblaApi.on("select", updateArrows);
    emblaApi.on("reInit", updateArrows);
    return () => {
      emblaApi.off("select", updateArrows);
      emblaApi.off("reInit", updateArrows);
    };
  }, [emblaApi, list.length, updateArrows]);

  const scrollByAmount = (dir: 1 | -1) => {
    if (!emblaApi) return;
    if (dir === 1) emblaApi.scrollNext();
    else emblaApi.scrollPrev();
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

        <div className={styles.carousel}>
          <div className={styles.carouselViewport} ref={emblaRef}>
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
      </div>
    </section>
  );
}
