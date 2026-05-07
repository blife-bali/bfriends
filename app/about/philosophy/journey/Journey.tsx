 "use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/ui/Button/Button";
import styles from "./Journey.module.css";

const JOURNEY_IMAGE = "/images/Integrate/DDK09558.jpg";
const DEFAULT_TITLE = "The BFriends Journey";
const DEFAULT_BODY =
  "Powered by Korean wellness science and precision analysis, the BFriends Method is designed to help you move, recover, and feel better in daily life. Through structural and movement mapping, body analysis, and personalized care programs, we create a wellness journey tailored to your body's condition and rhythm.";

export default function Journey({
  headline = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  imageUrl = JOURNEY_IMAGE,
}: {
  headline?: string | null;
  body?: string | null;
  imageUrl?: string | null;
}) {
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
    mass: 0.4,
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
    <section className={styles.section} aria-label="BFriends Journey">
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{headline || DEFAULT_TITLE}</h2>
          <p className={styles.body}>{body || DEFAULT_BODY}</p>
          <Button
            href="/about/journey"
            className={styles.cta}
            color="var(--color-blue-100)"
            showIcon
          >
            The BFriends Journey
          </Button>
        </div>

        <div className={styles.imageWrap} ref={imageWrapperRef}>
          <div
            className={`${styles.imageInner} ${isImageInView ? styles.imageInnerVisible : styles.imageInnerBefore}`}
          >
            <motion.div className={styles.parallaxLayer} style={{ y }}>
              <Image
                src={imageUrl || JOURNEY_IMAGE}
                alt="BFriends Journey"
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
