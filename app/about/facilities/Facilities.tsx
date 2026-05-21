"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import type { MockFacility } from "@/mock/facilities";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import styles from "./Facilities.module.css";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface FacilitiesProps {
  facilities: MockFacility[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  return (
    <div className={styles.facilityList}>
      {facilities.map((facility, index) => (
        <FacilityBlock key={facility.id} facility={facility} index={index} />
      ))}
    </div>
  );
}

function FacilityBlock({ facility, index }: { facility: MockFacility; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [isImageInView, setIsImageInView] = useState(false);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: imageWrapperRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-20%", "20%"]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY !== lastScrollY.current) {
        scrollDirection.current = currentY > lastScrollY.current ? "down" : "up";
        lastScrollY.current = currentY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImageInView(true);
        } else if (scrollDirection.current === "up") {
          setIsImageInView(false);
        }
      },
      { threshold: 0.25, rootMargin: "0px" }
    );
    if (imageWrapperRef.current) observer.observe(imageWrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.facilityBlock} ${index % 2 === 1 ? styles.facilityBlockEven : ""}`}
      aria-labelledby={`facility-${facility.id}-title`}
    >
      <div className={styles.facilityBlockWrapper}>
        <div className={styles.blockInner}>
          <div className={parallax.imageWrap} ref={imageWrapperRef}>
            <div
              className={`${parallax.imageFrame} ${parallax.imageFrameRatio169} ${isImageInView ? parallax.imageFrameVisible : parallax.imageFrameBefore}`}
            >
              <motion.div className={parallax.parallaxLayer} style={{ y }}>
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className={parallax.coverImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1568px"
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            className={parallax.copyGrid}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className={`${parallax.copyColLeft} ${styles.copyColLeft}`}>
              <p className={styles.floor}>{facility.floor}</p>
              <h2 id={`facility-${facility.id}-title`} className={parallax.copyTitle}>
                {facility.name}
              </h2>
            </div>
            <div className={`${parallax.copyColRight} ${parallax.copyColGapTight}`}>
              <p className={`${parallax.copyBody} ${parallax.copyBodyPreLine}`}>{facility.sub}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
