"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import WhyCard from "./WhyCard";
import styles from "./WhyBFriends.module.css";
import { whyBFriendsData } from "@/lib/whybfriends-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_BREAKPOINT = 1025;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export default function WhyBFriends() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);

  // Split data into two columns (3 cards each)
  const leftColumnCards = whyBFriendsData.slice(0, 3);
  const rightColumnCards = whyBFriendsData.slice(3, 6);

  useEffect(() => {
    if (!isDesktop) return;

    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !cardsContainer) return;

    const scrollHeight = cardsContainer.scrollHeight;
    const viewportHeight = section.offsetHeight;
    const verticalDistance = scrollHeight - viewportHeight;

    if (verticalDistance <= 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${verticalDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl.to(cardsContainer, {
      y: -verticalDistance,
      ease: "none",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill();
      });
      gsap.set(cardsContainer, { y: 0 });
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDesktop]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.mainContainer}>
        {/* Left Container - Static */}
        <div className={styles.leftContainer}>
          <h2 className={styles.title}>Why <em>BFriends</em>?</h2>
          <p className={styles.subheading}>
            Discover meaningful connections with people who truly get you. 
            BFriends brings together like-minded individuals for authentic relationships.
          </p>
          <Button
            href="/about"
            variant="border"
            className={styles.button}
            color="var(--color-blue-100)"
            icon={<ArrowUpRight size={16} />}
          >
            Learn More
          </Button>
        </div>

        {/* Cards Container - Scrollable */}
        <div className={styles.cardsWrapper}>
          <div className={styles.cardsContainer} ref={cardsContainerRef}>
            {/* Left Grid */}
            <div className={styles.cardsGrid}>
              {leftColumnCards.map((card) => (
                <WhyCard
                  key={card.id}
                  image={card.image}
                  title={card.point}
                  subheading={card.subpoint}
                />
              ))}
            </div>

            {/* Right Grid */}
            <div className={`${styles.cardsGrid} ${styles.cardsGridRight}`}>
              {rightColumnCards.map((card) => (
                <WhyCard
                  key={card.id}
                  image={card.image}
                  title={card.point}
                  subheading={card.subpoint}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
