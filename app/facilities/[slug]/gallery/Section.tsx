"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import parallax from "@/components/ParallaxSection/ParallaxSection.module.css";
import styles from "./Section.module.css";

interface GallerySectionProps {
  images: string[];
}

export default function GallerySection({ images }: GallerySectionProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.01,
  });
  const y = useTransform(smoothProgress, [0, 1], ["-14%", "14%"]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: images.length > 1,
  });

  if (images.length === 0) return null;

  return (
    <section className={styles.section} aria-label="Facility gallery">
      <div className={styles.container}>
        <div
          ref={frameRef}
          className={`${styles.imageFrame} ${parallax.imageFrame} ${parallax.imageFrameRatio169}`}
        >
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
              {images.map((src) => (
                <div key={src} className={styles.emblaSlide}>
                  <div className={styles.slideImage}>
                    <motion.div className={parallax.parallaxLayer} style={{ y }}>
                      <img src={src} alt="" className={styles.slideImg} />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {images.length > 1 && (
            <div className={styles.arrowGroup}>
              <button
                type="button"
                className={styles.navButton}
                aria-label="Previous image"
                onClick={() => emblaApi?.scrollPrev()}
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                aria-label="Next image"
                onClick={() => emblaApi?.scrollNext()}
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
